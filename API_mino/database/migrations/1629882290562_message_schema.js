'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.string('topic').notNullable()
      table.text('content').notNullable()
      table.integer('station_creator_id').unsigned()
      table.foreign('station_creator_id').references('companies.id')
      table.integer('central_creator_id').unsigned()
      table.foreign('central_creator_id').references('companies_centrals.id')
      table.integer('station_dest_id').unsigned()
      table.foreign('station_dest_id').references('companies.id')
      table.integer('central_dest_id').unsigned()
      table.foreign('central_dest_id').references('companies_centrals.id')
      table.boolean('view').defaultTo(false)
      table.integer('flag') // les flag 1--->gest_voy  2-->gest_exp  3-->gest_colis 4-->alerte_remboursement
      table.integer('response') // id du message correspondant à la reponse
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessageSchema
