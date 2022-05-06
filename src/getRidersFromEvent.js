const {isValidString} = require('./utils/isValidString');

const getRidersFromEvent = async (event, docClient) =>{
    const riders= [];
    // If the event contains records then process them, otherwide process all Riders.
    if( event && 'Records' in event && Array.isArray( event.Records) && event.Records.length > 0 && 'MessageAttributes' in  event.Records[0] && 'RiderID' in  event.Records[0].MessageAttributes ){
        const records = event.Records;
        for( let i = 0; i < records.length; i++){
            const thisRiderID = records[i].MessageAttributes.RiderID.StringValue;
            if( isValidString(thisRiderID) && !riders.includes( thisRiderID) ){
                riders.push(thisRiderID)
            }
        }
    }
    else{
        if(docClient){
            const params = {
                ProjectionExpression: "RiderID",
                TableName: "Riders"
            };
            const result = await docClient.scan(params).promise()
                .then( result => result)
                .catch( err => { if( err )console.log( err.message) });
            const records = Array.isArray(result.Items) ? result.Items : [];
            for( let i = 0; i < records.length; i++){
                const thisRiderID = records[i].RiderID;
                if( isValidString(thisRiderID) && !riders.includes( thisRiderID) ){
                    riders.push(thisRiderID)
                }
            }
        }
    }
    return riders;
}

exports.getRidersFromEvent = getRidersFromEvent;