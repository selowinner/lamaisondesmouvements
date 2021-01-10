'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LuggageTypeSchema extends Schema {
  up () {
    this.create('luggage_types', (table) => {
      table.increments()
      table.string('denomination').notNullable()
      table.text('description').notNullable()
      table.integer('Luggages').unsigned()
      table.foreign('company_id').references('companies.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('luggage_types')
  }
}

module.exports = LuggageTypeSchema
