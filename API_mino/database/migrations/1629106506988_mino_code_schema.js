'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MinoCodeSchema extends Schema {
  up () {
    this.create('mino_codes', (table) => {
      table.increments()
      table.string('code').notNullable()
      table.boolean('used_state').defaultTo(false)
      table.integer('companyCentral_id').unsigned()
      table.foreign('companyCentral_id').references('companies_centrals.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('mino_codes')
  }
}

module.exports = MinoCodeSchema
