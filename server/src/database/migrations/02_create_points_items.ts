import Knex from 'knex';

import Const from '../../constants';

export async function up(knex: Knex){
    return knex.schema.createTable(Const.TABLE_POINT_ITEMS, table => {
        table.increments('id').primary();
        
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable(Const.TABLE_POINT_ITEMS);
}
