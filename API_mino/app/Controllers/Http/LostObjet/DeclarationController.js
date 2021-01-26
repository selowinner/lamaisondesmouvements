'use strict'

const { validateAll } = use('Validator')
const LostObjets = use('App/Models/LostObjet')
const Helpers = use('Helpers')






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

























}

module.exports = DeclarationController
