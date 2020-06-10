import { Request, Response } from 'express';
import knex from '../database/connection';

import Const from '../constants';

class PointController {

    async create(request: Request, response: Response) {
        const {
            image,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        await knex.transaction( async trx => {
            const insertedIds = await trx(Const.TABLE_POINTS).insert({
                image: 'image-fake',
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf
            });
        
            const point_id = insertedIds[0];
        
            const pointItems = items.map( (item: number) => {
                return {
                    item_id: item,
                    point_id
                };
            });
        
            await trx(Const.TABLE_POINTS_ITEMS).insert(pointItems);
        });
    
        return response.json({ success: true });
    }
}

export default PointController;