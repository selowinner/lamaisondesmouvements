'use strict'

const { validateAll } = use('Validator')
const Stocks = use('App/Models/Stock')






class ReservationController {



    async add({request, response}){

        //GET DATA
        const body = request.all()
        

         // CREATE SUPPLIER
         const supplier = new Object()
         supplier.denomination = body.denomination
         supplier.registration_number = body.registration_number
         supplier.location = body.location
         supplier.email = body.email
         supplier.contact = body.contact
         supplier.phone_number = body.phone_number
         
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
