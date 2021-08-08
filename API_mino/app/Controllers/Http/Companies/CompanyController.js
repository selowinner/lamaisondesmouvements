'use strict'

const { validateAll } = use('Validator')
const comapaniesCentral = use('App/Models/CompaniesCentral')
const companiesStation = use('App/Models/Company')
const abonnement = use('App/Models/Abonnement')
const Travels = use('App/Models/Travel')
const LostObjets = use('App/Models/LostObjet')
const Expeditions = use('App/Models/Expedition')



class CompanyController {


    // FOR ADMINISTRATION
    async add({request, response}){
        
        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            denomination: 'required', 
            matriculation: 'required',
            description: 'required',
            country: 'required', 
            contact: 'required',
            email: 'required',
            anagramme: 'required',
            siege: 'required',
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }
       
        // VERIFY IF THIS DELIVERY MAN ARE ALREADY REGISTRED
        const verifyIfExist = await comapaniesCentral
        .query()
        .where('matriculation', body.matriculation)
        .count()
        const verification = verifyIfExist[0]['count(*)']

        if (verification != 0) {
            return { message: 'Cette compagnie a déjà été engeristré' }
        }

        // ADDING
        const createData = {
            denomination: body.denomination,
            matriculation: body.matriculation,
            siege: body.siege,
            description: body.description,
            country: body.country,
            contact: body.contact,
            email: body.email,
            anagramme: body.anagramme,
        }
        let CurrentDate =  new Date()
        let time = CurrentDate.getTime()
        let matricule = "MINO" + time
        createData.mino_code = matricule

        const newCompagny= await comapaniesCentral.create(createData)


        // GENERATION OF 5 MINO-CODE FOR 5 STATION OF THE COMPAGNY
        const words = ['HHJH', 'YUAPEI', 'AZNSB', 'WJKDH', 'FNGQO', 'MANGER', 'POUET', 'ADORAR', 'OTHER']
        const codes = ['12@J40', '4U5#8', '96&O5', '58%A4', '6X52$', '6X!52']
        function wordGeneration() {return words[Math.round(Math.random()*8)]}
        function codeGeneration() {return codes[Math.round(Math.random()*5)]}

        for (let index = 0; index < 5; index++) {   
            const matricule = 'MINO' + CurrentDate.getSeconds() + wordGeneration() + codeGeneration() + CurrentDate.getHours()
            // add on table mino code
            const code = {code: matricule, company_id: newCompagny.id}
            console.log(code);
            //reste l'ajout dans la table
        }


        
        // RESPONSE
         response.json({
            message: 'success',
            data: {newCompagny}
        })

       
       
    
    }


    async makeAbonnement({request, response}){

        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            id: 'required', 
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué dajouter lID de la compagnie' }
        }
        
        /* CHange company activation state */
        const Comapany = new Object()
        Comapany.activation_state = 1
        
        const TheComapany = await comapaniesCentral.find(body.id)
        TheComapany.merge(Comapany)
        await TheComapany.save()
        

        /* CHange station activation state */
        const station = new Object()
        station.activation_state = 1
        const companyStationNumberNotInJson = await companiesStation
            .query()
            .where('companyCentral_id ', body.id)
            .fetch()
        const ListOfCompaniesCentral = companyStationNumberNotInJson.toJSON()
        for (let index = 0; index < ListOfCompaniesCentral.length; index++) {
            const Thestation = await companiesStation.find(ListOfCompaniesCentral[index].id)
            Thestation.merge(station)
            await Thestation.save() 
        }

        /* Register the abonnment */
        // ADDING
        const createData = {
            expired_date: "2021-11-06",
            companyCentral_id: body.id,
        }
        const newabonnement= await abonnement.create(createData)


        // RESPONSE
        return { message: 'success' }

    }


    async getCompaniesList({response}){

        // GET THE TRAVEL LIST WITHOUT CANCELLING TRAVELS
        const ListOfCompaniesNotInJson = await comapaniesCentral
        .query()
        .fetch()

        const ListOfCompaniesCentral = ListOfCompaniesNotInJson.toJSON()

        for (let index = 0; index < ListOfCompaniesCentral.length; index++) {
            // const element = ListOfCompanies[index];
            const companyStationNumberNotInJson = await companiesStation
            .query()
            .where('companyCentral_id ', ListOfCompaniesCentral[index].id)
            .count()
            
            ListOfCompaniesCentral[index].companyStationNumber = companyStationNumberNotInJson[0]['count(*)']
        }

        // RESPONSE
         response.json({
            message: 'success',
            data: ListOfCompaniesCentral
        })
    }


    async getCompanyStationList({response}){

        // GET LISTE OF COMPANY FOR TRAVEL
        const ListOfCompanyStationNotInJson = await companiesStation
        .query()
        .innerJoin('companies_centrals', 'companies_centrals.id', 'companies.companyCentral_id')
        .select('companies.id', 'companies.denomination','companies_centrals.anagramme')
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










    // FOR COMPANY

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
            denomination: body.denomination,
            matriculation: body.matriculation,
            siege: body.siege,
            description: body.description,
            country: body.country,
            contact: body.contact,
            email: body.email,
            Anagramme: body.Anagramme
        }
        


        const ThecomapaniesCentral = await comapaniesCentral.find(body.id)
        // console.log(body);

        ThecomapaniesCentral.merge(updatedata)
        await ThecomapaniesCentral.save()

        // RESPONSE
         response.json({
            message: 'success',
            data: ThecomapaniesCentral
        })
    }











}

module.exports = CompanyController
