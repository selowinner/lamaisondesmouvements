'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PriceOfWithdrawalsAndDeliverySchema extends Schema {
  up () {
    this.create('price_of_withdrawals_and_deliveries', (table) => {
      table.increments()
      table.integer('min_price').notNullable()
      table.integer('max_price').notNullable()
      table.string('city').notNullable()
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('price_of_withdrawals_and_deliveries')
  }
}

module.exports = PriceOfWithdrawalsAndDeliverySchema
