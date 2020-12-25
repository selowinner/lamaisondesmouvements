'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ticket extends Model {

    tavels () {
        return this.belongsTo('App/Models/Travel')
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


}

module.exports = Ticket
