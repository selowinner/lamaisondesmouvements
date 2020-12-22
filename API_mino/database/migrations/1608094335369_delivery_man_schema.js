'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeliveryManSchema extends Schema {
  up () {
    this.create('delivery_men', (table) => {
      table.increments()
      table.string('complet_name').notNullable()
      table.integer('contact').notNullable()
      table.string('city').notNullable()
      table.string('conveyance').notNullable()
      table.string('matriculation').notNullable()
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('delivery_men')
  }
}

module.exports = DeliveryManSchema
