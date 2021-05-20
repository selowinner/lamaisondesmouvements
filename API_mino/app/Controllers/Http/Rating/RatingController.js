'use strict'

const { validateAll } = use('Validator')
const Ratings = use('App/Models/Rating')
const Tickets = use('App/Models/Ticket')
const ReservationReceipts = use('App/Models/ReservationReceipt')







class RatingController {



    async add({request, response}){

        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            matriculation: 'required', 
            rating: 'required',
            company_id: 'required'
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }

        
        // VERIFY IF THE MATRICULATION OF TICKET OR THE RECEIPT ID EXIST OR IF HE HAS BEEN USED
        const supposedMatriculation = await Tickets.query().where('matriculation', body.matriculation).first() 
        const supposedReceiptId = await ReservationReceipts.query().where('id', body.matriculation).first()
        const supposedRatings = await Ratings.query().where('matriculation', body.matriculation).first()

        if (supposedMatriculation == null && supposedReceiptId == null) {     
            return { message: ' matricule ou identifiant, inexistant ' }
        }else if (supposedRatings !== null){
            return { message: ' ce matricule ou identifiant, à déjà été utisé ' }
        }

        // RATE ADDING
        const rating = new Object()
        rating.matriculation = body.matriculation
        rating.rating = body.rating
        rating.companyCentral_id = body.company_id

        const newRating= await Ratings.create(rating)
         if (newRating) {
            // response
            response.json({
                message: 'note prise en compte',
            })  
         }else{
             // response
            response.json({
                message: 'problème au niveau de la requête',
            })  
         }

       
       
    
    }























}

module.exports = RatingController
