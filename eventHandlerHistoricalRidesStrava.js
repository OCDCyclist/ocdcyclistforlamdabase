const {updateHistoricalRidesStrava} = require('./src/updateHistoricalRidesStrava');
const {getHistoricalRiderIDYearMonthFromEvent} = require('./src/getHistoricalRiderIDYearMonthFromEvent');

const eventHandlerHistoricalRidesStrava = async (event, s3, docClient) =>{
    const historialRiderIDYearMonth = getHistoricalRiderIDYearMonthFromEvent( event, docClient);
    const promiseArray = [];

    for( let i = 0; i < historialRiderIDYearMonth.length; i++){
        promiseArray.push( updateHistoricalRidesStrava( historialRiderIDYearMonth[i], s3, docClient) );
    }

    await Promise.all(promiseArray);
    console.log('all done eventHandlerHistoricalRidesStrava')
}
exports.eventHandlerHistoricalRidesStrava = eventHandlerHistoricalRidesStrava;

