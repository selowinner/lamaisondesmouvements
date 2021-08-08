'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AbonnementSchema extends Schema {
  up () {
    this.create('abonnements', (table) => {
      table.increments()
      table.date('expired_date').notNullable()
      table.integer('companyCentral_id').unsigned()
      table.foreign('companyCentral_id').references('companies_centrals.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('abonnements')
  }
}

module.exports = AbonnementSchema
