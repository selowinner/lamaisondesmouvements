'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TravelSchema extends Schema {
  up () {
    this.create('travels', (table) => {
      table.increments()
      table.text('car_informations').notNullable()
      table.text('car_matriculation')
      table.string('departure_place').notNullable()
      table.string('destination').notNullable()
      table.time('departure_time').notNullable() // le type de donnée est à vérifier
      table.date('departure_date') // le type de donnée est à vérifier
      table.integer('place_to_sell_by_mino_number').notNullable()
      table.integer('total_car_place_number').notNullable()
      table.integer('place_price').notNullable()
      table.time('annulation_of_reservation_Limit_Time').notNullable() // le type de donnée est à vérifier
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('travels')
  }
}

module.exports = TravelSchema
