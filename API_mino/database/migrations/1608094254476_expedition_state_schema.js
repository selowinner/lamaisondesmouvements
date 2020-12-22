'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpeditionStateSchema extends Schema {
  up () {
    this.create('expedition_states', (table) => {
      table.increments()
      table.string('denomination').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('expedition_states')
  }
}

module.exports = ExpeditionStateSchema
