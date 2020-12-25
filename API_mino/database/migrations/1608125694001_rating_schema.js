'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RatingSchema extends Schema {
  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.string('matriculation').notNullable()
      table.integer('rating').notNullable()
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('ratings')
  }
}

module.exports = RatingSchema
