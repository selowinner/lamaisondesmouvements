'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnCityAndNeighborhoodInCompaniessSchema extends Schema {
  up () {
    this.table('companies', (table) => {
        // alter table
        table.string('city')
        table.string('neighborhood')
        table.string('other_denomination').notNullable()
        table.integer('companyCentral_id').unsigned()
        table.foreign('companyCentral_id').references('companies_centrals.id')
    })
  }

  down () {
    this.table('companies', (table) => {
      // reverse alternations
      table.string('denomination').notNullable().unique()

    })
  }
}

module.exports = AddColumnCityAndNeighborhoodInCompaniessSchema
