import { Request, Response, NextFunction } from 'express';
import { PricingDao } from '../dao/PricingDao';

export class PricingController {
    private pricingDao: PricingDao;

    constructor (pricingDao: PricingDao) {
        this.pricingDao = pricingDao;
    }

    setProductPrice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId, price } = req.body;
            const product = await this.pricingDao.setPrice(productId, price);
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}