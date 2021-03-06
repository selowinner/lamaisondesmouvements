'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LostObjetSchema extends Schema {
  up () {
    this.create('lost_objets', (table) => {
      table.increments()
      table.string('nature').notNullable()
      table.integer('weight')
      table.string('size')
      table.text('picture')
      table.text('description').notNullable()
      table.integer('contact').notNullable()
      table.string('ticket_number_or_identification')
      table.date('departure_date')
      table.string('departure_place')
      table.boolean('declaration_state').defaultTo(false)
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('lost_objets')
  }
}

module.exports = LostObjetSchema
