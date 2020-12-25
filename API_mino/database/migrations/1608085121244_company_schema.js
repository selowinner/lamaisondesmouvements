'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('denomination').notNullable().unique()
      table.string('matriculation').notNullable()
      table.text('description').notNullable()
      table.string('country').notNullable()
      table.string('contact').notNullable()
      table.string('activation_code').notNullable()
      table.string('mino_code').notNullable()
      table.boolean('package_service_use').defaultTo(false)
      table.integer('use_option_id').unsigned()
      table.foreign('use_option_id').references('company_use_options.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
