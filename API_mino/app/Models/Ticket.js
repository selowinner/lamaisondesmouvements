'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ticket extends Model {

    tavels () {
        return this.belongsTo('App/Models/Travel')
    }

    tavelsItermadiateStation () {
        return this.belongsTo('App/Models/TravelIntermadiateStation')
    }

    ticketStates () {
        return this.belongsTo('App/Models/TicketState')
    }

    travelPlace () {
        return this.hasMany('App/Models/TravelPlace')
    }

    reservationReceipt () {
        return this.hasOne('App/Models/ReservationReceipt')
    }

    ticketLuggageANDLuggagePriceByRelation () {
        return this.hasMany('App/Models/TicketLuggageTypeLuggagePriceBy')
    }


}

module.exports = Ticket
