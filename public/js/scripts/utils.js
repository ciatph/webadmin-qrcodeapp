var Utils = function(){
    this.admins = ['oelmapps@gmail.com'];
    this.redirect_logout = 'index.html';
};


/**
 * Get the current date from PC's local time
 */
Utils.prototype.getCurrentDate = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    
    var yyyy = today.getFullYear();
    if(dd < 10){
        dd = '0' + dd;
    } 
    if(mm < 10){
        mm = '0' + mm;
    } 
    
    var today = dd+'/'+mm+'/'+yyyy;
    return today;
};


window.onload = function(){
    window.Utils = new Utils();
};