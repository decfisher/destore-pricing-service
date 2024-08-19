import { Document, model, Schema } from 'mongoose';

export interface IProduct {
    name: string;
    quantity: number;
    price: number;
    discount: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: string;
    name: string;
    quantity: number;
    price: number;
    discount: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductDocument extends IProduct, Document {}

export enum Discount {
    BOGOF = 'BOGOF',
    THREE_FOR_TWO = '3FOR2',
    FREE_DELIVERY = 'FREE_DELIVERY',
}

const productSchema = new Schema<IProductDocument>(
    {
        name: { 
            type: String,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0.0,
        },
        discount: {
            type: String,
            default: 'None',
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { collection: 'products' },
);

export const ProductModel = model<IProductDocument>('Product', productSchema);