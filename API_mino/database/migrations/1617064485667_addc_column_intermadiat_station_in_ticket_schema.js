'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddcColumnIntermadiatStationInTicketSchema extends Schema {
  up () {
    this.table('tickets', (table) => {
      // alter table
      table.integer('travel_intermadiate_station').unsigned()
      table.foreign('travel_intermadiate_station').references('travel_intermadiate_stations.id')
    })
  }

  down () {
    // this.table('addc_column_intermadiat_station_in_tickets', (table) => {
    //   // reverse alternations
    // })
  }
}

module.exports = AddcColumnIntermadiatStationInTicketSchema
