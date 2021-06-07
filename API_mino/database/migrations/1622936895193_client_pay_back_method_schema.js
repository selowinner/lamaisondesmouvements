'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientPayBackMethodSchema extends Schema {
  up () {
    this.create('client_pay_back_methods', (table) => {
      table.increments()
      table.string('denomination').notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('client_pay_back_methods')
  }
}

module.exports = ClientPayBackMethodSchema
