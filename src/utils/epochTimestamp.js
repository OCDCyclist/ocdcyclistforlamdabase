const epochTimestamp = (startYear = 1970, startMonth = 1)=>{
    if( typeof startYear !== 'number' || startYear> 3000 ) startYear = 1970;

    if( typeof startMonth !== 'number' || startMonth < 1 ) startMonth = 1;
    if( startMonth > 12 ) startMonth = 12;

    let endYear = startYear;
    let endMonth = startMonth + 1;
    if( endMonth > 12 ){
        endYear = startYear + 1;
        endMonth = 1;
    }

    const startDate = new Date(`${startMonth}/01/${startYear}Z`);
    const endDate = new Date(`${endMonth}/01/${endYear}Z`);
    return {
        startEpoch: Math.floor( startDate.getTime() / 1000),
        endEpoch: Math.floor( endDate.getTime() / 1000 ) -1
    }
};

exports.epochTimestamp = epochTimestamp;