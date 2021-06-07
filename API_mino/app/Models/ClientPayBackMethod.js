'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClientPayBackMethod extends Model {

    ClientReimbursement () {
        return this.hasMany('App/Models/ClientReimbursement')
    }


}

module.exports = ClientPayBackMethod
