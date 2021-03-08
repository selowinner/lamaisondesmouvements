'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompaniesStationSchema extends Schema {
  up () {
    this.create('companies_stations', (table) => {
      table.increments()
      table.string('city').notNullable()
      table.string('neighborhood').notNullable()
      table.string('contact').notNullable()
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('companies_stations')
  }
}

module.exports = CompaniesStationSchema
