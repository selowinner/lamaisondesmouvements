'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CompaniesCentral extends Model {
    company () {
        return this.hasMany('App/Models/Company')
    }

    users () {
        return this.belongsTo('App/Models/User')
    }
    
    rating () {
        return this.hasMany('App/Models/Rating')
    }

    abonnemnt () {
        return this.hasMany('App/Models/Abonnement')
    }
}

module.exports = CompaniesCentral
