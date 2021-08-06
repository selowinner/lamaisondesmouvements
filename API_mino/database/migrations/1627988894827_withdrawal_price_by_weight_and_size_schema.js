'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WithdrawalPriceByWeightAndSizeSchema extends Schema {
  up () {
    this.create('withdrawal_price_by_weight_and_sizes', (table) => {
      table.increments()
      table.integer('min_weight')
      table.integer('max_weight')
      table.integer('min_size')
      table.integer('max_size')
      table.integer('unit_price').notNullable()
      table.integer('withdrawals_id').unsigned()
      table.foreign('withdrawals_id').references('withdrawals.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('withdrawal_price_by_weight_and_sizes')
  }
}

module.exports = WithdrawalPriceByWeightAndSizeSchema
