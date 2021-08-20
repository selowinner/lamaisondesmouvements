'use strict'

const { validateAll } = use('Validator')
const comapaniesCentral = use('App/Models/CompaniesCentral')
const companiesStation = use('App/Models/Company')
const abonnement = use('App/Models/Abonnement')
const minoCodes = use('App/Models/MinoCode')
const Travels = use('App/Models/Travel')
const Tickets = use('App/Models/Ticket')
const ReservationReceipts = use('App/Models/ReservationReceipt')
const LostObjets = use('App/Models/LostObjet')
const Expeditions = use('App/Models/Expedition')
const Users = use('App/Models/User')




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
            const code = {code: matricule, companyCentral_id: newCompagny.id}
            const newCode= await minoCodes.create(code)
        }

         // COMPANIES ADMINISTRATOR ADDING
         const user = new Object()
         user.username = 'Admin'
         user.pseudo = body.anagramme
         user.email = body.email
         user.password = body.matriculation
         user.contact = body.contact
         user.role_id = 5
         user.companyCentral_id = newCompagny.id
         
         const newUser= await Users.create(user)
       
         


         
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









    // FOR COMPANY CENTRAL

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


    async getMinoCodeList({params, response}){

        const ListOfminocodeNotInJson = await minoCodes
        .query()
        .where('companyCentral_id ', params.id)
        .andWhere('used_state', 0)
        .select('code')
        .fetch()

        const ListOfminocodeStation = ListOfminocodeNotInJson.toJSON()

        // RESPONSE
         response.json({
            message: 'success',
            data: ListOfminocodeStation
        })
    }


    async getFinancialStat({params, response}){

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
        // -01- TRAVEL GAIN
        let totalGain = 0
         // GET THE GAIN  
         // GET THE CURRENT PERIOD TRAVEL LIST WITHOUT CANCELLING TRAVELS
         const thistRavelTNotInJSON = await Travels
         .query()
         .innerJoin('companies', 'companies.id', 'Travels.company_id')
         .where('companyCentral_id', params.id)
         .where('annulation_state', 0)
         .whereBetween('Travels.created_at', [dateLimitOne,  dateLimitTwo])
         .select('Travels.id', 'Travels.created_at')
         .fetch()
         const thistRavelTravel = thistRavelTNotInJSON.toJSON()
         for (let index = 0; index < thistRavelTravel.length; index++) {
            // GET THE GAIN OF EACH TRAVEL
            const theReceipts = await ReservationReceipts
            .query()
            .innerJoin('tickets', 'tickets.id', 'reservation_receipts.tickets_id')
            .where('travel_id', thistRavelTravel[index].id)
            .select('reservation_receipts.total__price')
            .fetch()  
            const theReceiptsGain = theReceipts.toJSON()
            if (theReceiptsGain.length !== 0) {
                let theG = 0
                for (let i = 0; i < theReceiptsGain.length; i++) {
                    // theG.push(theReceiptsGain[index].total__price)
                    theG += theReceiptsGain[index].total__price
                }
                thistRavelTravel[index].gain  = theG
            }else{
                thistRavelTravel[index].gain  = 0
            }
         }

        // GET EXPEDITION GAIN
        const thisYearsExpeditionsNotInJSON = await Expeditions
        .query()
        .innerJoin('companies', 'companies.id', 'Expeditions.company_id')
        .where('companyCentral_id', params.id)
        .whereBetween('Expeditions.created_at', [dateLimitOne,  dateLimitTwo])
        .select('Expeditions.id', 'Expeditions.created_at', 'Expeditions.expedition_price')
        .fetch()
        const thisYearsExpeditions = thisYearsExpeditionsNotInJSON.toJSON()
        
        // analytics.ExpeditionsNumber = thisYearsExpeditions.length
    
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
            for (let index = 0; index < currentMonthPlusOne; index++) {
                monthTable[index] = {'month': index + 1, 'data': [0,0]}
            }
         }else if (vague == 'semaine') {
            for (let index = firstday; index < CurrentDate.getDate()+1; index++) {
                monthTable.push({'month': index, 'data': [0,0]})
            }
         } 
         

        // STEP 2: converte creat at .....
        /*For tickets sold*/
        for (let index = 0; index < thistRavelTravel.length; index++) {
            // Get the month
            let date = new Date(thistRavelTravel[index].created_at);
            var month = date.getMonth()+1
            if (vague == 'semaine') { month = date.getDate()}
            // Verify if there are a corresponding on monthTable
            for (let i = 0; i < monthTable.length; i++) {   
                if (monthTable[i].month == month) {   
                    monthTable[i].data[0] += thistRavelTravel[index].gain 
                    totalGain += thistRavelTravel[index].gain
                }
            }                      
        }
        // console.log(monthTable, 0);
        /*For Travel*/
        for (let index = 0; index < thisYearsExpeditions.length; index++) {
            // Get the month
            let date = new Date(thisYearsExpeditions[index].created_at);
            var month = date.getMonth()+1
            if (vague == 'semaine') { month = date.getDate()}
            // Verify if there are a corresponding on monthTable
            for (let i = 0; i < monthTable.length; i++) {   
                if (monthTable[i].month !== month) {
                    if (thisYearsExpeditions[i] > 0) {
                        monthTable[i].data[1] += thisYearsExpeditions[i].expedition_price 
                        totalGain += thisYearsExpeditions[i].expedition_price 
                    } 
                }
            }                    
        }

        // STEP 3: Extract data 
        let GraphData = {'series': [{'name': 'Gain pour les voyages', 'data':[]},{'name': 'Gain pour les expeditions', 'data':[]}, ], 'month': []}
                
        for (let index = 0; index < monthTable.length; index++) {
            GraphData.series[0].data[index] = monthTable[index].data[0] 
            GraphData.series[1].data[index] = monthTable[index].data[1] 

            GraphData.month[index] = MonthInLetter[index]
        }


        travelAnalytics.GraphData = GraphData
        travelAnalytics.totalGain = totalGain



         /*-----------------*/
        // RESPONSE
        /*-----------------*/
        response.json({
            message: 'success',
            data: travelAnalytics
        })
        

    }

    



   








}

module.exports = CompanyController
