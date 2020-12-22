'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketSchema extends Schema {
  up () {
    this.create('tickets', (table) => {
      table.increments()
      table.string('matriculation').notNullable()
      table.integer('number_of_places').notNullable()
      table.string('client_complet_name').notNullable()
      table.integer('travel_id').unsigned()
      table.foreign('travel_id').references('travels.id')
      table.integer('luggage_types_id').unsigned()
      table.foreign('luggage_types_id').references('luggage_types.id')
      table.integer('number_luggage')
      table.integer('ticket_state_id').unsigned()
      table.foreign('ticket_state_id').references('ticket_states.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('tickets')
  }
}

module.exports = TicketSchema
