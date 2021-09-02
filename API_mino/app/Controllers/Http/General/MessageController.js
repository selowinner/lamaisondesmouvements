'use strict'


const { validateAll } = use('Validator')
const Messages = use('App/Models/Message')





class MessageController {
     ///////////////////////////
    /* FOR ALL */
    //////////////////////////

    async addmessage({request, response}){

        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            topic: 'required',  
            content: 'required',
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }


        // MESSAGE ADDING
        const meessageData = new Object()
        meessageData.topic = body.topic
        meessageData.content = body.content
        meessageData.station_dest_id = [1,2,6,45,81,7]
        meessageData.central_dest_id = []
        meessageData.station_creator_id = body.station_creator_id
        meessageData.central_creator_id = body.central_creator_id
        meessageData.flag = body.flag
       
        for (let index = 0; index < meessageData.station_dest_id.length; index++) {
            meessageData.station_dest_id = meessageData.station_dest_id[index];
            const newmessage = await Messages.create(meessageData)
            // WHEN THE MASSAGE IS A RESPONSE TO AN OTHER
            if (body.response_of_id) {
                const UpdataInitMessage = {response: body.response_of_id}
                const initmessage = await Messages.find(body.response_of_id)
                initmessage.merge(UpdataInitMessage)
                await initmessage.save()
            }
        }
        for (let index = 0; index < meessageData.central_dest_id.length; index++) {
            meessageData.central_dest_id = meessageData.central_dest_id[index];
            const newmessage = await Messages.create(meessageData)
            // WHEN THE MASSAGE IS A RESPONSE TO AN OTHER
            if (body.response_of_id) {
                const UpdataInitMessage = {response: body.response_of_id}
                const initmessage = await Messages.find(body.response_of_id)
                initmessage.merge(UpdataInitMessage)
                await initmessage.save()
            }
        }
       

        


        // response
        response.json({
            message: 'success',
        })  
         
       
       
    
    }


    ///////////////////////////
    /* FOR MINO ADLIN */
    //////////////////////////
    async getmessageforAdmin({response}){

        const messageListNotInJSON = await Messages
        .query()
        .where('dest_id', 0)
        .andWhere('station_creator_id', null)
        .andWhere('central_creator_id', null)
        .fetch()

        const messageList = messageListNotInJSON.toJSON()
        

        // RESPONSE
         response.json({
            message: 'success',
            data: messageList
        })
    }

    ///////////////////////////
    /* FOR SATION */
    //////////////////////////
    async getmessageforStation({params, response}){

        const messageListNotInJSON = await Messages
        .query()
        .where('station_creator_id', params.id)
        .orWhere('dest_id', params.id)
        .fetch()

        const messageList = messageListNotInJSON.toJSON()
        

        // RESPONSE
         response.json({
            message: 'success',
            data: messageList
        })
    }

    ///////////////////////////
    /* FOR CENTRALE */
    //////////////////////////
    async getmessageforCentral({params, response}){

        const messageListNotInJSON = await Messages
        .query()
        .where('central_creator_id', params.id)
        .orWhere('dest_id', params.id)
        .fetch()

        const messageList = messageListNotInJSON.toJSON()
        

        // RESPONSE
         response.json({
            message: 'success',
            data: messageList
        })
    }

}

module.exports = MessageController
