'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnClientCallNumberToTicketSchema extends Schema {
  up () {
    this.table('tickets', (table) => {
      // alter table
      table.string('client_call_number').defaultTo('not defined')
    })
  }

  down () {
    // this.table('tickets', (table) => {
    //   // reverse alternations
    // })
  }
}

module.exports = AddColumnClientCallNumberToTicketSchema
