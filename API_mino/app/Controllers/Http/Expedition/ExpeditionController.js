'use strict'

const { validateAll } = use('Validator')
const Expeditions = use('App/Models/Expedition')
const luggageTypes = use('App/Models/LuggageType')
const Companies = use('App/Models/Company')
const CompaniesStations = use('App/Models/CompaniesStation')
const LuggagesPrice = use('App/Models/LuggagePriceByWeightAndSize')






class ExpeditionController {



    async addstep1({request, response}){

        //GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            // sender_complet_name: 'required', 
            // sender_contact: 'required',
            sender_country: 'required',
            sender_city: 'required',
            // sender_neighborhood: 'required',
            // recipient_complet_name: 'required',
            // recipient_contact: 'required',
            // recipient_country: 'required',
            recipient_city: 'required',
            // recipient_neighborhood: 'required',
            luggageType: 'required',
            // package_weight: 'required',
            // package_size: 'required'
        }
        const bodyValidation = await validateAll(body, rules)

        if (bodyValidation.fails()) {
            console.log('papa');
            return { message: 'vous avez manqué de remplir un champs' }
        }
        // else if (!request.file('package_picture')){
        //     return { message: 'photo du colis absente' }
        // }
        

        // LIST OF COMPANIES THAT CAN SEND THE SENDEDER LUGGAGE TYPE
        const CompaniesListNotInJson = await luggageTypes
        .query()
        .innerJoin('Companies', 'companies.id', 'luggage_types.company_id')
        .where('luggage_types.denomination', body.luggageType)
        .select('companies.id', 'companies.denomination', 'luggage_types.id AS LuggageType_id')
        .fetch()

        // LIST OF COMPANIES THAT CAN SEND THE SENDEDER LUGGAGE TYPE AND HAVE A STATION IN THE SENDER CITY
        const CompaniesList = CompaniesListNotInJson.toJSON()
        let CorrectCompaniesList1 = new Array()

        for (let i = 0; i < CompaniesList.length; i++) {
            const CompaniesListNotJson = await CompaniesStations
                .query().where('city', body.sender_city)
                .where('company_id', CompaniesList[i].id).count()

            if (CompaniesListNotJson[0]['count(*)'] !== 0) {
                CorrectCompaniesList1.push(CompaniesList[i])
            }
            
        }

        // LIST OF COMPANIES THAT CAN SEND THE SENDEDER LUGGAGE TYPE AND HAVE A STATION IN THE SENDER CITY AND THE RECEPTER CITY
        let CorrectCompaniesList2 = new Array()
        for (let i = 0; i < CorrectCompaniesList1.length; i++) {
            const CompaniesList2NotJson = await CompaniesStations
                .query().where('city', body.recipient_city)
                .where('company_id', CompaniesList[i].id).count()

            if (CompaniesList2NotJson[0]['count(*)'] !== 0) {
                CorrectCompaniesList2.push(CompaniesList[i])
            }  
            
        }

       
        // RESPONSE
        response.json({
            message: 'success',
            data: {CorrectCompaniesList2}
        })
        

    
          
    //    console.log(popo);
        // console.log(CorrectCompaniesList1);



        // LIST OF COMPANIES THAT CAN SHIP TO THE LOCATION INDICATED
        // const CompaniesListNotInJson = await CompaniesStations
        // .query().where('city', body.sender_city).select('company_id').fetch() 

        // response.json({
        //     message: 'success',
        //     data: {CompaniesListNotInJson}
        // })

        // // GET LIST OF CORRESPONDING COMPANIE FOR THE CIENT REQUEST
        // const CompaniesListNotInJson = await LuggagePriceByWeightAndSize
        // .query()
        // .innerJoin('Luggage_types', 'luggage_types.id', 'luggage_price_by_weight_and_sizes.luggage_type_id')
        // .where('departure_date', body.departure_date)
        // .where('departure_place', body.departure_place)
        // .where('destination', body.destination)
        // .whereBetween('departure_time', [departure_time,  departure_time_proposition_limit])
        // .select('Travels.id', 'Travels.place_price', 'companies.denomination')
        // .fetch() 






      
        // // ADD NEW RESERVATION RECEIPT
        // const reservationReceipt = new Object()
        // reservationReceipt.total_places_price = body.total_places_price
        // reservationReceipt.total_luggages_price = body.total_luggages_price
        // reservationReceipt.total__price = body.total__price
        // reservationReceipt.tickets_id = newTicket.id

        // const newReservationReceipt = await ReservationReceipts.create(reservationReceipt)
    
        

        // // RESPONSE
        // response.json({
        //     message: 'success',
        //     // data: {newTicket, newReservationReceipt}
        // })

     
    
    }



    async addstep2({request, response}){

        //GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            sender_complet_name: 'required', 
            sender_contact: 'required',
            sender_country: 'required',
            sender_city: 'required',
            sender_neighborhood: 'required',
            recipient_complet_name: 'required',
            recipient_contact: 'required',
            recipient_country: 'required',
            recipient_city: 'required',
            recipient_neighborhood: 'required',
            package_weight: 'required',
            package_size: 'required'
        }
        const bodyValidation = await validateAll(body, rules)

        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs' }
        }else if (!request.file('package_picture')){
            return { message: 'photo du colis absente' }
        }

        // LIST OF COMPANIES THAT CAN SEND THE SENDEDER LUGGAGE TYPE
        const CompaniesListNotInJson = await luggageTypes
        .query()
        .innerJoin('Companies', 'companies.id', 'luggage_types.company_id')
        .where('luggage_types.denomination', body.luggageType)
        .select('companies.id', 'companies.denomination')
        .fetch()

        /* Expédition Adding */
        const expedition = new Object()
        expedition.sender_complet_name = body.sender_complet_name
        expedition.sender_contact = body.sender_contact
        expedition.sender_country = body.sender_country
        expedition.sender_city = body.sender_city
        expedition.sender_neighborhood = body.sender_neighborhood
        expedition.recipient_complet_name = body.recipient_complet_name
        expedition.recipient_contact = body.recipient_contact
        expedition.recipient_country = body.recipient_country
        expedition.recipient_city = body.recipient_city
        expedition.recipient_neighborhood = body.recipient_neighborhood
        expedition.package_picture = 'popopppo'
        expedition.package_weight = body.package_weight
        expedition.package_size = body.package_size

        const newExpedition = await Expeditions.create(expedition)

        // RESPONSE
        response.json({
            message: 'success',
            data: {newExpedition}
        })

     
    
    }





























}

module.exports = ExpeditionController
