'use strict'


const Travels = use('App/Models/Travel')
const Tickets = use('App/Models/Ticket')
const Expeditions = use('App/Models/Expedition')
const LostObjets = use('App/Models/LostObjet')







class ConpaniesStationStatController {


     /////////////////////////////////////////////
    /* FOR COMPANIES STATION */
    ////////////////////////////////////////////

    async getDashboadStat({params, response}){
        
        let analytics = new Object()

        // DECLARED TRAVEL
        const declaredTravel = await Travels.query().where('company_id', params.id).count()
        const declaredTravelNumber = declaredTravel[0]['count(*)']

        analytics.declaredTravelNumber = declaredTravelNumber

        // CANCELLING TRAVEL
        const cancellingTravel = await Travels.query().where('company_id', params.id).where('annulation_state', 1).count()
        const cancellingTravelNumber = cancellingTravel[0]['count(*)']

        analytics.cancellingTravelNumber = cancellingTravelNumber

        // STATION CLIENT
        /* For place reservation */
        const clients = await Tickets
        .query()
        .innerJoin('Travels', 'travels.id', 'Tickets.travel_id')
        .where('company_id', params.id)
        .count()
        const clientsNumber1 = clients[0]['count(*)']
        /* For expedition */
        const expeditionClient = await Expeditions.query().where('company_id', params.id).count()
        const expeditionClientNumber = expeditionClient[0]['count(*)']

        analytics.clientsNumber = clientsNumber1 + expeditionClientNumber

        // FIND THINGS
        const findThing = await LostObjets.query().where('company_id', params.id).where('declaration_state', 1).count()
        const findThingNumber = findThing[0]['count(*)']

        analytics.findThingNumber = findThingNumber

        // LOST THINGS DECLARED
        const lostThing = await LostObjets.query().where('company_id', params.id).count()
        const lostThingNumber = lostThing[0]['count(*)']

        analytics.lostThingNumber = lostThingNumber

        /* EXPEDITION DO*/
        const expeditionClient2 = await Expeditions.query().where('company_id', params.id).where('expedition_state_id', 1).count()
        const expeditionClientNumber2 = expeditionClient2[0]['count(*)']
        analytics.expeditionDo = expeditionClientNumber2

        /* EXPEDITION DECLARED*/
        const expeditionClient3 = await Expeditions.query().where('company_id', params.id).count()
        const expeditionClientNumber3 = expeditionClient3[0]['count(*)']
        analytics.expeditionNumber = expeditionClientNumber3



        /*------------------*/
        // GRAPH STAT LOGIC
        /*------------------*/

        // STEP 1: Select list of element fro the current year  --- IL RESTE A GENERER DYNAMIQUEMENT L'ANNEE ---
        /*For tickets sold*/
        const thisYearsTravelNotInJSON = await Tickets
            .query()
            .innerJoin('Travels', 'travels.id', 'Tickets.travel_id')
            .where('company_id', params.id)
            .whereBetween('Tickets.created_at', ['2021-01-01 00:00:00',  '2021-12-31 00:00:00'])
            .select('Tickets.id', 'Tickets.created_at')
            .fetch()
        const thisYearsTravel = thisYearsTravelNotInJSON.toJSON()
        /*For Find Things*/
        const thisYearsThingsNotInJSON = await LostObjets
            .query()
            .where('company_id', params.id)
            .where('declaration_state', 1)
            .whereBetween('updated_at', ['2021-01-01 00:00:00',  '2021-12-31 00:00:00'])
            .select('id', 'updated_at')
            .fetch()
        const thisYearsThings = thisYearsThingsNotInJSON.toJSON()
        /*For Expedition*/
        const thisYearsExpeditionsNotInJSON = await Expeditions
            .query()
            .where('company_id', params.id)
            .where('expedition_state_id', 1)
            .whereBetween('updated_at', ['2021-01-01 00:00:00',  '2021-12-31 00:00:00'])
            .select('id', 'updated_at')
            .fetch()
        const thisYearsExpeditions = thisYearsExpeditionsNotInJSON.toJSON()


        // STEP 2: init the month table
        /*Current month*/ 
        let currentdate = new Date();
        const currentmonth = currentdate.getMonth()+1
        /*Initialisation*/ 
        let monthTable = []
        for (let index = 0; index < currentmonth; index++) {
            monthTable[index] = {'month': index + 1, 'data': [0,0,0]}   
        }


        // STEP 3: converte creat at .....
        /*For tickets sold*/
        for (let index = 0; index < thisYearsTravel.length; index++) {
            // Get the month
            let date = new Date(thisYearsTravel[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[0] += 1
                }
            }                      
        }
        /*For Find Things*/
        for (let index = 0; index < thisYearsThings.length; index++) {
            // Get the month
            let date = new Date(thisYearsThings[index].updated_at);
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
            let date = new Date(thisYearsExpeditions[index].updated_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[2] += 1
                }
            }                      
        }


        // STEP 4: Extract data 
        let GraphData = {'series': [{'name': 'Tickets vendus', 'data':[]},{'name': 'Objet retrouvés', 'data':[]},{'name': 'Colis Expediés', 'data':[]}, ], 'month': []}
        let MonthInLetter = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
        
        for (let index = 0; index < monthTable.length; index++) {
            GraphData.series[0].data[index] = monthTable[index].data[0] 
            GraphData.series[1].data[index] = monthTable[index].data[1] 
            GraphData.series[2].data[index] = monthTable[index].data[2] 

            GraphData.month[index] = MonthInLetter[index]
        }

        // console.log(monthTable);
        // console.log(GraphData);








        // console.log(monthTable);
        analytics.GraphData = GraphData










        response.json({
            message: 'success',
            data: analytics
        })
        

        
    }



}

module.exports = ConpaniesStationStatController
