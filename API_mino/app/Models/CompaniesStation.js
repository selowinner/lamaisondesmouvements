'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CompaniesStation extends Model {


    company () {
        return this.belongsTo('App/Models/Company')
    }

    users () {
        return this.belongsTo('App/Models/User')
    }


}

module.exports = CompaniesStation
