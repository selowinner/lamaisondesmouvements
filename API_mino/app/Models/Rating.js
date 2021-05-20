'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rating extends Model {


    CompaniesCentral () {
        return this.belongsTo('App/Models/CompaniesCentral')
    }

}

module.exports = Rating
