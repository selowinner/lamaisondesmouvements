'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TravelPlaceSchema extends Schema {
  up () {
    this.create('travel_places', (table) => {
      table.increments()
      table.integer('place').notNullable()
      table.boolean('reservation_state').defaultTo(false)
      table.integer('travel_id').unsigned()
      table.foreign('travel_id').references('travels.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('travel_places')
  }
}

module.exports = TravelPlaceSchema
