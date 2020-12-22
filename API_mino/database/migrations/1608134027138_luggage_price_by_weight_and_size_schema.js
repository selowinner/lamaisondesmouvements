'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LuggagePriceByWeightAndSizeSchema extends Schema {
  up () {
    this.create('luggage_price_by_weight_and_sizes', (table) => {
      table.increments()
      table.integer('min_weight').notNullable()
      table.integer('max_weight').notNullable()
      table.integer('min_size').notNullable()
      table.integer('max_size').notNullable()
      table.integer('unit_price').notNullable()
      table.integer('luggage_type_id').unsigned()
      table.foreign('luggage_type_id').references('luggage_types.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('luggage_price_by_weight_and_sizes')
  }
}

module.exports = LuggagePriceByWeightAndSizeSchema
