'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddActivationStateToDeliveryManSchema extends Schema {
  up () {
    this.table('delivery_men', (table) => {
      // alter table
      table.boolean('activation_state').defaultTo(true)
    })
  }

  down () {
    // this.table('delivery_men', (table) => {
    //   // reverse alternations
    // })
  }
}

module.exports = AddActivationStateToDeliveryManSchema
