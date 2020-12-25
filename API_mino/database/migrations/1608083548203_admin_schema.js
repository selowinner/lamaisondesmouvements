'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminSchema extends Schema {
  up () {
    this.create('admins', (table) => {
      table.increments()
      table.string('username', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()

      // Ce Schema a été Annulé, parcequ'un admin est considé désormais comme un User, avec un rôle différent.
    })
  }

  down () {
    this.drop('admins')
  }
}

module.exports = AdminSchema
