'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompaniesCentralSchema extends Schema {
  up () {
    this.create('companies_centrals', (table) => {
      table.increments()
      table.string('denomination').notNullable()
      table.string('matriculation').notNullable()
      table.text('description').notNullable()
      table.string('country').notNullable()
      table.string('contact').notNullable()
      table.string('activation_code').notNullable()
      table.string('mino_code').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('companies_centrals')
  }
}

module.exports = CompaniesCentralSchema
