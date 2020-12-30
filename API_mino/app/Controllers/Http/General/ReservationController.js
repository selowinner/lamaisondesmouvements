'use strict'

const { validateAll } = use('Validator')
const Travels = use('App/Models/Travel')
const Tickets = use('App/Models/Ticket')
const ReservationReceipt = use('App/Models/ReservationReceipt')






class ReservationController {




    async add({request, response}){

        //GET DATA
        const body = request.all()


        // ADD A RESERVATION
        const reservation = new Object()
        reservation.denomination = body.denomination
        reservation.registration_number = body.registration_number
         
        const supplierdataVaidation = await validateAll(supplier, {denomination: 'required|unique:suppliers,denomination'})
        
        if (supplierdataVaidation.fails()) {
             response.json({ message: 'Le fournisseur exite déjà',})
        }else{
            
            response.json({
                message: 'Stock avec création de fournisseur ajouté avec success',
                data: AllStocks
            })
        
        }


     
    
    }





}

module.exports = ReservationController
