'use strict'

const { validateAll } = use('Validator')
const Travels = use('App/Models/Travel')
const TravelIntermadiateStations = use('App/Models/TravelIntermadiateStation')
const TravelPlaces = use('App/Models/TravelPlace')
const Tickets = use('App/Models/Ticket')
const ReservationReceipts = use('App/Models/ReservationReceipt')
const companies = use('App/Models/Company')
const Reimbursements = use('App/Models/ClientReimbursement')





class TravelController {

    /////////////////////////////////////////////
    /* FOR PLACE RESERVATION IN THE MOBILE APP */
    ////////////////////////////////////////////

    async getListForAReservation({request, response}){


        const body = request.only(['departure_date', 'departure_place', 'destination', 'departure_time'])
        
        // DATA VALIDATION
        const rules = {
            departure_date: 'required',
            departure_place: 'required',
            destination: 'required',
            departure_time: 'required'
        }
        const bodyValidation = await validateAll(body, rules)

        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs' }
          
        }


        // VERIFY IF LE INPUT TIME IS NOT A PASSED TIME OR PASSED DATE
        // Convert input date to second
        const departureDate = body.departure_date + "T" + body.departure_time
        const TotaldepartureDate = new Date(departureDate);
        const TotaldepartureDateInTime = Math.round(TotaldepartureDate.getTime() / 1000)
        // Currente time in second
        const CurrentDate =  new Date()
        const CurrentDateInTime = Math.round(CurrentDate.getTime() / 1000)
        // verification
        if (CurrentDateInTime > TotaldepartureDateInTime) {
            
            // response
            response.json({
                message: 'Les départs pour de cette heure ont déjà été effectués',
            })
            // console.log(CurrentDateInTime + " :::::: " + TotaldepartureDateInTime)




        }else{



            // TIME INTERVAL CALCULATION
        const departure_time = body.departure_time 
        const heure = departure_time.substr(0, 2)
        const departure_time_proposition_limit = parseInt(heure) + 1 + departure_time.substr(2)

         // GET THE PRINCIPAL TRAVEL LIST
        const pricipalTravelListeNotInJson = await Travels
        .query()
        .innerJoin('Companies', 'companies.id', 'Travels.company_id')
        .where('departure_date', body.departure_date)
        .where('departure_place', body.departure_place)
        .where('destination', body.destination)
        .where('annulation_state', 0) /*Nouveau pas teste*/
        .whereBetween('departure_time', [departure_time,  departure_time_proposition_limit])
        .select('Travels.id', 'Travels.place_price', 'companies.denomination')
        .fetch() 
        // chercher à parfaire la requête pour limité la liste des informations pour chaque voyage

        const pricipalTtravelListe = pricipalTravelListeNotInJson.toJSON()


        // GET THE TRAVEL LIST SUGGESTION
        const SuggestionTravelListeNotInJson = await Travels
        .query()
        .innerJoin('Companies', 'Companies.id', 'Travels.company_id')
        .where('departure_date', body.departure_date)
        .where('departure_place', body.departure_place)
        .where('destination', body.destination)
        .where('annulation_state', 0) /*Nouveau pas teste*/
        .whereNotBetween('departure_time', [departure_time,  departure_time_proposition_limit])
        .select('Travels.id', 'Travels.place_price', 'Travels.departure_time', 'Companies.denomination')
        .fetch() 

        const SuggestionTtravelListe = SuggestionTravelListeNotInJson.toJSON()


        // LIST OF TRAVEL RETURN
        const travelListe = new Object()
        travelListe.pricipal = pricipalTtravelListe
        travelListe.Suggestion =  SuggestionTtravelListe
        
        response.json({
            message: 'success',
            data: travelListe
        })


        }


        
    }


    async getTodayListOfCountryForAReservation({response}){

        // Currente time
        const CurrentDate =  new Date() 
        const currentMonthPlusOne = CurrentDate.getMonth()+1
        const kkk = CurrentDate.getFullYear() + "-" + currentMonthPlusOne  + "-" + CurrentDate.getDate() 
 
        // GET THE TRAVEL LIST SUGGESTION
        const ListOfCountryNotInJson = await Travels
        .query()
        .where('departure_date', kkk)
        .select('departure_place')
        .groupBy('departure_place')
        .fetch()

        const ListOfCountry = ListOfCountryNotInJson.toJSON()

        response.json({
            message: 'success',
            data: ListOfCountry
        })
        

        
    }


    async getWeekListOfCountryForAReservation({response}){

        // Currente time
        const CurrentDate =  new Date() 
        const currentMonthPlusOne = CurrentDate.getMonth()+1
        const CurrentDateInTime = CurrentDate.getFullYear() + "-" + currentMonthPlusOne  + "-" + CurrentDate.getDate() 
       
        // GET THE TRAVEL LIST SUGGESTION
        const ListOfCountryNotInJson = await Travels
        .query()
        .whereBetween('departure_date', [CurrentDateInTime,  "2050-07-05"])
        .select('departure_place')
        .groupBy('departure_place')
        .fetch()

        const ListOfCountry = ListOfCountryNotInJson.toJSON()

        response.json({
            message: 'success',
            data: ListOfCountry
        })
        

        
    }


    async getListIntermadiateStationForAReservation({request, response}){

        const body = request.only(['travel_id'])

       // GET THE TRAVEL INTERMADIATES STATIONS LIST SUGGESTION
       const IntermadiateStationNotInJson = await TravelIntermadiateStations
       .query()
       .where('travel_id', body.travel_id)
       .select('id', 'station_name')
       .fetch()

       const IntermadiateStation = IntermadiateStationNotInJson.toJSON()

       response.json({
           message: 'success',
           data: IntermadiateStation
       })

        

        
    }
    





    ///////////////////////////////////////////////////////////
    /* FOR TRAVEL DECLARATION IN THE COMPANIES STATION SOFTWARE TOOL */
    ///////////////////////////////////////////////////////////

    async addTravel({request, response}){


        const body = request.all()
        
        // DATA VALIDATION
        const rules = {
            car_informations: 'required',
            car_matriculation: 'required',
            departure_place: 'required',
            destination: 'required',
            departure_time: 'required',
            departure_date: 'required',
            // place_to_sell_by_mino_number: 'required',
            total_car_place_number: 'required',
            place_price: 'required',
            // annulation_of_reservation_Limit_Time: 'required',
            company_id: 'required',
            user_id: 'required'
        }
        const bodyValidation = await validateAll(body, rules)

        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs' }
        }

        // VERIFY IF THE TRAVEL HAVE ALREADY ADDED
        const verifyTravel = await Travels.query()
            .where('destination', body.destination)
            .where('departure_date', body.departure_date)
            .where('departure_time', body.departure_time)
            .count()
        const verifyNumber = verifyTravel[0]['count(*)']
        if (verifyNumber > 0) {
            return { message: 'ce voyage à déjà été ajouté' }
        }

        // ADD INTERMADIATE STATION
        // body.Intemediatestation = [
        //     {
        //       station_name: 'Akouedo',
        //       travel_id: 1,
        //     },
        //     {
        //       station_name: 'n_douci',
        //       travel_id: 1,
        //     }
        //   ]

        
        
        // ADD THE OTHER INFORMATIONS
        if (body.place_to_sell_by_mino_number) {
            const option1Travel = new Object()
            option1Travel.car_informations = body.car_informations
            option1Travel.car_matriculation = body.car_matriculation
            option1Travel.departure_place = body.departure_place
            option1Travel.destination = body.destination
            option1Travel.departure_time = body.departure_time

            option1Travel.departure_date = body.departure_date
            option1Travel.place_to_sell_by_mino_number = body.place_to_sell_by_mino_number
            option1Travel.total_car_place_number = body.total_car_place_number
            option1Travel.place_price = body.place_price

            option1Travel.annulation_of_reservation_Limit_Time = "10:00:00"
            option1Travel.company_id = body.company_id
            option1Travel.user_id = body.user_id

            const newoption1Travel = await Travels.create(option1Travel)

            let placeToCreateLimite = parseInt(body.place_to_sell_by_mino_number) + 1

            // FAIRE UN AJOUT MULTIPLE DE CHAQUE PLACE

            for (let index = 1; index < placeToCreateLimite; index++) {
            
                let travelPlace = new Object()
                travelPlace.place = index
                travelPlace.travel_id = newoption1Travel.id

                const newTravelPlace = await TravelPlaces.create(travelPlace)

                
            }

            // ADD INTERMADIATE STATION
            if (body.Intemediatestation) {
                for (let index = 0; index < body.Intemediatestation.length; index++) {
                    body.Intemediatestation[index].travel_id = newoption2Travel.id;
                }
                const newTravelIntermadiateStation = await TravelIntermadiateStations.createMany(body.Intemediatestation)
            }

            

            // RESPONSE
            response.json({
                message: 'success',
                data: {newoption1Travel}
            })


        } else {
            
            const option2Travel = new Object()
            option2Travel.car_informations = body.car_informations
            option2Travel.car_matriculation = body.car_matriculation
            option2Travel.departure_place = body.departure_place
            option2Travel.destination = body.destination
            option2Travel.departure_time = body.departure_time

            option2Travel.departure_date = body.departure_date
            option2Travel.place_to_sell_by_mino_number = body.total_car_place_number
            option2Travel.total_car_place_number = body.total_car_place_number
            option2Travel.place_price = body.place_price

            option2Travel.annulation_of_reservation_Limit_Time = "20:00:00"
            option2Travel.company_id = body.company_id
            option2Travel.user_id = body.user_id
           
            const newoption2Travel = await Travels.create(option2Travel)

            let placeToCreateLimite1 = parseInt(option2Travel.place_to_sell_by_mino_number) + 1
            // FAIRE UN AJOUT MULTIPLE DE CHAQUE PLACE
            
            for (let index = 1; index < placeToCreateLimite1; index++) {
                let travelPlace1 = new Object()
                travelPlace1.place = index
                travelPlace1.travel_id = newoption2Travel.id

                const newTravelPlace = await TravelPlaces.create(travelPlace1)
            
            }
            
              // ADD INTERMADIATE STATION
              console.log(body.Intemediatestation);
              if (body.Intemediatestation) {
                // console.log('je suis féé');
                for (let index = 0; index < body.Intemediatestation.length; index++) {
                    body.Intemediatestation[index].travel_id = newoption2Travel.id;
                }
                // console.log( body.Intemediatestation);
                const newTravelIntermadiateStation = await TravelIntermadiateStations.createMany(body.Intemediatestation)
            }
            
             // RESPONSE
             response.json({
                message: 'success',         
                data: {newoption2Travel}
            })
            
        }

        


        
    }


    async getListeOfTravel({params, response}){

 
        // GET THE TRAVEL LIST WITHOUT CANCELLING TRAVELS
        const ListOfTravelNotInJson = await Travels
        .query()
        .where('company_id', params.id)
        .where('annulation_state', 0)
        .select('id', 'departure_date', 'departure_time', 'place_price', 'destination', 'place_to_sell_by_mino_number')
        .orderBy('departure_date', 'desc')
        .fetch()

        const ListOfTravel = ListOfTravelNotInJson.toJSON()

        for (let i = 0; i < ListOfTravel.length; i++) {
            const reservedPlaceNumber = await TravelPlaces
                .query()
                .where('travel_id', ListOfTravel[i].id)
                .where('reservation_state', 1)
                .count()
            
            const canceledReservationNumber = await Tickets
                .query()
                .where('travel_id', ListOfTravel[i].id)
                .where('ticket_state_id', 1)
                .count()

            ListOfTravel[i].reservedPlaceNumber = reservedPlaceNumber[0]['count(*)']
            ListOfTravel[i].canceledReservationNumber = canceledReservationNumber[0]['count(*)']
            
        }

        response.json({
            message: 'success',
            data: ListOfTravel
        })
        

        
    }


    async updateTravel({request, response}){


        const body = request.all()
        
        // DATA VALIDATION
        const rules = {
            id: 'required'
        }
        const bodyValidation = await validateAll(body, rules)

        // let dataToUpdate = body
        // console.log(dataToUpdate);

        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de de reseigner le le ID du voayge' }
        }

        if (body.destination || body.departure_time || body.departure_date || body.place_price ) {

            /* Verify if is not alway existe a revservation for this travel */
            const travelReservation = await Tickets.query().where('travel_id', body.id).where('ticket_state_id', 1).count()
            const TravelReservationNumber = travelReservation[0]['count(*)']
            
            if (TravelReservationNumber > 0) {
                return { message: 'des reservations ont déjà été faites pour ce voyage,  la modification du départ, de la date et du prix  n est donc plus possible' }
            }
    
            
        }

        let numberOfPlaceTosell = new Object()
        if (body.place_to_sell_by_mino_number) {
             /* Verify if is possible to change the number of place */
             const travelReservation = await TravelPlaces.query().where('travel_id', body.id).where('reservation_state', 1).count()
             const TravelReservationNumber = travelReservation[0]['count(*)']
            /* Get the travel place to sell by Mino */
            numberOfPlaceTosell = await Travels.query().where('id', body.id).select('place_to_sell_by_mino_number', 'company_id').first()
            
            // PAS ENCORE TESTE 
             if (TravelReservationNumber > body.place_to_sell_by_mino_number) {
                 return { message: 'Impossible ! le nouveau nombre de place à ajouter est inférieur au nombre de place déjà reservée' }
             }else if ((body.place_to_sell_by_mino_number > TravelReservationNumber  ) && (body.place_to_sell_by_mino_number < numberOfPlaceTosell.place_to_sell_by_mino_number )){
                 /* reduction of place de to sell */
                 console.log('poplplpoop');
                 const removeplaceNumber = (numberOfPlaceTosell.place_to_sell_by_mino_number - parseInt(body.place_to_sell_by_mino_number)) + 1
                 for (let index = 1; index < removeplaceNumber; index++) {       
                    const PLaceNotReserved = await TravelPlaces.query().where('travel_id', body.id).where('reservation_state', 0).first() 
                    await PLaceNotReserved.delete()   
                }
                 
             }else if (body.place_to_sell_by_mino_number > numberOfPlaceTosell.place_to_sell_by_mino_number ){
                const addNewplaceNumber = (parseInt(body.place_to_sell_by_mino_number) - numberOfPlaceTosell.place_to_sell_by_mino_number) + 1
                // FAIRE UN AJOUT MULTIPLE DE CHAQUE PLACE
                console.log('zeaaaaaahhh');
                for (let index = 1; index < addNewplaceNumber; index++) {
                    let travelPlace1 = new Object()
                    travelPlace1.place = index
                    travelPlace1.travel_id = body.id

                    const newTravelPlace = await TravelPlaces.create(travelPlace1)
                
                }
            }
            
        } 


       
        //  CHECK TO SEE IF IT IS NECESSARY TO UPDATE THE GENERAL NUMBER OF PLACE
        // const CompagnieOption = await companies.query().where('id', numberOfPlaceTosell.company_id).select('use_option_id').first()
        // if (CompagnieOption.use_option_id == 1) {
        //     body.total_car_place_number = body.place_to_sell_by_mino_number
        // }
        console.log(body);
        const TheTravel = await Travels.find(body.id)
        

        TheTravel.merge(body)
        console.log(TheTravel);
        await TheTravel.save()
        return { message: 'success' }


        //  ENCLENCHER LA PROCEDURE DE REMBOURSEMENT

        
    }



    async travelCancellation({request, response}){

        const body = request.all()
        
        // DATA VALIDATION
        const rules = {
            travel_id: 'required'
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de de renseigner le ID du voayge' }
        }

        // CANCELLATION
        /*initialisation de l'objet à fusionner pour la modification de l'etat d'annulation, 
         qui est mis à 1 en cas d'annulation*/
        let annulation = new Object()
        annulation.annulation_state = 1
        
        const travelReservation = await Tickets.query().where('travel_id', body.travel_id).where('ticket_state_id', 2).count()
        const TravelReservationNumber = travelReservation[0]['count(*)']
        console.log(TravelReservationNumber);
        if ((TravelReservationNumber > 0) && body.comfirmation) {
            // annulation avec remboursement
            const TheTravel = await Travels.find(body.travel_id)
            TheTravel.merge(annulation)
            await TheTravel.save()

            // Initialisation de la list des client
            let reimbursementList = []

            // get  some rembursement information
            const rembursementInfo = await ReservationReceipts.query()
            .innerJoin('Tickets', 'Tickets.id', 'reservation_receipts.tickets_id')
            .select('Tickets.id', 'Tickets.client_complet_name', 'Tickets.client_call_number', 'total__price')
            .where('Tickets.travel_id', body.travel_id)
            .where('Tickets.ticket_state_id', 2)
            .fetch()
            const rembursementInfos = rembursementInfo.toJSON()
            // get  the compagny id
            const company_id = await companies.query().select('id').first()
            // add some other information  to each row
            for (let index = 0; index < rembursementInfos.length; index++) {
                // rembursementInfos[index].company_id  = company_id.id
                // rembursementInfos[index].pay_back_delai  = 240000
                // rembursementInfos[index].pay_back_method_id  = 1
                let leo = new Object()
                reimbursementList.push(leo)
                reimbursementList[index].company_id = company_id.id
                reimbursementList[index].pay_back_delai = 240000
                reimbursementList[index].pay_back_method_id  = 1
                reimbursementList[index].client_call_number = rembursementInfos[index].client_call_number
                reimbursementList[index].money_to_pay_back = rembursementInfos[index].total__price
                reimbursementList[index].client_complet_name  = rembursementInfos[index].client_complet_name
                reimbursementList[index].tickets_id  = rembursementInfos[index].id
            }

            const newreimbursement = await Reimbursements.createMany(reimbursementList)
            
            response.json({
                message: 'success',
                data: {newreimbursement}
            })

        }else if (TravelReservationNumber > 0) {
            console.log(TravelReservationNumber);
            // demande de confirmation d'annulation
            return { message: 'confirmation' }
        
        }else if (TravelReservationNumber == 0) {
            // annlation simple, simple remboursement
            const TheTravel = await Travels.find(body.travel_id)
            TheTravel.merge(annulation)
            await TheTravel.save()
            response.json({
                message: 'success'
            })
         }


        //  ENCLENCHER LA PROCEDURE DE REMBOURSEMENT

        
    }



    async getTravelAnalytics({params, response}){
        // INIT
        const travelAnalytics = new Object();
        travelAnalytics.travelMadeTotalGain = 0
        // TIME
        const CurrentDate =  new Date()
        const CurrentDateInMilliseconds = CurrentDate.getTime()
        const CurrentYear = CurrentDate.getFullYear()
        const currentMonthPlusOne = CurrentDate.getMonth()+1
        let TheCurrentDay
        let dateLimitOne 
        let dateLimitTwo 
        let MonthInLetter 
        let firstday
        let lastday
        
        let vague = ""
        // CURRENT DATE
        if (params.period == 1) {
            // stat année
            dateLimitOne  = CurrentYear + "-01-01" 
            dateLimitTwo  = CurrentYear + "-12-31" 
            TheCurrentDay = CurrentYear + "-" + currentMonthPlusOne  + "-" + CurrentDate.getDate() 
            MonthInLetter = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
            vague = 'annee'
        }else if (params.period == 2) {
            // stat semestre
            // -----Identification du semestre concerné
            const semestre1 = [1,2,3,4,5,6]
            if (semestre1.indexOf(currentMonthPlusOne) === -1) {
                // cas semestre 2
                dateLimitOne  = CurrentYear + "-07-01" 
                dateLimitTwo  = CurrentYear + "-12-31" 
                MonthInLetter = ['Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
                vague = 'semestre2'
            }else{
                // cas semestre 1
                dateLimitOne  = CurrentYear + "-01-01" 
                dateLimitTwo  = CurrentYear + "-6-30"
                MonthInLetter = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin']
                vague = 'semestre1'
            }

        }else if (params.period == 3) {
            // cas du mois
            MonthInLetter = []
            let daysInMonth = new Date(CurrentYear, currentMonthPlusOne, 0).getDate();
            dateLimitOne  = CurrentYear + "-" + currentMonthPlusOne + "-01" 
            dateLimitTwo  = CurrentYear + "-" + currentMonthPlusOne + "-" + daysInMonth
            for (let index = 0; index < daysInMonth; index++) {
                MonthInLetter.push(index + 1)
                // MonthInLetter[index] = index + 1 ;
            }
            vague = 'mois'
        }else if (params.period == 4) {
            // cas de la semaine
            firstday = CurrentDate.getDate() - (CurrentDate.getDay() - 1)
            lastday = CurrentDate.getDate() - (CurrentDate.getDay() - 1) + 6;
            dateLimitOne  = CurrentYear + "-" + currentMonthPlusOne + "-" + firstday
            dateLimitTwo  = CurrentYear + "-" + currentMonthPlusOne + "-" + lastday
            MonthInLetter = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
            vague = 'semaine'
        }
       

        /*-----------------*/
        // FOR TRAVEL MADE
        /*-----------------*/

        // Step1: GET THE CURRENT PERIOD TRAVEL LIST WITHOUT CANCELLING TRAVELS
        // Utilisé aussi pour le graph
        const thisYearsTravelNotInJSON = await Travels.query()
        .where('company_id', params.id)
        .where('annulation_state', 0)
        .whereBetween('created_at', [dateLimitOne,  dateLimitTwo])
        .select('id', 'created_at', 'destination', 'place_price', 'departure_date')
        .fetch()
        const thisYearsTravel = thisYearsTravelNotInJSON.toJSON()

        // GET TRAVEL MADE
        const travelMade = []
        for (let index = 0; index < thisYearsTravel.length; index++) {
            const tempsLa =  new Date(thisYearsTravel[index].departure_date); 
            if (CurrentDateInMilliseconds > tempsLa.getTime() ) {
                travelMade.push(thisYearsTravel[index])
            }      
        }
        travelAnalytics.travelMadeNumber = travelMade.length


        // GAIN AND TICKETS SOLD BY TRAVEL MADE
        for (let index = 0; index < travelMade.length; index++) {
            // GET ALL TICKET whereNot
            const allTicketsNotInJson = await Tickets
                .query()
                .where('travel_id', travelMade[index].id)
                .whereBetween('created_at', [dateLimitOne,  dateLimitTwo])
                .andWhereNot('ticket_state_id', 1)
                .fetch()
            const allTickets = allTicketsNotInJson.toJSON()
            travelMade[index].ticketsSoldNumber = allTickets.length
            
            // GET GAIN GAIN OF EACH TICKET 
            if (allTickets.length > 0) {
                let totalGain = 0
                for (let i = 0; i < allTickets.length; i++) {
                    // const element = allTickets[i];
                    const gain_A = await ReservationReceipts
                        .query()
                        .where('tickets_id', allTickets[i].id)
                        .first()
                    const gain = gain_A.toJSON() 
                    totalGain += gain.total__price
                }
                travelMade[index].totalGain = totalGain
                travelAnalytics.travelMadeTotalGain += totalGain
            }else{
                travelMade[index].totalGain = 0
            }
        }

        travelAnalytics.travelMade = travelMade



        /*-----------------*/
        // FOR GRAPH
        /*-----------------*/

         // GET THE CURRENT PERIOD TICKET LIST WITHOUT CANCELLING TRAVELS
         const thisTicketsTNotInJSON = await Tickets
         .query()
         .innerJoin('Travels', 'travels.id', 'Tickets.travel_id')
         .where('company_id', params.id)
         .whereNot('ticket_state_id', 1)
         .whereBetween('Tickets.created_at', [dateLimitOne,  dateLimitTwo])
         .select('Tickets.id', 'Tickets.created_at')
         .fetch()
         const thisTicketsTravel = thisTicketsTNotInJSON.toJSON()
    
         // STEP 1: init the month table
        /*Current month*/ 
        // let currentdate = new Date();
        // const currentmonth = currentdate.getMonth()+1

         /*Initialisation*/
         let monthTable = []
         if (vague == 'annee') {
            for (let index = 0; index < currentMonthPlusOne; index++) {
                monthTable[index] = {'month': index + 1, 'data': [0,0]}   
            }
         }else if (vague == 'semestre2') {
            for (let index = 6; index < currentMonthPlusOne; index++) {
                monthTable.push({'month': index + 1, 'data': [0,0]})
            }
         }else if (vague == 'semestre1') {
            for (let index = 0; index < currentMonthPlusOne; index++) {
                monthTable.push({'month': index + 1, 'data': [0,0]})
            }
         }else if (vague == 'mois') {
            for (let index = 0; index < CurrentDate.getDate(); index++) {
                monthTable[index] = {'month': index + 1, 'data': [0,0]}
            }
         }else if (vague == 'semaine') {
            for (let index = firstday; index < CurrentDate.getDate()+1; index++) {
                monthTable.push({'month': index, 'data': [0,0]})
            }
         } 
         

        // STEP 2: converte creat at .....
        /*For tickets sold*/
        for (let index = 0; index < thisTicketsTravel.length; index++) {
            // Get the month
            let date = new Date(thisTicketsTravel[index].created_at);
            var month = date.getMonth()+1
            if (vague == 'semaine') { month = date.getDate()}
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[0] += 1
                }
            }                      
        }
        // console.log(monthTable, 0);
        /*For Travel*/
        for (let index = 0; index < thisYearsTravel.length; index++) {
            // Get the month
            let date = new Date(thisYearsTravel[index].created_at);
            var month = date.getMonth()+1
            if (vague == 'semaine') { month = date.getDate()}
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[1] += 1
                }
            }                    
        }

        // STEP 3: Extract data 
        let GraphData = {'series': [{'name': 'Tickets vendus', 'data':[]},{'name': 'voyage effectué', 'data':[]}, ], 'month': []}
                
        for (let index = 0; index < monthTable.length; index++) {
            GraphData.series[0].data[index] = monthTable[index].data[0] 
            GraphData.series[1].data[index] = monthTable[index].data[1] 

            GraphData.month[index] = MonthInLetter[index]
        }


        travelAnalytics.GraphData = GraphData



         /*-----------------*/
        // RESPONSE
        /*-----------------*/
        response.json({
            message: 'success',
            data: travelAnalytics
        })
        

        
    }








    ///////////////////////////////////////////////////////////
    /* FOR TRAVEL MANAGEMENT IN THE ADMINISTRATION SOFTWARE TOOL */
    ///////////////////////////////////////////////////////////

    async getListeOfTravelDoForAdmin({params, response}){

        // CURRENT DATE
        const CurrentDate =  new Date()
        const CurrentDateInMilliseconds = CurrentDate.getTime()
 
        // GET THE TRAVEL LIST WITHOUT CANCELLING TRAVELS
        const ListOfTravelNotInJson = await Travels
        .query()
        .where('company_id', params.id)
        .where('annulation_state', 0)
        .select('id', 'departure_date', 'departure_time', 'place_price', 'destination', 'place_to_sell_by_mino_number')
        .orderBy('departure_date', 'desc')
        .fetch()
        const ListOfTravel = ListOfTravelNotInJson.toJSON()

        // GET TRAVEL MADE
        const travelMade = []
        for (let index = 0; index < ListOfTravel.length; index++) {
            const tempsLa =  new Date(ListOfTravel[index].departure_date); 
            if (CurrentDateInMilliseconds > tempsLa.getTime() ) {
                travelMade.push(ListOfTravel[index])
            }      
        }
        // GET TRAVEL MADE, TICKET BILAN il faut gérer aussi les places pas encore reservées
        for (let index = 0; index < travelMade.length; index++) {
            // ALL TICKET ANNULE
            const allTicketCancelsNotInJson = await Tickets
                .query()
                .where('travel_id', travelMade[index].id)
                .andWhere('ticket_state_id', 1)
                .fetch()
            const allCancelTickets = allTicketCancelsNotInJson.toJSON()
            travelMade[index].ticketsCancelledNumber = allCancelTickets.length

            // ALL TICKET SOLD
            const allTicketsNotInJson = await Tickets
                .query()
                .where('travel_id', travelMade[index].id)
                .andWhereNot('ticket_state_id', 1)
                .fetch()
            const allTickets = allTicketsNotInJson.toJSON()
            travelMade[index].ticketsSoldNumber = allTickets.length

            // GET GAIN OF EACH TICKET SOLD
            if (allTickets.length > 0) {
                let traveltotalGain = 0
                for (let i = 0; i < allTickets.length; i++) {
                    // const element = allTickets[i];
                    const gain_A = await ReservationReceipts
                        .query()
                        .where('tickets_id', allTickets[i].id)
                        .first()
                    const gain = gain_A.toJSON() 
                    traveltotalGain += gain.total__price
                }
                travelMade[index].traveltotalGain = traveltotalGain
            }else{
                travelMade[index].traveltotalGain = 0
            }

            // ALL PLACES NOT RESERVED
            const allPlaceNotReservedNotInJson = await TravelPlaces
                .query()
                .where('travel_id', travelMade[index].id)
                .andWhere('reservation_state', 0)
                .count()
            travelMade[index].allPlaceNotReserved = allPlaceNotReservedNotInJson[0]['count(*)']

        }



        response.json({
            message: 'success',
            data: travelMade
        })
        

        
    }

    async getListeOfDeclaredForAdmin({params, response}){

        // CURRENT DATE
        const CurrentDate =  new Date()
        const CurrentDateInMilliseconds = CurrentDate.getTime()
 
        // GET LIST OF ALL DECLARED
        const ListOfTravelNotInJson = await Travels
        .query()
        .where('company_id', params.id)
        // .select('id', 'departure_date', 'departure_time', 'place_price', 'destination', 'place_to_sell_by_mino_number','annulation_state')
        .orderBy('departure_date', 'desc')
        .fetch()
        const ListOfTravelDeclared = ListOfTravelNotInJson.toJSON()



        response.json({
            message: 'success',
            data: ListOfTravelDeclared
        })
        

        
    }







}

module.exports = TravelController
