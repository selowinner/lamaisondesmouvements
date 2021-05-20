'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Company extends Model {

    users () {
        return this.hasMany('App/Models/User')
    }

    deliveryMen () {
        return this.hasMany('App/Models/DeliveryMan')
    }

    LuggageTypes () {
        return this.hasMany('App/Models/LuggageType')
    }

    expeditions () {
        return this.hasMany('App/Models/Expedition')
    }

    // rating () {
    //     return this.hasMany('App/Models/Rating')
    // }

    priceOfWithdrawalsAndDelivery () {
        return this.hasMany('App/Models/PriceOfWithdrawalsAndDelivery')
    }

    lostObjets () {
        return this.hasMany('App/Models/LostObjet')
    }

    travels () {
        return this.hasMany('App/Models/Travel')
    }

    companyUseOption () {
        return this.belongsTo('App/Models/CompanyUseOption')
    }


    tickets () {
        return this.hasManyThrough('App/Model/Ticket', 'App/Model/Travel')
    }


    CompaniesCentral () {
        return this.belongsTo('App/Models/CompaniesCentral')
    }

    // CompaniesStations () {
    //     return this.hasMany('App/Models/CompaniesStation')
    // }


}

module.exports = Company
