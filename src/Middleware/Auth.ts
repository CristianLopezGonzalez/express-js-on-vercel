import {Request, Response, NextFunction} from 'express';

export const requireApiKey = (req: Request, res: Response, next: NextFunction): void => {

    console.log('API_SECRET_KEY:', process.env.API_SECRET_KEY);
    console.log('Header recibido:', req.headers['x-api-key']);

    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
        res.status(401).json({error: 'Unauthorized'});
        return;
    }

    next();
};