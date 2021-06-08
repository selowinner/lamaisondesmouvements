'use strict'

const { validateAll } = use('Validator')
const Reimbursements = use('App/Models/ClientReimbursement')
const ReservationReceipts = use('App/Models/ReservationReceipt')







class ReimbursementController {



    /////////////////////////////////////////////
    /* FOR COMPANIES */
    ////////////////////////////////////////////

    async getReimbursementListe({response}){

 
        // GET THE REIMBURSEMENT LIST
        const ListOfReimbursementNotInJson = await Reimbursements.all()
        let ListOfReimbursement = ListOfReimbursementNotInJson.toJSON()

        /* reservation receipt for each reimbursement */
        for (let index = 0; index < ListOfReimbursement.length ; index++) {            
            let receiptseach = await ReservationReceipts.query().where('tickets_id', ListOfReimbursement[index].tickets_id).first()
            ListOfReimbursement[index].receiptseach = receiptseach.toJSON() 
        }

        response.json({
            message: 'success',
            data: ListOfReimbursementNotInJson
        })
        

        
    }



}

module.exports = ReimbursementController
