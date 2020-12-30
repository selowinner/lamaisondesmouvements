'use strict'

const { validateAll } = use('Validator')
const Travels = use('App/Models/Travel')
const Tickets = use('App/Models/Ticket')
const ReservationReceipt = use('App/Models/ReservationReceipt')





class TravelController {


    // FOR PLACE RESERVATION
    async getListForAReservation({request, response}){

        //GET DATA
        const body = request.all()

        // GET LISTE OF TRAVELS
        const travelListeNotInJson = await Travels.query().where('id', body.product_id).first()
        const travelListe = productToUpdated.toJSON()
        console.log(travelListe)
     
    }





}

module.exports = TravelController
