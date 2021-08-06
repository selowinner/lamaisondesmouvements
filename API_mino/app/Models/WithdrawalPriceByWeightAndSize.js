'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class WithdrawalPriceByWeightAndSize extends Model {

    withdrawal () {
        return this.belongsTo('App/Models/Withdrawal')
    }

}

module.exports = WithdrawalPriceByWeightAndSize
