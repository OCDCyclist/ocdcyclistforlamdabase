const {isValidString} = require('./utils/isValidString');

const getHistoricalRiderIDYearMonthFromEvent = event =>{
    if( typeof event !== 'object' ) return [];
    if( 'Records' in event === false || !Array.isArray(event.Records) || event.Records.length === 0 ) return [];

    const riderYearMonth= [];
    try{
        const records = event.Records;
        for( let i = 0; i < records.length; i++){
            const thisRecord = records[i];
            if( 'MessageAttributes' in thisRecord === false) continue;
            if( 'RiderID' in thisRecord.MessageAttributes === false) continue;
            const thisRiderID = thisRecord.MessageAttributes.RiderID.StringValue;
            const thisYear = Number.parseInt( thisRecord.MessageAttributes.Year.StringValue);
            const thisMonth = Number.parseInt( thisRecord.MessageAttributes.Month.StringValue);
            if( isValidString(thisRiderID) && typeof thisYear === 'number' && typeof thisMonth == 'number' ){
                if( !riderYearMonth.some( obj => obj.RiderID === thisRiderID && obj.Year === thisYear && obj.Month === thisMonth) ){
                    riderYearMonth.push( Object.assign({},{RiderID: thisRiderID, Year: thisYear, Month: thisMonth}) );
                }
            }
        }
    }
    catch( err){
        if( err && 'message' in err && err.message.length > 0){
            console.log(`Error in getHistoricalRiderIDYearMonthFromEvent: ${err.message}`);
        }
    }
    return riderYearMonth;
}

exports.getHistoricalRiderIDYearMonthFromEvent = getHistoricalRiderIDYearMonthFromEvent;