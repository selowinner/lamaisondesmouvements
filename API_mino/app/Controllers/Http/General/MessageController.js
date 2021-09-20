'use strict'


const { validateAll } = use('Validator')
const Messages = use('App/Models/Message')
const companiesStation = use('App/Models/Company')





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


    async updateMessageVue({params, response}){


        // MESSAGE WUEZING UPDATE
        const UpdataInitVueState = {view: true}
        const theMeassage = await Messages.find(params.id)
        theMeassage.merge(UpdataInitVueState)
        await theMeassage.save()
       
        

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
        .where('central_creator_id', 0)
        .orWhere('station_dest_id', 0)
        .orWhere('central_dest_id', 0)
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
    async addmessageforStation({request, response}){

        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            topic: 'required',  
            content: 'required',
            dest: 'required'
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }
        // to get the central ID
        // let Thestation
        if (body.dest == 1) {
            let Thestation = await companiesStation.find(body.station_creator_id)
            body.dest = Thestation.companyCentral_id
        }

        // MESSAGE ADDING
        const meessageData = new Object()
        meessageData.topic = body.topic
        meessageData.content = body.content
        meessageData.central_dest_id = body.dest
        meessageData.station_creator_id = body.station_creator_id
       
        const newmessage = await Messages.create(meessageData)
        // WHEN THE MASSAGE IS A RESPONSE TO AN OTHER
        if (body.response_of_id) {
            const UpdataInitMessage = {response: newmessage.id}
            const initmessage = await Messages.find(body.response_of_id)
            initmessage.merge(UpdataInitMessage)
            await initmessage.save()
        }
     

        // response
        response.json({
            message: 'success',
        })  
    
    }

    async getmessageforStation({params, response}){

        const messageListNotInJSON = await Messages
        .query()
        .where('station_creator_id', params.id)
        .orWhere('station_dest_id', params.id)
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
        .orWhere('central_dest_id', params.id)
        .fetch()
        const messageList = messageListNotInJSON.toJSON()
        // get station name, when the message com from a station 
        for (let index = 0; index < messageList.length; index++) {
            if ((messageList[index].station_creator_id) || (messageList[index].station_dest_id)) {
                const stationNOtJSON = await companiesStation
                .query()
                .where('id', messageList[index].station_creator_id)
                .orWhere('id', messageList[index].station_dest_id)
                .select('neighborhood')
                .first()
                messageList[index].station_neighborhood = stationNOtJSON.neighborhood
            };
            
        }
        

        // RESPONSE
         response.json({
            message: 'success',
            data: messageList
        })
    }

    async addmessageforCentral({request, response}){

        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            topic: 'required',  
            content: 'required',
            dest: 'required',
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }


        // MESSAGE ADDING
        const meessageData = new Object()
        meessageData.topic = body.topic
        meessageData.content = body.content
        meessageData.central_creator_id = body.central_creator_id
        // meessageData.flag = body.flag

        for (let index = 0; index < body.dest.length; index++) {
            meessageData.station_dest_id = body.dest[index];
            // console.log(station_creator_idstation_creator_id);
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


}

module.exports = MessageController
