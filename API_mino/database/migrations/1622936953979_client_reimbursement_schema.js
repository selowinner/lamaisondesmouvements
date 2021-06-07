'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientReimbursementSchema extends Schema {
  up () {
    this.create('client_reimbursements', (table) => {
      table.increments()
      table.string('client_call_number').notNullable()
      table.string('client_complet_name').notNullable()
      table.integer('money_to_pay_back').notNullable()
      table.string('coupon_code')
      table.time('pay_back_delai').notNullable()
      table.boolean('pay_back_state').defaultTo(false)
      table.integer('pay_back_method_id').unsigned()
      table.foreign('pay_back_method_id').references('pay_back_methods.id')
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
      table.integer('tickets_id').unsigned()
      table.foreign('tickets_id').references('tickets.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('client_reimbursements')
  }
}

module.exports = ClientReimbursementSchema
