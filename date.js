//Creation of own module
exports.getDate = function (){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    return today.toLocaleDateString("en-GB",options);
}

exports.getDay = function (){
    let today = new Date();
    let options = {
        weekday: "long"  
    };
    return today.toLocaleDateString("en-GB",options); 
};
