'use strict'

const { validateAll } = use('Validator')
const TicketLuggageTypeLuggagePriceBy = use('App/Models/TicketLuggageTypeLuggagePriceBy')
const TravelsPlaces = use('App/Models/TravelPlace')
const Tickets = use('App/Models/Ticket')
const ReservationReceipts = use('App/Models/ReservationReceipt')
const Travels = use('App/Models/Travel')
const Reimbursements = use('App/Models/ClientReimbursement')





class ReservationController {




    async add({request, response}){

        //GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            travel_id: 'required', 
            number_of_places: 'required',
            client_complet_name: 'required',
            // number_luggage: 'required',
            // luggage_type_id: 'required',
            // luggage_price_by_weight_and_size_id: 'required',
            total_places_price: 'required',
            // total_luggages_price: 'required',
            total__price: 'required'
        }
        const bodyValidation = await validateAll(body, rules)

        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs' }
        }


        // MAKE A RESERVATION

        /* Verify the number of not reserves place */
        const availablePlaceCount = await TravelsPlaces.query().where('travel_id', body.travel_id).where('reservation_state', 1).count()
        const availablePlace = availablePlaceCount[0]['count(*)']

        if (body.number_of_places > availablePlace) {
            console.log(availablePlace);
            return { message: 'Le nombre de ticket disponible est insuffisant' }
        }
    
        /* Reserved a place */
        const indexLimit = parseInt(body.number_of_places) + 1
        for (let index = 1; index < indexLimit; index++) {
            const PLaceNotReserved = await TravelsPlaces.query().where('travel_id', body.travel_id).where('reservation_state', 1).first()   
            PLaceNotReserved.reservation_state = 2
    
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

       
        // ****** VERIFY IF THE CLIENT HAVE A LUGGAGE. ********
        let newTicket

        if (!body.number_luggage) {
            /* Ticket Adding */
            const ticket = new Object()
            ticket.matriculation = matricule
            ticket.number_of_places = body.number_of_places
            ticket.client_complet_name = body.client_complet_name
            ticket.travel_id = body.travel_id
            ticket.ticket_state_id = 2

            if (body.travel_intermadiate_station) {
                ticket.travel_intermadiate_station = body.travel_intermadiate_station
            }

            newTicket = await Tickets.create(ticket)
           
                
        } else {

            /* Ticket Adding */
            const ticket = new Object()
            ticket.matriculation = matricule
            ticket.number_of_places = body.number_of_places
            ticket.client_complet_name = body.client_complet_name
            ticket.travel_id = body.travel_id
            ticket.number_luggage = body.number_luggage
            ticket.ticket_state_id = 2

            newTicket = await Tickets.create(ticket)

            // ADD NEW RALATION BETWEEN TICKET, LUGGAGE AND LUGGAGE PRICE 
            const ticketLuggagePrice = new Object()
            ticketLuggagePrice.ticket_id = newTicket.id
            ticketLuggagePrice.luggage_type_id = body.luggage_type_id
            ticketLuggagePrice.luggage_price_by_weight_and_size_id = body.luggage_price_by_weight_and_size_id

            const newTicketLuggagePrice = await TicketLuggageTypeLuggagePriceBy.create(ticketLuggagePrice)
            
            
        }
       // ****** END OF VERIFCATION ********


        // ADD NEW RESERVATION RECEIPT
        const reservationReceipt = new Object()
        reservationReceipt.total_places_price = body.total_places_price
        reservationReceipt.total__price = body.total__price
        reservationReceipt.tickets_id = newTicket.id
        if (body.total_luggages_price) {
            reservationReceipt.total_luggages_price = body.total_luggages_price
        } else {
            reservationReceipt.total_luggages_price = 0
        }
        
        const newReservationReceipt = await ReservationReceipts.create(reservationReceipt)
    
        

        // RESPONSE
        response.json({
            message: 'success',
            data: {newTicket, newReservationReceipt}
        })

     
    
    }



    

    async remove({request, response}){

        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            matriculation: 'required',
            reimbursement_Method: 'required', 
            // client_complet_name: 'required',
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs' }
        }


        // VERIFY
        // Annulation time
        const GetTheTicket = await Tickets.query().where('matriculation', body.matriculation).where('ticket_state_id', 2).first()
        const TravelInfo = await Travels.query().where('id', GetTheTicket.travel_id).select('departure_date', 'departure_time').first()
        const departureDateToString = TravelInfo.departure_date.toString()
        const AddDepartureTimeToDepartureDate = departureDateToString.replace("00:00:00", TravelInfo.departure_time)
        const annulationDate = new Date(AddDepartureTimeToDepartureDate);
        const annulationDateInTime = Math.round(annulationDate.getTime() / 1000) - 1800
        // Currente time
        const CurrentDate =  new Date()
        const CurrentDateInTime = Math.round(CurrentDate.getTime() / 1000)

        

        console.log(CurrentDateInTime + " :::::::: " + annulationDateInTime + " :::::::: " + GetTheTicket.travel_id);
        // verification
        if (CurrentDateInTime > annulationDateInTime) {
            // response
            response.json({
                message: 'Vous ne pouvez annuler votre reservation que 30min avant le depart',
            })
            
        } else{

             // CANCELLATION OF TICKET
            const cancellation = await Tickets.query().where('matriculation', body.matriculation).update({ticket_state_id: 1})
            

            // RELEASE PLACE RESERVED
            if (cancellation == 1) {
                // get the number of place to cancelled
                const placeToCancel = await Tickets.query()
                .where('matriculation', body.matriculation)
                .select('number_of_places', 'travel_id').first()

                // cancelling the reservation of places reserved
                const indexLimit = placeToCancel.number_of_places + 1
                for (let index = 1; index < indexLimit; index++) {
                    const PLaceNotReserved = await TravelsPlaces.query().where('travel_id', placeToCancel.travel_id).where('reservation_state', 2).first()   
                    PLaceNotReserved.reservation_state = 1
            
                    await PLaceNotReserved.save()
                }

                // get  some rembursement information
                const rembursementInfo = await ReservationReceipts.query()
                .innerJoin('Tickets', 'Tickets.id', 'reservation_receipts.tickets_id')
                .select('Tickets.id', 'Tickets.client_complet_name', 'Tickets.client_call_number', 'total__price')
                .where('matriculation', body.matriculation)
                .first()
                

                const rembursementCompanyInfo01 = await Tickets.query()
                .select('travel_id').where('id', rembursementInfo.id).first()
                
                const rembursementCompanyInfo = await Travels.query()
                .select('company_id').where('id', rembursementCompanyInfo01.travel_id).first()
                
                let newreimbursement

                if (body.reimbursement_Method == 'mobile_money' ) {

                    const reimbursement = new Object()
                    reimbursement.client_call_number = rembursementInfo.client_call_number 
                    reimbursement.money_to_pay_back = rembursementInfo.total__price
                    reimbursement.client_complet_name = rembursementInfo.client_complet_name 
                    reimbursement.pay_back_delai = 720000 // à définir
                    reimbursement.pay_back_method_id = 1 
                    reimbursement.company_id = rembursementCompanyInfo.company_id 
                    reimbursement.tickets_id = rembursementInfo.id 
        
        
                    newreimbursement = await Reimbursements.create(reimbursement)
                    // response
                    response.json({
                        message: 'annulation effectuée, voici le bon d_achat',
                        data: {newreimbursement}
                    })


                }else{


                    /* Coupon Generated*/
                    const words = ['HHJH', 'YUAPEI', 'AZNSB', 'WJKDH', 'FNGQO', 'MANGER', 'POUET', 'ADORAR', 'OTHER']
                    const codes = ['12@J40', '4U5#8', '96&O5', '58%A4', '6X52$', '6X!52']
                    var today = new Date()

                    const Coupon = 'TRAVEL' + today.getSeconds() + wordGeneration() + codeGeneration() + today.getHours()

                    function wordGeneration() {return words[Math.round(Math.random()*8)]}
                    function codeGeneration() {return codes[Math.round(Math.random()*5)]}

                    const reimbursement = new Object()
                    reimbursement.client_call_number = rembursementInfo.client_call_number 
                    reimbursement.money_to_pay_back = rembursementInfo.total__price
                    reimbursement.client_complet_name = rembursementInfo.client_complet_name 
                    reimbursement.pay_back_delai = 10 // à définir
                    reimbursement.coupon_code = Coupon 
                    reimbursement.pay_back_method_id = 2 
                    reimbursement.company_id = rembursementCompanyInfo.company_id 
                    reimbursement.tickets_id = rembursementInfo.id 

                    newreimbursement = await Reimbursements.create(reimbursement)
                    // response
                    response.json({
                        message: 'annulation effectuée',
                        data: {newreimbursement}
                    })   
                }
                

            } else {
                // response
                response.json({
                    message: 'problème au niveau de la requête',
                })  
            }
     

        }

       
    
    }





}

module.exports = ReservationController
