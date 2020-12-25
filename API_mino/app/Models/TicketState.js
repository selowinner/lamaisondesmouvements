'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TicketState extends Model {

    tickets () {
        return this.hasMany('App/Models/Ticket')  
    }
}

module.exports = TicketState
