'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LuggageType extends Model {


    company () {
        return this.belongsTo('App/Models/Company')
    }

    luggagePriceByWeightAndSize () {
        return this.hasMany('App/Models/LuggagePriceByWeightAndSize')
    }

    ticketLuggageANDLuggagePriceByRelation () {
        return this.hasMany('App/Models/TicketLuggageTypeLuggagePriceBy')
    }

}

module.exports = LuggageType
