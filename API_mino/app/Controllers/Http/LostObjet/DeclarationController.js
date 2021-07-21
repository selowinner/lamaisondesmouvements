'use strict'

const { validateAll } = use('Validator')
const LostObjets = use('App/Models/LostObjet')
const Helpers = use('Helpers')
const Tickets = use('App/Models/Ticket')
const Travels = use('App/Models/Travel')







class DeclarationController {




    async add({request, response}){

        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            nature: 'required', 
            description: 'required',
            contact: 'required',
            company_id: 'required',
            departure_date: 'required',
            departure_place: 'required'

        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }

        /* Traitement de l'iamge si elle existe */
        let lostObjetPicture
        if (request.file('picture')) {
                lostObjetPicture = request.file('picture')
                // Deplacement 
                let fileName = `${new Date().getTime()}.${lostObjetPicture.subtype}`
                await lostObjetPicture.move(Helpers.publicPath('lostObjetsIMG'), { name: fileName })

                if (!lostObjetPicture.moved()) {
                    response.json({
                        message: lostObjetPicture.error().message,
                        erreur: 'image pas deplacé'
                    })  
                }else{
                    lostObjetPicture = `lostObjetsIMG/${fileName}`
                }    
                
        }else{
            lostObjetPicture = null
         }
       

         /* Declaration Adding */
         const LostObjet = new Object()
         LostObjet.nature = body.nature
         LostObjet.description = body.description
         LostObjet.contact = body.contact
         LostObjet.company_id = body.company_id
         LostObjet.departure_date = body.departure_date
         LostObjet.departure_place = body.departure_place
         LostObjet.size = body.size
         LostObjet.weight = body.weight
         LostObjet.picture = lostObjetPicture
         LostObjet.ticket_number_or_identification = body.ticket_number_or_identification

        const newLostObjet = await LostObjets.create(LostObjet)

         if (newLostObjet) {
            // response
            response.json({
                message: 'Déclaration faite avec succès',
            })  
         }else{
             // response
            response.json({
                message: 'problème au niveau de la requête',
            })  
         }
       
        

       
    
    }


    async getListeOfLostObjet({params, response}){

 
        // Get lost objet list
        const lostObjetNotInJson = await LostObjets
        .query()
        .where('company_id', params.id)
        .orderBy('created_at', 'desc')
        .fetch()

        const lostObjetList = lostObjetNotInJson.toJSON()
        // const ClientTicket = []
        for (let index = 0; index < lostObjetList.length; index++) {
            if (lostObjetList[index].ticket_number_or_identification) {
                // Get the Travel id
                const ClientTicket = await Tickets
                .query()
                .where('matriculation', lostObjetList[index].ticket_number_or_identification)
                .select('travel_id')
                .first()
                // console.log(ClientTicket.travel_id);
                if (ClientTicket.travel_id) {
                    // Get the car and travel detail information 
                    const carInformation = await Travels
                    .query()
                    .where('id', ClientTicket.travel_id)
                    .select('car_matriculation','departure_time')
                    .first()

                    const carInformationFire = carInformation.toJSON()
                    lostObjetList[index].car_Information = carInformationFire
                }
            }
        }

        response.json({
            message: 'success',
            data: lostObjetList
        })
        

        
    }


    async updateState({request, response}){

        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            id: 'required', 
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué dajouter lID de la declaration' }
        }
        
        /* Declaration Adding */
        const LostObjet = new Object()
        LostObjet.declaration_state = 1
        
        const TheLostObjet = await LostObjets.find(body.id)
        TheLostObjet.merge(LostObjet)
        await TheLostObjet.save()
        return { message: 'success' }

    }























}

module.exports = DeclarationController
