import { Error, Model } from 'mongoose';
import { IProductDocument, Product } from '../models/product';

export class PricingDao {
    private model: Model<IProductDocument>

    constructor (model: Model<IProductDocument>) {
        this.model = model;
    }

    async setPrice(productId: string, price: number): Promise<Product> {
        try {
            if (!productId) {
                throw new Error('Product ID is required');
            }

            if (!price) {
                throw new Error('Price is required');
            }

            const product = await this.model.findOneAndUpdate(
                { _id: productId, },
                { price, updatedAt: new Date(), },
                { returnDocument: 'after' },
            );

            if (!product) {
                throw new Error('Product not found');
            }

            return {
                id: (product._id as unknown) as string,
                name: product.name as string,
                quantity: product.quantity,
                price: product.price,
                discount: product.discount,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}