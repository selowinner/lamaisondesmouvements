'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddOtherInformationsForCompaniesCentralSchema extends Schema {
  up () {
    this.table('companies_centrals', (table) => {
      // alter table
      table.string('email').notNullable()
      table.string('anagramme')
      table.string('siege')
      table.date('expired_date')
      table.boolean('activation_state').defaultTo(false)
    })
  }

  down () {
    this.table('companies_centrals', (table) => {
      // reverse alternations
      table.string('activation_code').notNullable()
    })
  }
}

module.exports = AddOtherInformationsForCompaniesCentralSchema
