'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TicketLuggageTypeLuggagePriceBy extends Model {

    ticket () {
        return this.belongsTo('App/Models/TravelPlace')
    }

    luggageTypes () {
        return this.belongsTo('App/Models/LuggageType')
    }

    luggagePriceByWeightAndSize () {
        return this.belongsTo('App/Models/LuggagePriceByWeightAndSize')
    }

}

module.exports = TicketLuggageTypeLuggagePriceBy
