'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ExpeditionState extends Model {

    expeditions () {
        return this.hasMany('App/Models/Expedition')
    }
    
}

module.exports = ExpeditionState
