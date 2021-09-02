'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
    CompaniesCentral () {
        return this.belongsToMany('App/Models/CompaniesCentral')
    }
    company () {
        return this.belongsToMany('App/Models/Company')
    }
}

module.exports = Message
