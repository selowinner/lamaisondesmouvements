'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClientReimbursement extends Model {

    ClientPayBackMethod () {
        return this.belongsTo('App/Models/ClientPayBackMethod')
    }
    company () {
        return this.belongsTo('App/Models/Company')
    }
    tickets () {
        return this.belongsTo('App/Models/Ticket')
    }


}

module.exports = ClientReimbursement
