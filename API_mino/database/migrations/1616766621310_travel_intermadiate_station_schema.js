'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TravelIntermadiateStationSchema extends Schema {
  up () {
    this.create('travel_intermadiate_stations', (table) => {
      table.increments()
      table.string('station_name').notNullable()
      table.integer('travel_id').unsigned()
      table.foreign('travel_id').references('travels.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('travel_intermadiate_stations')
  }
}

module.exports = TravelIntermadiateStationSchema
