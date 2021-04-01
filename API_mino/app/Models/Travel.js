'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Travel extends Model {

    users () {
        return this.belongsTo('App/Models/User')
    }

    company () {
      return this.belongsTo('App/Models/Company')
    }

    travelPlace () {
      return this.hasMany('App/Models/TravelPlace')
    }
    
    travelIntermadiateStation () {
      return this.hasMany('App/Models/TravelIntermadiateStation')
    }

    tickets () {
      return this.hasMany('App/Models/Ticket')
    }

}

module.exports = Travel
