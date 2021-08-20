'use strict'

const { validateAll } = use('Validator')
const comapaniesCentral = use('App/Models/CompaniesCentral')
const companiesStation = use('App/Models/Company')
const minoCodes = use('App/Models/MinoCode')
const Travels = use('App/Models/Travel')
const LostObjets = use('App/Models/LostObjet')
const Expeditions = use('App/Models/Expedition')



class StationController {
// ---------------------------
    // FOR THE COMPANY CENTRAL
// ---------------------------
    async getCompanyStationListForTheCentral({params, response}){

        // GET LISTE OF COMPANY FOR TRAVEL
        const ListOfCompanyStationNotInJson = await companiesStation
        .query()
        .innerJoin('companies_centrals', 'companies_centrals.id', 'companies.companyCentral_id')
        .where('companies_centrals.id ', params.id)
        .select('companies.id', 'companies.city','companies_centrals.anagramme')
        .fetch()

        const ListOfCompanyStation = ListOfCompanyStationNotInJson.toJSON()

        for (let index = 0; index < ListOfCompanyStation.length; index++) {
            // Get the number of Travel
            const travelNumberNotInJson = await Travels
            .query()
            .where('company_id ', ListOfCompanyStation[index].id)
            .count()
            ListOfCompanyStation[index].travelNumber = travelNumberNotInJson[0]['count(*)']

             // Get the number of Lost Objet
             const lostObjetNumberNotInJson = await LostObjets
             .query()
             .where('company_id ', ListOfCompanyStation[index].id)
             .count()
             ListOfCompanyStation[index].lostObjetNumber = lostObjetNumberNotInJson[0]['count(*)']

             // Get the number of Expedition
             const ExpeditionNumberNotInJson = await Expeditions
             .query()
             .where('company_id ', ListOfCompanyStation[index].id)
             .count()
             ListOfCompanyStation[index].ExpeditionNumber = ExpeditionNumberNotInJson[0]['count(*)']
        }

        // RESPONSE
         response.json({
            message: 'success',
            data: ListOfCompanyStation
        })
    }

    async getCompanyStationListWithDetailsForTheCentral({params, response}){

        const ListOfCompanyStationNotInJson = await companiesStation
        .query()
        .innerJoin('companies_centrals', 'companies_centrals.id', 'companies.companyCentral_id')
        .where('companies_centrals.id ', params.id)
        .select('companies.id', 'companies.city', 'companies.description', 'companies.other_denomination', 'companies.contact', 'companies.package_service_use', 'companies.neighborhood')
        .fetch()

        const ListOfCompanyStation = ListOfCompanyStationNotInJson.toJSON()

        // RESPONSE
         response.json({
            message: 'success',
            data: ListOfCompanyStation
        })
    }

    async add({request, response}){
        
        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            matriculation: 'required',
            description: 'required',
            country: 'required', 
            contact: 'required',
            city: 'required',
            neighborhood: 'required',
            other_denomination: 'required',
            mino_code: 'required',
            package_service_use: 'required',
            use_option_id: 'required',
            user_id: 'required',
            Central_id :'required'
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }
       
        // VERIFY IF THIS STATION ARE ALREADY REGISTRED
        const verifyIfExist = await companiesStation
        .query()
        .where('matriculation', body.matriculation)
        .count()
        const verification = verifyIfExist[0]['count(*)']
        if (verification != 0) {
            return { message: 'Cette compagnie a déjà été engeristré' }
        }
        // VERIFYTHE MINO CODE ARE ALREADY REGISTRED
        const verifyIfMinoCodExist = await minoCodes
        .query()
        .where('code', body.mino_code)
        .andWhere('used_state', 1)
        .count()
        const verificationMinoCode = verifyIfMinoCodExist[0]['count(*)']
        if (verificationMinoCode != 0) {
            return { message: 'Ce code a déjà été Utilisé' }
        }
        // VERIFY IF THE MINO CODE BELONG TO THE CURRENT COMPAGNY
        const verifyIfMinoCodbelongtocompagny = await minoCodes
        .query()
        .where('code', body.mino_code)
        .andWhere('companyCentral_id', body.Central_id)
        .count()
        const verificationMinoCodebelongtocompagny = verifyIfMinoCodbelongtocompagny[0]['count(*)']
        if (verificationMinoCodebelongtocompagny == 0) {
            return { message: 'Le code-Mino est erroné' }
        }
        // ADDING
        const createData = {
            matriculation: body.matriculation,
            description: body.description,
            country: body.country,
            contact: body.contact,
            city: body.city,
            neighborhood: body.neighborhood,
            other_denomination: body.other_denomination,
            mino_code: body.mino_code,
            package_service_use: body.package_service_use,
            use_option_id: body.use_option_id,
            user_id: body.user_id,
            companyCentral_id: body.Central_id,
        }
        const newStation= await companiesStation.create(createData)

        // activation of the mino-code
        const updatedata = {used_state: 1}
        const minoCode = await minoCodes.findBy('code', body.mino_code)
        minoCode.merge(updatedata)
        await minoCode.save()
        


        
        // RESPONSE
         response.json({
            message: 'success',
            data: {newStation}
        })

       
       
    
    }

    async updateInfo({request, response}){

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

        const updatedata = {
            matriculation: body.matriculation,
            description: body.description,
            country: body.country,
            contact: body.contact,
            city: body.city,
            neighborhood: body.neighborhood,
            other_denomination: body.other_denomination,
            mino_code: body.mino_code,
            package_service_use: body.package_service_use,
            use_option_id: body.use_option_id,
            user_id: body.user_id,
        }        

        const TheStation = await companiesStation.find(body.id)

        TheStation.merge(updatedata)
        await TheStation.save()

        // RESPONSE
         response.json({
            message: 'success',
            data: TheStation
        })
    }

}

module.exports = StationController
