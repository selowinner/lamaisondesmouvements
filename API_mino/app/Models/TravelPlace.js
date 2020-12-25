'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TravelPlace extends Model {

    travels () {
        return this.belongsTo('App/Models/Travel')
    }

    tickets () {
        return this.belongsTo('App/Models/Ticket')
    }

}

module.exports = TravelPlace
