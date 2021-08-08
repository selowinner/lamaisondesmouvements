'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Abonnement extends Model {
    
    CompaniesCentral () {
        return this.belongsTo('App/Models/CompaniesCentral')
    }
}

module.exports = Abonnement
