'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddcColumnCompaniesCentralInUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.string('contact').notNullable()
      table.string('ProfilIMG');
      table.integer('companyCentral_id').unsigned()
      table.foreign('companyCentral_id').references('companies_centrals.id')
    })
  }

  down () {
    // this.table('addc_column_companies_central_in_users', (table) => {
    //   // reverse alternations
    // })
  }
}

module.exports = AddcColumnCompaniesCentralInUserSchema
