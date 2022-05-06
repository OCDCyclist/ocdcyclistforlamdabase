const isValidRiderIDYearMonth = obj =>{
    if( typeof obj !== 'object') return false;
    if( 'RiderID' in obj === false) return false;
    if( 'Year' in obj === false) return false;
    if( 'Month' in obj === false) return false;
    if( typeof obj.RiderID !== 'string') return false;
    if( typeof obj.Year !== 'number') return false;
    if( typeof obj.Month !== 'number') return false;
    return true;
};

exports.isValidRiderIDYearMonth = isValidRiderIDYearMonth;