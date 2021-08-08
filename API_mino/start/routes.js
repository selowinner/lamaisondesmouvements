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
//------------ Travel Luggage for companies
Route.post('Luggage/add', 'Luggage/LuggageController.addLuggage')
Route.put('Luggage/update', 'Luggage/LuggageController.updateLuggage')







/*
----------------------------
----- LOST OBJETS MANAGEMENT ----
-----------------------------
*/

// Lost objet declaratiion For Client
Route.post('lostObjet/add', 'LostObjet/DeclarationController.add')

// Lost objet For Companies Station
Route.put('lostObjet/statUpdate', 'lostObjet/DeclarationController.updateState')













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
Route.put('expedition/senderVerification', 'Expedition/ExpeditionController.SenderVerification')



// Expedition for Companies stations
Route.put('expedition/ExpeditionStatUpdate', 'Expedition/ExpeditionController.updateExpeditionState')
//------------ Expedition withdrawals for companies stations
Route.post('withdrawal/add', 'withdrawal/WithdrawalController.addwithdrawal')
Route.put('withdrawal/update', 'withdrawal/WithdrawalController.updateWithdrawals')

//  Sender for Companies stations
Route.post('expedition/addsender', 'Expedition/DeliveryManController.add')
Route.put('expedition/senderUpdate', 'Expedition/DeliveryManController.updateProfil')
Route.put('expedition/senderCancel', 'Expedition/DeliveryManController.CancelSender')












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
----------------------------
----- COMPANIES  MANAGEMENT ----
-----------------------------
*/
// for Blooraid Super Admin
Route.post('compangny/add', 'Companies/CompanyController.add')
Route.put('compangny/update', 'Companies/CompanyController.updateInfo')
Route.get('compangny/List', 'Companies/CompanyController.getCompaniesList')
Route.put('compangny/abonnement', 'Companies/CompanyController.makeAbonnement')
Route.get('compangny/stationList', 'Companies/CompanyController.getCompanyStationList')













/*
---------------------------------
----- ALL ROUTES WITH PARAMS ----
---------------------------------
*/

// RESERVATION OR TRAVEL MANAGEMENT

/*----- Client Reservation-----*/
Route.get('reservation/luggageDetails/:id', 'Luggage/LuggageController.getListForAReservation')

// Reservation For Companies
Route.get('travel/Liste/:id', 'Travel/TravelController.getListeOfTravel')
Route.get('travel/getTravelAnalytics/:id', 'Travel/TravelController.getTravelAnalytics')
//------------ Traveler list  for conveyor
Route.get('traveler/Liste/:id', 'General/ReservationController.getListeOfTraveler')
Route.get('traveler/Liste/update/:id', 'General/ReservationController.updateTravelerEmbarcationStatut')
//------------ Travel Luggage for companies
Route.get('Luggage/List/:id', 'Luggage/LuggageController.getListOfLuggage')
Route.delete('Luggage/delete/:id', 'Luggage/LuggageController.CancelLuggage')

// travel or Reeservation For ADMIN
Route.get('travelDo/Liste/:id', 'Travel/TravelController.getListeOfTravelDoForAdmin')
Route.get('reservation/Liste/:id', 'General/ReservationController.getListeOfReservationoForAdmin')
Route.get('TravelDeclared/Liste/:id', 'Travel/TravelController.getListeOfDeclaredForAdmin')





// LOST OBJETS MANAGEMENT
// lost Objets For Companies
Route.get('lostObjet/Liste/:id', 'LostObjet/DeclarationController.getListeOfLostObjet')




/*
----------------------------
-----EXPEDITION MANAGEMENT ----
-----------------------------
*/
// For Companies Station
Route.get('expedition/senderList/:id', 'Expedition/DeliveryManController.getSenderList')
Route.get('expedition/expeditionList/:id', 'Expedition/ExpeditionController.getExpeditionList')
Route.get('expedition/availableSender/:id', 'Expedition/ExpeditionController.getAvailableSenderList')

Route.get('withdrawal/List/:id', 'withdrawal/WithdrawalController.getListOfWithdrawals')
Route.delete('withdrawal/delete/:id', 'withdrawal/WithdrawalController.CancelWithdrawals')

// Expedition for Companies stations





/*
----------------------------
-----COMPANIES MANAGEMENT FOR ADMIN ----
-----------------------------
*/
// Route.get('compangny/List/:id', 'Companies/CompanyController.getCompaniesList')









/*
----------------------------
-----ANALYTICS MANAGEMENT ----
-----------------------------
*/
// For Companies Station
Route.get('analytics/:id', 'General/ConpaniesStationStatController.getDashboadStat')

