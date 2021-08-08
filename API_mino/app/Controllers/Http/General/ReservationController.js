'use strict'

const { validateAll } = use('Validator')
const TicketLuggageTypeLuggagePriceBy = use('App/Models/TicketLuggageTypeLuggagePriceBy')
const TravelsPlaces = use('App/Models/TravelPlace')
const Tickets = use('App/Models/Ticket')
const ReservationReceipts = use('App/Models/ReservationReceipt')
const Travels = use('App/Models/Travel')
const Reimbursements = use('App/Models/ClientReimbursement')
const TravelIntermadiateStations = use('App/Models/TravelIntermadiateStation')






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
            } //embarquer dans un lieu autre que la gare, néccessite de na pas avoir de bagage

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
                    reimbursement.pay_back_delai = 240000 // à définir
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




    ///////////////////////////////////////////////////////////
    /* FOR TRAVELER EMBARCATION VERIFICATION IN THE CONVEYOR TABLET */
    ///////////////////////////////////////////////////////////
    async getListeOfTraveler({params, response}){

        // GET ALL TRAVELS OF THE DAY
        //---- get current date
        const today =  new Date()
        const CurrentDate = today.getFullYear()+'-'+(today.getMonth()+1) +'-'+today.getDate()
        //------do the request
        const ListOfTravelNotInJson = await Travels
        .query()
        .where('company_id', params.id)
        .where('departure_date', CurrentDate)
        .select('id', 'car_matriculation', 'departure_place', 'destination', 'departure_time', 'place_to_sell_by_mino_number').fetch()
        const ListOfTravel = ListOfTravelNotInJson.toJSON()
        // GET THE TRAVELER LIST FOR EACH TRAVEL
        for (let index = 0; index < ListOfTravel.length; index++) {
            const ListOfTravelerNotInJson = await Tickets
            .query()
            .where('travel_id', ListOfTravel[index].id)
            .select('id','client_complet_name', 'matriculation', 'number_of_places', 'travel_intermadiate_station')
            .fetch()

            ListOfTravel[index].travelerlist = ListOfTravelerNotInJson.toJSON()
            //---- get the station name
            for (let i = 0; i < ListOfTravel[index].travelerlist.length; i++) {
               if (ListOfTravel[index].travelerlist[i].travel_intermadiate_station != null) {
                const TravelIntermadiateStationNotInJson = await TravelIntermadiateStations
                .query()
                .where('id', ListOfTravel[index].travelerlist[i].travel_intermadiate_station)
                .select('station_name')
                .first()
                const TravelIntermadiateStation = TravelIntermadiateStationNotInJson.toJSON()
                ListOfTravel[index].travelerlist[i].travel_intermadiate_station = TravelIntermadiateStation
               }
            }
        }

        response.json({
            message: 'success',
            data: ListOfTravel
        })
        
        

        
    }


    async updateTravelerEmbarcationStatut({params, response}){

        // GET ALL TRAVELS OF THE DAY
        //------ initialisation of the object to merge
        const newticketState = new Object()
        newticketState.ticket_state_id = 3 
        //------do the request 
        const theTicket = await Tickets.find(params.id)
        theTicket.merge(newticketState)
        const newStatut = await theTicket.save()

        response.json({
            message: 'success',
            data: newStatut
        })
        
        
    }



    

    ///////////////////////////////////////////////////////////
    /* FOR RESERVATION MANAGEMENT IN THE ADMINISTRATION SOFTWARE TOOL */
    ///////////////////////////////////////////////////////////

    async getListeOfReservationoForAdmin({params, response}){

          // GET LIST OF RECEIPT
          const ListOfreservationNotInJson = await ReservationReceipts
          .query()
          .innerJoin('tickets', 'tickets.id', 'reservation_receipts.tickets_id')
        //   .where('travel_id', ListOfTravel[index].id)
          .select('tickets.id', 'travel_id','client_complet_name', 'matriculation', 'number_of_places', 'travel_intermadiate_station', 'total_places_price', 'total_luggages_price', 'total__price')
          .fetch()
          const ListOfreservation = ListOfreservationNotInJson.toJSON()
        

          for (let index = 0; index < ListOfreservation.length; index++) {
            // THE DESTINATION
            const ListOfdestDepartNotInJson = await Travels
            .query()
            .innerJoin('companies', 'companies.id', 'travels.company_id')
            .where('travels.id', ListOfreservation[index].travel_id)
            .select('destination', 'departure_date', 'car_informations', 'departure_place', 'departure_time', 'car_matriculation','denomination')
            .first()
            const DestDepart = ListOfdestDepartNotInJson.toJSON()
            ListOfreservation[index].travel =  DestDepart
            // // THE INTERMADIATE STATION
            if (ListOfreservation[index].travel_intermadiate_station) {
                const intermadiateNotInJson = await TravelIntermadiateStations
                .query()
                .where('id', ListOfreservation[index].travel_intermadiate_station)
                .select('station_name')
                .first()
                const DestIntermadiaire = intermadiateNotInJson.toJSON()
                ListOfreservation[index].DestIntermadiaire =  DestIntermadiaire.station_name
            }

            // const ListOfreservationNotInJson = await Travels
            // .query()
            // .where('id', ListOfreservation[index].id)
            // .select('destination', 'departure_date')
            // .fetch()
            // const DestDepart = ListOfreservationNotInJson.toJSON()
            // ListOfreservation[index].destination =  DestDepart.destination
            // ListOfreservation[index].departure_date =  DestDepart.departure_date
        }



        
        // const ListOfTravelNotInJson = await Travels
        // .query().where('company_id', params.id).fetch()
        // const ListOfTravel = ListOfTravelNotInJson.toJSON()

      
        

       

        response.json({
            message: 'success',
            data: ListOfreservation
        })
        

        
    }


    // const ListOfTravelerNotInJson = await Tickets
    //         .query()
    //         .where('travel_id', ListOfTravel[index].id)
    //         .select('id','client_complet_name', 'matriculation', 'number_of_places', 'travel_intermadiate_station')
    //         .fetch()




}

module.exports = ReservationController
