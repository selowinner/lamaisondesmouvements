'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WithdrawalSchema extends Schema {
  up () {
    this.create('withdrawals', (table) => {
      table.increments()
      table.string('denomination').notNullable()
      table.text('description').notNullable()
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('withdrawals')
  }
}

module.exports = WithdrawalSchema
