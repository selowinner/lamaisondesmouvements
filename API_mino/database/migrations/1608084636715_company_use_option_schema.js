'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyUseOptionSchema extends Schema {
  up () {
    this.create('company_use_options', (table) => {
      table.increments()
      table.string('denomination').notNullable().unique()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('company_use_options')
  }
}

module.exports = CompanyUseOptionSchema
