'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Expedition extends Model {


    company () {
        return this.belongsTo('App/Models/Company')
    }

    deliveryMen () {
        return this.belongsToMany('App/Models/DeliveryMan')
    }

    expeditionState () {
        return this.belongsTo('App/Models/Company')
    }

}

module.exports = Expedition
