'use strict'


const Travels = use('App/Models/Travel')
const Tickets = use('App/Models/Ticket')
const TravelPlaces = use('App/Models/TravelPlace')
const comapaniesCentral = use('App/Models/CompaniesCentral')
const companiesStation = use('App/Models/Company')
const Expeditions = use('App/Models/Expedition')
const LostObjets = use('App/Models/LostObjet')


class CompaniesCentralStatController {

     /////////////////////////////////////////////
    /* FOR COMPANIES STATION */
    ////////////////////////////////////////////

    async getDashboadStat({params, response}){
        
        let analytics = new Object()

        /*------------------*/
        // GRAPH STAT LOGIC
        /*------------------*/

        // STEP 1: Select list of element fro the current year 
        /*Current Year*/ 
        let date = new Date();
        const currentyears = date.getFullYear()
        const yearsstart = currentyears + '-01-01 00:00:00'
        const yearsEnd = currentyears + '-12-31 00:00:00'
        /*For Registred station*/
        const thisYearsregistredStationNotInJSON = await companiesStation
            .query()
            .where('companyCentral_id', params.id)
            .whereBetween('created_at', [yearsstart,  yearsEnd])
            .select('id', 'created_at')
            .fetch()
        const thisYearsregistredStation = thisYearsregistredStationNotInJSON.toJSON()
        analytics.registredStationNumber = thisYearsregistredStation.length
        /*For Ticket vendus*/
        let allticketSold = []
        const allstationOftheCompany = await companiesStation
            .query()
            .where('companyCentral_id', params.id)
            .select('id', 'created_at')
            .fetch()
        const allstationOftheCompan = allstationOftheCompany.toJSON()
        for (let index = 0; index < allstationOftheCompan.length; index++) {
           const thisYearsTicketsoldNotInJSON = await Tickets
                .query()
                .innerJoin('Travels', 'travels.id', 'Tickets.travel_id')
                .where('company_id', allstationOftheCompan[index].id)
                .whereNot('ticket_state_id', 1)
                .whereBetween('Tickets.created_at', [yearsstart,  yearsEnd])
                .select('Tickets.id', 'Tickets.created_at')
                .fetch()
            const thisYearsTicketsold = thisYearsTicketsoldNotInJSON.toJSON()
            for (let i = 0; i < thisYearsTicketsold.length; i++) {
                allticketSold.push(thisYearsTicketsold[i])  
            }
        }
        analytics.TicketsoldNumber = allticketSold.length
        
         /*For Expedition*/
         const thisYearsExpeditionsNotInJSON = await Expeditions
         .query()
         .innerJoin('companies', 'companies.id', 'Expeditions.company_id')
         .where('companyCentral_id', params.id)
         .whereBetween('Expeditions.created_at', [yearsstart,  yearsEnd])
         .select('Expeditions.id', 'Expeditions.created_at')
         .fetch()
        const thisYearsExpeditions = thisYearsExpeditionsNotInJSON.toJSON()
        analytics.ExpeditionsNumber = thisYearsExpeditions.length
        // comapaniesCentral.findBy('id', params.id) 
        //  await thisYearsExpeditionsNotInJSON.expeditions()
        /*For Declared Travel*/
        const thisYearsdeclaredTravelsNotInJSON = await Travels
            .query()
            .innerJoin('companies', 'companies.id', 'Travels.company_id')
            .where('companyCentral_id', params.id)
            .where('annulation_state', 0)
            .whereBetween('Travels.created_at', [yearsstart,  yearsEnd])
            .select('Travels.id', 'Travels.created_at')
            .fetch()
        const thisYearsdeclaredTravels = thisYearsdeclaredTravelsNotInJSON.toJSON()
        /*For Expedition Do*/
        const thisYearsExpeditionsDoNotInJSON = await Expeditions
        .query()
        .innerJoin('companies', 'companies.id', 'Expeditions.company_id')
        .where('companyCentral_id', params.id)
        .where('expedition_state_id', 7)
        .whereBetween('Expeditions.created_at', [yearsstart,  yearsEnd])
        .select('Expeditions.id', 'Expeditions.created_at')
        .fetch()
       const thisYearsExpeditionsDo = thisYearsExpeditionsDoNotInJSON.toJSON()
       analytics.ExpeditionsDo = thisYearsExpeditionsDo.length
       /*For Travel Do*/
       const currentMonthPlusOne = date.getMonth()+1
       const currentDay = date.getDate()
       const dateLimitTwo  = currentyears + "-" + currentMonthPlusOne + "-" + currentDay
       const thisYearsTravelDosNotInJSON = await Travels
       .query()
       .innerJoin('companies', 'companies.id', 'Travels.company_id')
       .where('companyCentral_id', params.id)
       .where('annulation_state', 0)
       .whereBetween('Travels.created_at', [yearsstart,  dateLimitTwo])
       .select('Travels.id', 'Travels.created_at')
       .fetch()
       const thisYearsTravelDos = thisYearsTravelDosNotInJSON.toJSON()
       analytics.TravelDo = thisYearsTravelDos.length
        /*For find Objets */
        const thisYearsLostObjetNotInJSON = await LostObjets
            .query()
            .innerJoin('companies', 'companies.id', 'lost_objets.company_id')
            .where('companyCentral_id', params.id)
            .where('declaration_state', 1)
            .whereBetween('lost_objets.created_at', [yearsstart,  yearsEnd])
            .select('lost_objets.id', 'lost_objets.created_at')
            .fetch()
        const thisYearsLostObjetThings = thisYearsLostObjetNotInJSON.toJSON()
        analytics.FindObjet = thisYearsLostObjetThings.length


        // STEP 2: init the month table
        /*Current month*/ 
        let currentdate = new Date();
        const currentmonth = currentdate.getMonth()+1
        /*Initialisation*/ 
        let monthTable = []
        for (let index = 0; index < currentmonth; index++) {
            monthTable[index] = {'month': index + 1, 'data': [0,0,0,0,0,0,0]}   
        }



        // STEP 3: converte creat at .....
        /*For registred stations*/
        for (let index = 0; index < thisYearsregistredStation.length; index++) {
            // Get the month
            let date = new Date(thisYearsregistredStation[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[0] += 1
                }
            }                      
        }
        /*For companies get*/
        for (let index = 0; index < allticketSold.length; index++) {
            // Get the month
            let date = new Date(allticketSold[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[1] += 1
                }
            }                      
        }
        /*For Expedition*/
        for (let index = 0; index < thisYearsExpeditions.length; index++) {
            // Get the month
            let date = new Date(thisYearsExpeditions[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[2] += 1
                }
            }                      
        }
        /*For declared travels*/
        for (let index = 0; index < thisYearsdeclaredTravels.length; index++) {
            // Get the month
            let date = new Date(thisYearsdeclaredTravels[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[3] += 1
                }
            }                      
        }
        /*For Expediotion do*/
        for (let index = 0; index < thisYearsExpeditionsDo.length; index++) {
            // Get the month
            let date = new Date(thisYearsExpeditionsDo[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[4] += 1
                }
            }                      
        }
        /*For Travels do*/
        for (let index = 0; index < thisYearsTravelDos.length; index++) {
            // Get the month
            let date = new Date(thisYearsTravelDos[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[5] += 1
                }
            }                      
        }
        /*For Lost Objet Find*/
        for (let index = 0; index < thisYearsLostObjetThings.length; index++) {
            // Get the month
            let date = new Date(thisYearsLostObjetThings[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[6] += 1
                }
            }                      
        }
        


        // STEP 4: Extract data 
        let GraphData = {'series': [{'name': 'Gares enregistrées', 'data':[]},{'name': 'Tickets vendus', 'data':[]},{'name': 'Expedition', 'data':[]}, {'name': 'voyages declarés pas annulés', 'data':[]}, {'name': 'Expeditions effectuées', 'data':[]}, {'name': 'voyages éffectués', 'data':[]}, {'name': 'Objets trouvés', 'data':[]} ], 'month': []}
        let MonthInLetter = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
        
        for (let index = 0; index < monthTable.length; index++) {
            GraphData.series[0].data[index] = monthTable[index].data[0] 
            GraphData.series[1].data[index] = monthTable[index].data[1] 
            GraphData.series[2].data[index] = monthTable[index].data[2] 
            GraphData.series[3].data[index] = monthTable[index].data[3]
            GraphData.series[4].data[index] = monthTable[index].data[4] 
            GraphData.series[5].data[index] = monthTable[index].data[5]
            GraphData.series[6].data[index] = monthTable[index].data[6]

            GraphData.month[index] = MonthInLetter[index]
        }

        // // console.log(monthTable);
        // // console.log(GraphData);








        // // console.log(monthTable);
        analytics.GraphData = GraphData










        response.json({
            message: 'success',
            data: analytics,
        })
        

        
    }
}

module.exports = CompaniesCentralStatController
