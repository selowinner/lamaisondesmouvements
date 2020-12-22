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
      table.string('ticket_number_or_identification').notNullable()
      table.boolean('declaration_state').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('lost_objets')
  }
}

module.exports = LostObjetSchema
