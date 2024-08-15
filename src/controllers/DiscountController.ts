import { Request, Response, NextFunction } from 'express';
import { DiscountDao } from '../dao/DiscountDao';

export class DiscountController {
    private discountDao: DiscountDao;

    constructor (discountDao: DiscountDao) {
        this.discountDao = discountDao;
    }

    getAllDiscountedProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await this.discountDao.getAll();
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    setProductDiscount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId, discount } = req.body;
            const product = await this.discountDao.setDiscount(productId, discount);
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}