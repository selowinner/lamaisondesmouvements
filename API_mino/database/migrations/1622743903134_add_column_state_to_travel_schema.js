'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnStateToTravelSchema extends Schema {
  up () {
    this.table('travels', (table) => {
      // alter table
      table.boolean('annulation_state').defaultTo(false)
    })
  }

  down () {
    // this.table('travels', (table) => {
    //   // reverse alternations
    // })
  }
}

module.exports = AddColumnStateToTravelSchema
