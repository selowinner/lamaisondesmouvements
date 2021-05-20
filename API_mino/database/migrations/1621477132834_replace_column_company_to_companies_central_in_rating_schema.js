'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReplaceColumnCompanyToCompaniesCentralInRatingSchema extends Schema {
  up () {
    this.table('ratings', (table) => {
      // alter table
      table.integer('companyCentral_id').unsigned()
      table.foreign('companyCentral_id').references('companies_centrals.id')
    })
  }

  down () {
    this.table('ratings', (table) => {
      // reverse alternations
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
    })
  }
}

module.exports = ReplaceColumnCompanyToCompaniesCentralInRatingSchema
