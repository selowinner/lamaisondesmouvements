'use strict'

const { validateAll } = use('Validator')
const Expeditions = use('App/Models/Expedition')
const DeliveryMen = use('App/Models/DeliveryMan')
const luggageTypes = use('App/Models/LuggageType')
const CompaniesStations = use('App/Models/CompaniesStation')






class ExpeditionController {


    /////////////////////////////////////////////
    /* FOR MOBILE APP */
    ////////////////////////////////////////////

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

        // -------------
        const CompaniesListNotInJson = await luggageTypes
        .query()
        .innerJoin('Companies', 'companies.id', 'luggage_types.company_id')
        .where('luggage_types.denomination', body.luggageType)
        .select('companies.id', 'companies.denomination')
        .fetch()

        /* package_withdrawal_code Generation */
        let CurrentDate =  new Date()
        let time = CurrentDate.getTime()
        let Code = "EXP" + time

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
        expedition.expedition_state_id = 3
        expedition.package_withdrawal_code = Code

        const newExpedition = await Expeditions.create(expedition)

        // RESPONSE
        response.json({
            message: 'success',
            data: {newExpedition}
        })

     
    
    }


    async SenderVerification({request, response}){

        // GET DATA
        const body = request.all()
        
        // DATA VALIDATION         
        const rules = {
            sender_delivery_man_id: 'required',
            package_withdrawal_code: 'required', 
        } 
       
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }

        // GET THE AVAILABLE SENDER LIST
        const ListOfAvailableSenderNotInJson = await Expeditions
        .query()
        .where('sender_delivery_man_id', body.sender_delivery_man_id)
        .andWhere('package_withdrawal_code', body.package_withdrawal_code)
        .first()

        if (ListOfAvailableSenderNotInJson) {
            let updatedata = {
                expedition_state_id: 3,
            }
            ListOfAvailableSenderNotInJson.merge(updatedata)
            await ListOfAvailableSenderNotInJson.save()
            return { message: 'success' }
        }else{
            return { message: 'False' }
        }

        
    }









    ///////////////////////////////////////////////////////////
    /* FOR THE COMPANIES SOFTWARE TOOL */
    ///////////////////////////////////////////////////////////

    async getExpeditionList({params, response}){

        // GET THE TRAVEL LIST WITHOUT CANCELLING TRAVELS
        const ListOfExpeditionNotInJson = await Expeditions
        .query()
        .where('company_id', params.id)
        .fetch()

        const ListOfExpedition = ListOfExpeditionNotInJson.toJSON()

        for (let index = 0; index < ListOfExpedition.length; index++) {
            // const element = ListOfExpedition[index];
            if (ListOfExpedition[index].sender_delivery_man_id != null) {
                const deliveryManNotInJson = await DeliveryMen
                .query()
                .where('id', ListOfExpedition[index].sender_delivery_man_id)
                .select('complet_name', 'id')
                .first()
                let notinJSON = deliveryManNotInJson.toJSON()
                ListOfExpedition[index].deliveryMan = notinJSON.complet_name
                ListOfExpedition[index].deliveryManID = notinJSON.id
            }
        }

        // RESPONSE
         response.json({
            message: 'success',
            data: ListOfExpedition
        })
    }

    async getAvailableSenderList({params, response}){

        // GET THE AVAILABLE SENDER LIST
        const ListOfAvailableSenderNotInJson = await DeliveryMen
        .query()
        .where('company_id', params.id)
        .select('complet_name', 'id', 'conveyance')
        .fetch()
        const ListOfAvailableSender = ListOfAvailableSenderNotInJson.toJSON()

        for (let index = 0; index < ListOfAvailableSender.length; index++) {
            const ActualExpedition = await Expeditions
                .query()
                .where('sender_delivery_man_id', ListOfAvailableSender[index].id)
                .where('expedition_state_id', 2)
                .select('sender_neighborhood', 'updated_at')
                .fetch()
            let notinJSON = ActualExpedition.toJSON()
            if (notinJSON.length > 7) {
                ListOfAvailableSender.splice(index, 1);
            } 
            else if (notinJSON.length > 0) {
                ListOfAvailableSender[index].ActualExpedition = notinJSON[0]
            }
        }

        // RESPONSE
         response.json({
            message: 'success',
            data: ListOfAvailableSender
        })
    }

    async updateExpeditionState({request, response}){

        // GET DATA
        const body = request.all()
        
        // DATA VALIDATION         
        const rules = {
            id: 'required', 
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }

        let updatedata = new Object();
        // UPDATE CASE
        if (body.deliveryManID) {
            // Lorsque le colis est en cours d'exécution, et que le gérant veux changer de livreur, 
            // à cause du delais de recuperation qui a expiré OU simplement lorsque le gérant veut choisir un livreur
             updatedata = {
                sender_delivery_man_id: body.deliveryManID,
                expedition_state_id: 7,
            }  
            console.log('ok');
        }else if (body.expedition_state_id == 3) {
            // L'étape COLIS RECUPERE PAR LE LIVREUR est mise automatique lorsque le client valide le livreur. son idex est 3
            // Passer à l'étape: COLIS RECUPERE PAR LA GARE. son index est 4
             updatedata = {
                expedition_state_id: 4,
            } 
            console.log('cool')
            // PENSER à ECRIRE UN ALGO POUR LES SMS

        }else if (body.expedition_state_id == 4) {
            // Passer à l'étape: COLIS LIVRE A LA GARE DU DESTINATAIRE. son index est 5
             updatedata = {
                expedition_state_id: 5,
            }
            console.log('super')
            // PENSER à ECRIRE UN ALGO POUR LES SMS
        }else if (body.expedition_state_id == 5) {
            // Passer à l'étape: COLIS RECUPERE PAR LE DESTINATAIRE. son index est 6
             updatedata = {
                expedition_state_id: 6,
            }
            console.log('toujours')
            // PENSER à ECRIRE UN ALGO POUR LES SMS
        }else{
            return { message: 'Batard la, tu cherches quoi ?' }
        }
        


        const TheExpedition = await Expeditions.find(body.id)
        // console.log(body);

        TheExpedition.merge(updatedata)
        await TheExpedition.save()

        // RESPONSE
         response.json({
            message: 'success'
        })
    }

























}

module.exports = ExpeditionController
