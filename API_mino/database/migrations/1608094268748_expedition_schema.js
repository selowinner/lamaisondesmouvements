'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpeditionSchema extends Schema {
  up () {
    this.create('expeditions', (table) => {
      table.increments()
      table.string('sender_complet_name').notNullable()
      table.integer('sender_contact').notNullable()
      table.string('sender_country').notNullable()
      table.string('sender_city').notNullable()
      table.string('sender_neighborhood').notNullable()
      table.string('recipient_complet_name').notNullable()
      table.integer('recipient_contact').notNullable()
      table.string('recipient_country').notNullable()
      table.string('recipient_city').notNullable()
      table.string('recipient_neighborhood')
      table.integer('package_weight').notNullable()
      table.integer('package_size').notNullable()
      table.text('package_picture').notNullable()
      table.date('delivery_date').notNullable() // vérifier le type
      table.string('package_withdrawal_code').notNullable()
      table.integer('expedition_price')
      table.integer('recipient_delivery_man_id').unsigned()
      table.foreign('recipient_delivery_man_id').references('delivery_men.id')
      table.integer('sender_delivery_man_id').unsigned()
      table.foreign('sender_delivery_man_id').references('delivery_men.id')
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
      table.integer('expedition_state_id').unsigned()
      table.foreign('expedition_state_id').references('expedition_states.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('expeditions')
  }
}

module.exports = ExpeditionSchema
