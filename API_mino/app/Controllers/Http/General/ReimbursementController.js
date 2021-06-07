'use strict'

const { validateAll } = use('Validator')
const Reimbursements = use('App/Models/ClientReimbursement')
const ReservationReceipts = use('App/Models/ReservationReceipt')







class ReimbursementController {



    /////////////////////////////////////////////
    /* FOR COMPANIES */
    ////////////////////////////////////////////

    async getReimbursementListe({response}){

 
        // GET THE REIMBURSEMENT LIST SUGGESTION
        const ListOfReimbursementNotInJson = await Reimbursements.query().fetch()
        let ListOfReimbursement = ListOfReimbursementNotInJson.toJSON()

        /* reservation receipt for each reimbursement */
        const indexLimit = ListOfReimbursement.length + 1
        let copie = []


        for (let index = 1; index < indexLimit; index++) {
            console.log(index);
            let hh = 0
            hh = hh + 1
            let i = ListOfReimbursement[hh]
            let receiptseach = await ReservationReceipts.query().where('tickets_id', i.tickets_id).first()
            i.receiptseach = receiptseach.toJSON()

            // ListOfReimbursement[index].receiptseach = receiptseach 
        }

        console.log(ListOfReimbursement);
        // response.json({
        //     message: 'success',
        //     data: ListOfReimbursementNotInJson
        // })
        

        
    }



}

module.exports = ReimbursementController
