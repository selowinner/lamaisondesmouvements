'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Withdrawal extends Model {
    company () {
        return this.belongsTo('App/Models/Company')
    }

    WithdrawalPriceByWeightAndSize () {
        return this.hasMany('App/Models/WithdrawalPriceByWeightAndSize')
    }

}

module.exports = Withdrawal
