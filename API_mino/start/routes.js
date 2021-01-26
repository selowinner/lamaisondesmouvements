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
----- RESERVATION MANAGEMENT ----
-----------------------------
*/

// Reservation For Client
Route.get('reservation/TodayCountryTravelListe', 'Travel/TravelController.getTodayListOfCountryForAReservation')
Route.get('reservation/WeekCountryTravelListe', 'Travel/TravelController.getWeekListOfCountryForAReservation')
Route.get('reservation/TravelListe', 'Travel/TravelController.getListForAReservation')
Route.post('reservation/add', 'General/ReservationController.add')
Route.post('reservation/remove', 'General/ReservationController.remove')











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
---------------------------------
----- ALL ROUTES WITH PARAMS ----
---------------------------------
*/

// RESERVATION MANAGEMENT

/*-----Reservation-----*/
Route.get('reservation/luggageDetails/:id', 'Luggage/LuggageController.getListForAReservation')