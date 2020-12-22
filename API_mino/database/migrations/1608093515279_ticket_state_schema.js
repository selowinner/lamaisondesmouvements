'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketStateSchema extends Schema {
  up () {
    this.create('ticket_states', (table) => {
      table.increments()
      table.string('denomination').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('ticket_states')
  }
}

module.exports = TicketStateSchema
