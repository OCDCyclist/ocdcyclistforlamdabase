const {isValidString} = require('./utils/isValidString');

const getRidesFromEvent = async event =>{
    if( typeof event !== 'object' ) return [];
    if( 'Records' in event === false || !Array.isArray(event.Records) || event.Records.length === 0 ) return [];

    const rides= [];
    try{
        const records = event.Records;
        for( let i = 0; i < records.length; i++){
            const thisRiderID   = records[i].MessageAttributes.RiderID.StringValue;
            const thisID        = records[i].MessageAttributes.id.StringValue;
            if( isValidString(thisRiderID) && thisID > 0){
                if( !rides.some( obj => obj.RiderID === thisRiderID && obj.id === thisID) ){
                    rides.push( Object.assign({},{RiderID: thisRiderID, id: thisID}) );
                }
            }
        }
    }
    catch( err){
        if( err && 'message' in err && err.message.length > 0){
           console.log(`Error in getRidesFromEvent: ${JSON.stringify(err)}`);
        }
    }
    return rides;
}

exports.getRidesFromEvent = getRidesFromEvent;