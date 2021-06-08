'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})



/*
----------------------------
----- TRAVEL AND RESERVATION MANAGEMENT ----
-----------------------------
*/

// Reservation For Client
Route.get('reservation/TodayCountryTravelListe', 'Travel/TravelController.getTodayListOfCountryForAReservation')
Route.get('reservation/WeekCountryTravelListe', 'Travel/TravelController.getWeekListOfCountryForAReservation')
Route.get('reservation/TravelListe', 'Travel/TravelController.getListForAReservation')
Route.post('reservation/TravelIntermadiateStationListe', 'Travel/TravelController.getListIntermadiateStationForAReservation')
Route.post('reservation/add', 'General/ReservationController.add')
Route.post('reservation/remove', 'General/ReservationController.remove')


// Travel For Companies
Route.post('travel/add', 'Travel/TravelController.addTravel')
Route.post('IntermadiateStation/add', 'Travel/TravelController.addTravel')
Route.get('travel/Liste', 'Travel/TravelController.getListeOfTravel')
Route.put('travel/update', 'Travel/TravelController.updateTravel')
Route.put('travel/cancellation', 'Travel/TravelController.travelCancellation')
//------------ Travel reimbursement for companies
Route.get('reimbursement/Liste', 'General/ReimbursementController.getReimbursementListe')



/*
----------------------------
----- LOST OBJETS MANAGEMENT ----
-----------------------------
*/

// Lost objet declaratiion For Client
Route.post('lostObjet/add', 'LostObjet/DeclarationController.add')













/*
----------------------------
----- RATING MANAGEMENT ----
-----------------------------
*/

// Companies rating by client
Route.post('rating/add', 'Rating/RatingController.add')














/*
----------------------------
----- EXPEDITION MANAGEMENT ----
-----------------------------
*/

// Add Expedition for Client
Route.get('expedition/listOfLuggage', 'Luggage/LuggageController.getListOfLuggageNature')
Route.post('expedition/addstep1', 'Expedition/ExpeditionController.addstep1')
Route.post('expedition/listOfLuggagePrices', 'Luggage/LuggageController.getListOfLuggagePrice')
Route.post('expedition/addstep2', 'Expedition/ExpeditionController.addstep2')












/*
----------------------------
----- USER MANAGEMENT ----
-----------------------------
*/

// Add User for Blooraid Super Admin
Route.post('user/add', 'User/UserController.add')
Route.put('user/profilUpdate', 'User/UserController.updateProfil')
Route.post('user/login', 'User/UserController.login')
Route.post('user/logout', 'User/UserController.logout')















/*
---------------------------------
----- ALL ROUTES WITH PARAMS ----
---------------------------------
*/

// RESERVATION MANAGEMENT

/*----- Client Reservation-----*/
Route.get('reservation/luggageDetails/:id', 'Luggage/LuggageController.getListForAReservation')

// Reservation For Companies
Route.get('travel/Liste/:id', 'Travel/TravelController.getListeOfTravel')