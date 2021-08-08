'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeActivationSchema extends Schema {
  up () {
    this.table('companies', (table) => {
      // alter table
      table.boolean('activation_state').defaultTo(false)
    })
  }

  down () {
    this.table('companies', (table) => {
      // reverse alternations
      table.string('activation_code').notNullable()
    })
  }
}

module.exports = ChangeActivationSchema
