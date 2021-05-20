'use strict'

const { validateAll } = use('Validator')
const Helpers = use('Helpers')
const Users = use('App/Models/User')







class UserController {

    async add({request, response}){

        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            username: 'required', 
            pseudo: 'required',
            email: 'required',
            password: 'required', 
            company_id: 'required',
            role_id: 'required',
            contact: 'required',
            companyCentral_id: 'required'
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }

        
         /* TRAITEMENT DE L'IMAGE SI ELLE EXISTE */
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





        // RATE ADDING
        const user = new Object()
        user.username = body.username
        user.pseudo = body.pseudo
        user.email = body.email
        user.password = body.password
        user.contact = body.contact
        user.company_id = body.company_id
        user.role_id = body.role_id
        user.companyCentral_id = body.companyCentral_id
        user.ProfilIMG = lostObjetPicture
        

        const newUser= await Users.create(user)
        // RESPONSE
         response.json({
            message: 'success',
            data: {newUser}
        })

       
       
    
    }



    async updateProfil({request, response, auth}){

        // On pourra tester lors de l'intégration de l'API

        const updateData = request.all()

        auth.user.merge(updateData)

        await auth.user.save()

        return response.route('AdminAuthorView')
    }


    async login ({request, auth, response, session}){

        const {pseudo, password, remember} = request.all()
        
        try {
            await auth.remember(!!remember).attempt(pseudo, password)
            return response.route('AdminDashboad')

        } catch (error) {
            session.flash({ authentificated: "We couldn't verify your credentials" })
            return response.redirect('back') 
        }
   
    }



    async logout ({auth, response}){

        await auth.logout()
        return response.route('Login')
    }

}

module.exports = UserController
