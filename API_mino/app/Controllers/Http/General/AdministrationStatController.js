'use strict'


const Travels = use('App/Models/Travel')
const Tickets = use('App/Models/Ticket')
const TravelPlaces = use('App/Models/TravelPlace')
const comapaniesCentral = use('App/Models/CompaniesCentral')
const companiesStation = use('App/Models/Company')
const Expeditions = use('App/Models/Expedition')
const LostObjets = use('App/Models/LostObjet')






class AdministrationStatController {

     /////////////////////////////////////////////
    /* FOR ADMINISTRAION */
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
        /*For place sold*/
        const thisYearsSoldPlacesNotInJSON = await TravelPlaces
            .query()
            .innerJoin('Travels', 'travels.id', 'travel_places.travel_id')
            .where('annulation_state', 0)
            .where('reservation_state', 1)
            .whereBetween('travel_places.created_at', [yearsstart,  yearsEnd])
            .select('travel_places.id', 'travel_places.created_at')
            .fetch()
        const thisYearsSoldPlaces = thisYearsSoldPlacesNotInJSON.toJSON()
        analytics.soldPlacesNumber = thisYearsSoldPlaces.length
        /*For companies get*/
        const thisYearsCompaniesGetNotInJSON = await comapaniesCentral
            .query()
            .whereBetween('created_at', [yearsstart,  yearsEnd])
            .select('id', 'created_at')
            .fetch()
        const thisYearsCompaniesGet = thisYearsCompaniesGetNotInJSON.toJSON()
        analytics.CompaniesGetNumber = thisYearsCompaniesGet.length
        /*For companies stations get*/
        const thisYearsCompaniesstationGetNotInJSON = await companiesStation
            .query()
            .whereBetween('created_at', [yearsstart,  yearsEnd])
            .select('id', 'created_at')
            .fetch()
        const thisYearsCompaniesstationGet = thisYearsCompaniesstationGetNotInJSON.toJSON()
        analytics.CompaniesstationGetNumber = thisYearsCompaniesstationGet.length
        /*For declared travels*/
        const thisYearsDeclaredTravelsNotInJSON = await Travels
            .query()
            .where('annulation_state', 0)
            .whereBetween('created_at', [yearsstart,  yearsEnd])
            .select('id', 'created_at')
            .fetch()
        const thisYearsDeclaredTravelsThings = thisYearsDeclaredTravelsNotInJSON.toJSON()
        analytics.DeclaredTravelsNumber = thisYearsDeclaredTravelsThings.length
        /*For Expedition*/
        const thisYearsExpeditionsNotInJSON = await Expeditions
            .query()
            .whereBetween('created_at', [yearsstart,  yearsEnd])
            .select('id', 'created_at')
            .fetch()
        const thisYearsExpeditions = thisYearsExpeditionsNotInJSON.toJSON()
        analytics.ExpeditionsNumber = thisYearsExpeditions.length


        // STEP 2: init the month table
        /*Current month*/ 
        let currentdate = new Date();
        const currentmonth = currentdate.getMonth()+1
        /*Initialisation*/ 
        let monthTable = []
        for (let index = 0; index < currentmonth; index++) {
            monthTable[index] = {'month': index + 1, 'data': [0,0,0,0,0]}   
        }


        // STEP 3: converte creat at .....
        /*For place sold*/
        for (let index = 0; index < thisYearsSoldPlaces.length; index++) {
            // Get the month
            let date = new Date(thisYearsSoldPlaces[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[0] += 1
                }
            }                      
        }
        /*For companies get*/
        for (let index = 0; index < thisYearsCompaniesGet.length; index++) {
            // Get the month
            let date = new Date(thisYearsCompaniesGet[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[1] += 1
                }
            }                      
        }
        /*For companies stations get*/
        for (let index = 0; index < thisYearsCompaniesstationGet.length; index++) {
            // Get the month
            let date = new Date(thisYearsCompaniesstationGet[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[2] += 1
                }
            }                      
        }
        /*For Declared Travels*/
        for (let index = 0; index < thisYearsDeclaredTravelsThings.length; index++) {
            // Get the month
            let date = new Date(thisYearsDeclaredTravelsThings[index].created_at);
            var month = date.getMonth()+1
            // Verify if there are a corresponding on monthTable
            for (let index = 0; index < monthTable.length; index++) {   
                if (monthTable[index].month == month) {
                    monthTable[index].data[3] += 1
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
                    monthTable[index].data[4] += 1
                }
            }                      
        }


        // STEP 4: Extract data 
        let GraphData = {'series': [{'name': 'Places vendus', 'data':[]},{'name': 'Compagnies aquises', 'data':[]},{'name': 'Gares aquises', 'data':[]}, {'name': 'voyages declarés pas annulés', 'data':[]}, {'name': 'Expeditions déclarées', 'data':[]} ], 'month': []}
        let MonthInLetter = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
        
        for (let index = 0; index < monthTable.length; index++) {
            GraphData.series[0].data[index] = monthTable[index].data[0] 
            GraphData.series[1].data[index] = monthTable[index].data[1] 
            GraphData.series[2].data[index] = monthTable[index].data[2] 
            GraphData.series[3].data[index] = monthTable[index].data[3]
            GraphData.series[4].data[index] = monthTable[index].data[4]

            GraphData.month[index] = MonthInLetter[index]
        }

        // // console.log(monthTable);
        // // console.log(GraphData);








        // // console.log(monthTable);
        analytics.GraphData = GraphData










        response.json({
            message: 'success',
            data: analytics
        })
        

        
    }


}

module.exports = AdministrationStatController
