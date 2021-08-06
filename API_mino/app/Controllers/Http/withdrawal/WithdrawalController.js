'use strict'


const { validateAll } = use('Validator')
const withdrawals = use('App/Models/Withdrawal')
const withdrawalPriseBy = use('App/Models/WithdrawalPriceByWeightAndSize')



class WithdrawalController {



     ///////////////////////////
    /* FOR COMPANIES STATIONS */
    //////////////////////////

    async addwithdrawal({request, response}){

        // GET DATA
        const body = request.all()

        // DATA VALIDATION
        const rules = {
            denomination: 'required',  
            unit_price: 'required',
            company_id: 'required',
        }
        const bodyValidation = await validateAll(body, rules)
        if (bodyValidation.fails()) {
            return { message: 'vous avez manqué de remplir un champs obligation' }
        }


        // LUGGAGE TYPE ADDING
        // Verify if this withdrawals is alway registred
        const exittwithdrawals = await withdrawals
        .query()
        .where('denomination', body.denomination)
        .first()

        let newwithdrawals

        if (exittwithdrawals) {
            newwithdrawals = exittwithdrawals.toJSON()
        }else{
            // withdrawals TYPE ADDING
            const withdrawalsData = new Object()
            withdrawalsData.denomination = body.denomination
            withdrawalsData.description = body.description
            withdrawalsData.company_id = body.company_id
            newwithdrawals = await withdrawals.create(withdrawalsData)
        }
        
        // PRICE BY SIYE AND OTHER ADDING
        const PriceAndOtherData = new Object()
        PriceAndOtherData.min_weight = body.min_weight
        PriceAndOtherData.max_weight = body.max_weight
        PriceAndOtherData.min_size = body.min_size
        PriceAndOtherData.max_size = body.max_size
        PriceAndOtherData.unit_price = body.unit_price
        PriceAndOtherData.withdrawals_id = newwithdrawals.id

        const newPriceAndOther= await withdrawalPriseBy.create(PriceAndOtherData)

        // response
        response.json({
            message: 'success',
        })  
         
       
       
    
    }

    async getListOfWithdrawals({params, response}){

        // GET withdrawal PRISE
        const ListOfwithdrawalNotInJson = await withdrawalPriseBy
        .query()
        .innerJoin('withdrawals', 'withdrawals.id', 'withdrawal_price_by_weight_and_sizes.withdrawals_id')
        .select('withdrawal_price_by_weight_and_sizes.id', 'min_weight', 'max_weight','min_size', 'max_size', 'unit_price',
                'withdrawals_id', 'denomination','description')
        .where('withdrawals.company_id', params.id)
        .fetch()


        const ListOfwithdrawalPrices = ListOfwithdrawalNotInJson.toJSON()

        response.json({
            message: 'success',
            data: ListOfwithdrawalPrices
        })


        
    }

    
    async updateWithdrawals({request, response}){

        // GET DATA
        const body = request.all()

        let Thewithdrawalstype
        let ThepriceBy

        if (body.denomination || body.description) {
            const updatedata1 = {
                denomination: body.denomination,
                description: body.description
            }
            Thewithdrawalstype = await withdrawals.find(body.withdrawals_id)
            Thewithdrawalstype.merge(updatedata1)
            await Thewithdrawalstype.save()
        }

        if (body.min_weight || body.max_weight || body.min_size || body.max_size || body.unit_price) {
            const updatedata2 = {
                min_weight: body.min_weight,
                max_weight: body.max_weight,
                min_size: body.min_size,
                max_size: body.max_size,
                unit_price: body.unit_price,
            }

            ThepriceBy  = await withdrawalPriseBy.find(body.id)
            ThepriceBy.merge(updatedata2)
            await ThepriceBy.save()
        }

        if (Thewithdrawalstype || ThepriceBy) {
            return { message: 'success' }
        }else{
            return { message: 'Aucune modification éffectuée' }
        }

    }


    async CancelWithdrawals({params, response}){

        //  // GET DATA
        //  const body = request.all()
        
        //  // DATA VALIDATION         
        //  const rules = {
        //      id: 'required', 
        //  }
        //  const bodyValidation = await validateAll(body, rules)
        //  if (bodyValidation.fails()) {
        //      return { message: 'vous avez manqué de remplir un champs obligation' }
        //  }

        // DELETE LUGGAGE PRISE FOR THIS LUGGAGE TYPE
        const ListOfwithdrawalNotInJson = await withdrawalPriseBy
        .query()
        .where('withdrawals_id', params.id)
        .fetch()
        const ListOfwithdrawalPrices = ListOfwithdrawalNotInJson.toJSON()
        for (let index = 0; index < ListOfwithdrawalPrices.length; index++) {
            const post = await withdrawalPriseBy.find(ListOfwithdrawalPrices[index].id)  
            post.delete() 
        }

        // DELETE LUGGAGE TYPE
        const todelete = await withdrawals.find(params.id)  
        todelete.delete() 


        // RESPONSE
         response.json({
            message: 'success'
        })
    }



}

module.exports = WithdrawalController
