import { Model } from 'mongoose';
import { Discount, IProductDocument, Product } from '../models/product';

export class DiscountDao {
    private model: Model<IProductDocument>

    constructor (model: Model<IProductDocument>) {
        this.model = model;
    }

    async getAll(): Promise<Product[]> {
        try {
            const products = await this.model.find({
                discount: { $nin: [ 'None', null ], },
            })

            return products.map((product) => ({
                id: (product._id as unknown) as string,
                name: product.name as string,
                quantity: product.quantity,
                price: product.price,
                discount: product.discount,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async setDiscount(productId: string, discount: string): Promise<Product> {
        try {
            if (!productId) {
                throw new Error('Product ID is required');
            }

            if (!discount) {
                throw new Error('Discount is required');
            }

            if (!this.isDiscountValid(discount)) {
                throw new Error('Invalid discount value');
            }

            const product = await this.model.findOneAndUpdate(
                { _id: productId, },
                { discount, updatedAt: new Date(), },
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

    private isDiscountValid(discount: string): discount is Discount {
        return discount in Discount;
    }
}