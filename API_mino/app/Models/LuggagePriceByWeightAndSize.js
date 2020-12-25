'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LuggagePriceByWeightAndSize extends Model {

    luggageTypes () {
        return this.belongsTo('App/Models/LuggageType')
    }

}

module.exports = LuggagePriceByWeightAndSize
