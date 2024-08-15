import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import { ProductModel } from './models/product';
import { PricingDao } from './dao/PricingDao';
import { PricingController } from './controllers/PricingController';
import { DiscountDao } from './dao/DiscountDao';
import { DiscountController } from './controllers/DiscountController';

// Get environment variables
const port = process.env.PORT || 3001;
const MONGO_DB_URI: string = process.env.INVENTORY_DB_URL!;

// Connect to inventory database
mongoose.connect(MONGO_DB_URI)
  .then(() => console.log('✅ Connected to inventory database'))
  .catch(error => {
    console.log('❌ Failed to connect to inventory database');
    console.error(error);
  });

// Initialise data accessors
const pricingDao = new PricingDao(ProductModel);
const discountDao = new DiscountDao(ProductModel);

// Initialise controllers
const pricingController = new PricingController(pricingDao);
const discountController = new DiscountController(discountDao);

// Initialise application server
const app = express();

// Allow JSON
app.use(express.json());

// Routes
app.patch('/price/set', pricingController.setProductPrice);

app.get('/discount/all', discountController.getAllDiscountedProducts);

app.patch('/discount/set', discountController.setProductDiscount);

// Start the server
app.listen(port, () => {
  console.log(`🛜 Pricing service running on port ${port}...`);
});