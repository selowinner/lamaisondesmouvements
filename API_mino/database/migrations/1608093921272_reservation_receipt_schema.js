'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationReceiptSchema extends Schema {
  up () {
    this.create('reservation_receipts', (table) => {
      table.increments()
      table.integer('total_places_price').notNullable()
      table.integer('total_luggages_price').notNullable()
      table.integer('tickets_id').unsigned()
      table.foreign('tickets_id').references('tickets.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('reservation_receipts')
  }
}

module.exports = ReservationReceiptSchema
