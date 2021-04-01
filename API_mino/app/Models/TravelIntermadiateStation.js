'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TravelIntermadiateStation extends Model {

    travels () {
        return this.belongsTo('App/Models/Travel')
    }

    tickets () {
        return this.hasMany('App/Models/Ticket')
    }
    
}

module.exports = TravelIntermadiateStation
