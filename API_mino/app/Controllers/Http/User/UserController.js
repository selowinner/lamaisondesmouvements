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
            // company_id: 'required',
            role_id: 'required',
            contact: 'required',
            // companyCentral_id: 'required'
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }

        // VERIFYTHE EMAIL ARE ALREADY REGISTRED
        const verifyIfemailExist = await Users
        .query()
        .where('pseudo', body.pseudo)
        .count()
        const verificationemail = verifyIfemailExist[0]['count(*)']
        if (verificationemail != 0) {
            return { message: 'Cet utilisateur a déjà été enregistré' }
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





        // USER ADDING
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

        // return response.route('AdminAuthorView')
    }


    async login ({request, auth, response}){

        const {pseudo, password, softLevel} = request.all()        
        
        try {
            let token = await auth.attempt(pseudo, password)
            if (token) {
                let user = await Users.query().where('pseudo', pseudo).select('pseudo','role_id','companyCentral_id','company_id').first()
                let PullLog = user.toJSON()
                // Pour les administration mino
                if (softLevel == 'mino') {
                    if ((PullLog.companyCentral_id != null) || (PullLog.company_id != null)) {
                        return response.status(403).json({
                            status: 'error',
                            message: "vous n'avez pas acces ce logiciel"
                        })
                    }
                    return response.status(200).json({
                        status: 'ok',
                        message: 'Logged in',
                        user: user,
                        token: token
                    })
                }
                if (softLevel == 'centrale') {
                    if (PullLog.companyCentral_id == null) {
                        return response.status(403).json({
                            status: 'error',
                            message: "vous n'avez pas acces ce logiciel"
                        })
                    }
                    return response.status(200).json({
                        status: 'ok',
                        message: 'Logged in',
                        user: user,
                        token: token
                    })
                }                
            }

        } catch (error) {
            console.log(error.message)
            response.status(403).json({
                status: 'error',
                message: error.message
            })
        }



        // try {
        //     if (await auth.attempt(email, password)) {
        //       let user = await User.findBy('email', email)
        //       let accessToken = await auth.generate(user)
        //       return response.json({"user":user, "access_token": accessToken})
        //     }
  
        //   }
        //   catch (e) {
        //     return response.json({message: 'You first need to register!'})
        //   }


   
    }








    async logout ({auth, response}){

        await auth.logout()
        // return response.route('Login')
    }

}

module.exports = UserController
