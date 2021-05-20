'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnUserInCompaniesCentralSchema extends Schema {
  up () {
    this.table('companies_centrals', (table) => {
      // alter table
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
    })
  }

  down () {
    // this.table('add_column_user_in_companies_centrals', (table) => {
    //   // reverse alternations
    // })
  }
}

module.exports = AddColumnUserInCompaniesCentralSchema
