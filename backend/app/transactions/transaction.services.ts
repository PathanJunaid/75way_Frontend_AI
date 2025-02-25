import transactionSchema from "./transaction.schema"


export const getallTransactions = async()=>{
    try{
        const result = await transactionSchema.find().lean();
        console.log(result);
        return result;

    }catch(e){
        console.log('Error',e);
        return false;
    }

}