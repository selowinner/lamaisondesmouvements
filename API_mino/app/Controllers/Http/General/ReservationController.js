'use strict'

const { validateAll } = use('Validator')
const TicketLuggageTypeLuggagePriceBy = use('App/Models/TicketLuggageTypeLuggagePriceBy')
const TravelsPlaces = use('App/Models/TravelPlace')
const Tickets = use('App/Models/Ticket')
const ReservationReceipts = use('App/Models/ReservationReceipt')





class ReservationController {




    async add({request, response}){

        //GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            travel_id: 'required', 
            number_of_places: 'required',
            client_complet_name: 'required',
            number_luggage: 'required',
            luggage_type_id: 'required',
            luggage_price_by_weight_and_size_id: 'required',
            total_places_price: 'required',
            total_luggages_price: 'required',
            total__price: 'required'
        }
        const bodyValidation = await validateAll(body, rules)

        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs' }
        }


        // MAKE A RESERVATION

        /* Verify the number of not reserves place */
        const availablePlaceCount = await TravelsPlaces.query().where('travel_id', body.travel_id).where('reservation_state', 0).count()
        const availablePlace = availablePlaceCount[0]['count(*)']

        if (body.number_of_places > availablePlace) {
            console.log(availablePlace);
            return { message: 'Le nombre de ticket disponible est insuffisant' }
        }
    
        /* Reserved a place */
        const indexLimit = parseInt(body.number_of_places) + 1
        for (let index = 1; index < indexLimit; index++) {
            const PLaceNotReserved = await TravelsPlaces.query().where('travel_id', body.travel_id).where('reservation_state', 0).first()   
            PLaceNotReserved.reservation_state = 1
    
            await PLaceNotReserved.save()   
        }

        


        // ADD NEW TICKET 

        /* Matricule Generated*/
        const words = ['HHJH', 'YUAPEI', 'AZNSB', 'WJKDH', 'FNGQO', 'MANGER', 'POUET', 'ADORAR', 'OTHER']
        const codes = ['12@J40', '4U5#8', '96&O5', '58%A4', '6X52$', '6X!52']
        var today = new Date()

        const matricule = 'TRAVEL' + today.getSeconds() + wordGeneration() + codeGeneration() + today.getHours()

        function wordGeneration() {return words[Math.round(Math.random()*8)]}
        function codeGeneration() {return codes[Math.round(Math.random()*5)]}

        /* Ticket Adding */
        const ticket = new Object()
        ticket.matriculation = matricule
        ticket.number_of_places = body.number_of_places
        ticket.client_complet_name = body.client_complet_name
        ticket.travel_id = body.travel_id
        ticket.number_luggage = body.number_luggage
        ticket.ticket_state_id = 1

        const newTicket = await Tickets.create(ticket)



        // ADD NEW RALATION BETWEEN TICKET, LUGGAGE AND LUGGAGE PRICE 
        const ticketLuggagePrice = new Object()
        ticketLuggagePrice.ticket_id = newTicket.id
        ticketLuggagePrice.luggage_type_id = body.luggage_type_id
        ticketLuggagePrice.luggage_price_by_weight_and_size_id = body.luggage_price_by_weight_and_size_id

        const newTicketLuggagePrice = await TicketLuggageTypeLuggagePriceBy.create(ticketLuggagePrice)


        
        // ADD NEW RESERVATION RECEIPT
        const reservationReceipt = new Object()
        reservationReceipt.total_places_price = body.total_places_price
        reservationReceipt.total_luggages_price = body.total_luggages_price
        reservationReceipt.total__price = body.total__price
        reservationReceipt.tickets_id = newTicket.id

        const newReservationReceipt = await ReservationReceipts.create(reservationReceipt)
    
        

        // RESPONSE
        response.json({
            message: 'success',
            data: {newTicket, newReservationReceipt}
        })

     
    
    }





}

module.exports = ReservationController
