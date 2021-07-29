'use strict'

const { validateAll } = use('Validator')
const DeliveryMen = use('App/Models/DeliveryMan')
const Expeditions = use('App/Models/Expedition')







class DeliveryManController {

    async add({request, response}){
        
        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            complet_name: 'required', 
            contact: 'required',
            city: 'required',
            conveyance: 'required', 
            matriculation: 'required',
            company_id: 'required',
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }
       
        // VERIFY IF THIS DELIVERY MAN ARE ALREADY REGISTRED
        const verifyIfExist = await DeliveryMen
        .query()
        .where('contact', body.contact)
        .count()
        const verification = verifyIfExist[0]['count(*)']

        if (verification != 0) {
            return { message: 'Cette personne a déjà été engeristré comme livreur' }
        }

        // ADDING
        const createData = {
            complet_name: body.complet_name,
            contact: body.contact,
            city: body.city,
            conveyance: body.conveyance,
            matriculation: body.matriculation,
            company_id: body.company_id,
        }
        const newDeliveryMan= await DeliveryMen.create(createData)
        
        // RESPONSE
         response.json({
            message: 'success',
            data: {newDeliveryMan}
        })

       
       
    
    }


    async updateProfil({request, response}){

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
            complet_name: body.complet_name,
            contact: body.contact,
            city: body.city,
            conveyance: body.conveyance,
            matriculation: body.matriculation,
        }
        


        const TheDeliveryMen = await DeliveryMen.find(body.id)
        // console.log(body);

        TheDeliveryMen.merge(updatedata)
        await TheDeliveryMen.save()

        // RESPONSE
         response.json({
            message: 'success'
        })
    }


    async CancelSender({request, response}){

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

        const TheDeliveryMen = await DeliveryMen.find(body.id)
        
        const ToCanceled = new Object();
        ToCanceled.activation_state = false


        TheDeliveryMen.merge(ToCanceled)
        await TheDeliveryMen.save()

        // RESPONSE
         response.json({
            message: 'success'
        })
    }



    async getSenderList({params, response}){

        // GET THE TRAVEL LIST WITHOUT CANCELLING TRAVELS
        const ListOfDeliveryMenNotInJson = await DeliveryMen
        .query()
        .where('company_id', params.id)
        .fetch()

        const ListOfDeliveryMen = ListOfDeliveryMenNotInJson.toJSON()

        for (let index = 0; index < ListOfDeliveryMen.length; index++) {
            // const element = ListOfDeliveryMen[index];
            const DeliveryNumberNotInJson = await Expeditions
            .query()
            .where('sender_delivery_man_id', ListOfDeliveryMen[index].id)
            .count()
            
            ListOfDeliveryMen[index].DeliveryNumber = DeliveryNumberNotInJson[0]['count(*)']
        }

        // RESPONSE
         response.json({
            message: 'success',
            data: ListOfDeliveryMen
        })
    }










    async login ({request, auth, response, session}){

        const {pseudo, password, remember} = request.all()
        
        try {
            await auth.remember(!!remember).attempt(pseudo, password)
            // return response.route('AdminDashboad')

        } catch (error) {
            session.flash({ authentificated: "We couldn't verify your credentials" })
            // return response.redirect('back') 
        }
   
    }



    async logout ({auth, response}){

        await auth.logout()
        // return response.route('Login')
    }

}

module.exports = DeliveryManController
