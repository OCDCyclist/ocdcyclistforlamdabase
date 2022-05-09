const {uploadRideDetailStrava} = require('./src/uploadRideDetailStrava');
const {getRidesFromEvent} = require('./src/getRidesFromEvent');

const eventHandlerRequestActivityDetail = async (event, s3, docClient) =>{
    const rides = await getRidesFromEvent( event, docClient);
    const promiseArray = [];

    for( let i = 0; i < rides.length; i++){
        promiseArray.push( uploadRideDetailStrava( rides[i], s3, docClient) );
    }

    await Promise.all(promiseArray);
    console.log('all done eventHandlerRequestActivityDetail')
}
exports.eventHandlerRequestActivityDetail = eventHandlerRequestActivityDetail;

