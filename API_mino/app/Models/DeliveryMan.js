'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DeliveryMan extends Model {

    company () {
        return this.belongsTo('App/Models/Company')
    }

    expeditions () {
        return this.belongsToMany('App/Models/Expedition')
    }

}

module.exports = DeliveryMan
