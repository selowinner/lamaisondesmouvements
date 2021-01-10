'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketLuggageTypeLuggagePriceBySchema extends Schema {
  up () {
    this.create('ticket_luggage', (table) => {
      table.increments()
      table.integer('ticket_id').unsigned()
      table.foreign('ticket_id').references('tickets.id')
      table.integer('luggage_type_id').unsigned()
      table.foreign('luggage_type_id').references('luggage_types.id')
      table.integer('luggage_price_by_weight_and_size_id').unsigned()
      table.foreign('luggage_price_by_weight_and_size_id').references('luggage_price_by_weight_and_sizes.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('ticket_luggage')
  }
}

module.exports = TicketLuggageTypeLuggagePriceBySchema
