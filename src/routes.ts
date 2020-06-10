import express from 'express';
import knex from './database/connection';

import Const from './constants';

const routes = express.Router();

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map( item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    })
    
    return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
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
    
    const trx = await knex.transaction();

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

    await trx(Const.TABLE_POINTS_ITEMS ).insert(pointItems);

    return response.json({ success: true });
});

export default routes;