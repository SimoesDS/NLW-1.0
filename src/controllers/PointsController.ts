import { Request, Response } from 'express';
import knex from '../database/connection';

import Const from '../constants';

class PointController {

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex(Const.TABLE_POINTS)
            .where('id', id)
            .first();

        if(!point) {
            response.status(400).json({ message: 'Point not found.'});
        }

        const items = await knex('items')
            .join(Const.TABLE_POINT_ITEMS, 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        response.json({ point, items });
    }

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

        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        const trx = await knex.transaction();
        
        const insertedIds = await trx(Const.TABLE_POINTS).insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map( (item: number) => {
            return {
                item_id: item,
                point_id
            };
        });
    
        await trx(Const.TABLE_POINT_ITEMS).insert(pointItems);
        
        await trx.commit();
    
        return response.json({
            id: point_id,
            ...point
        });
    }
}

export default PointController;