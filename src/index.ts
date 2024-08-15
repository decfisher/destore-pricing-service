import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';

// Get environment variables
const port = process.env.PORT || 3001;

// Initialise application server
const app = express();

// Allow JSON
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello, World!'
    })
})

// Start the server
app.listen(port, () => {
  console.log(`🛜 Pricing service running on port ${port}...`);
});