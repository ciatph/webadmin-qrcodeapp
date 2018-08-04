/**
 * Collection of utility methods for string and JSON operations
 */
var Utils = function(){
  
};


/**
 * Extract a requested parameter from a full date
 * @param {Full date following the format: year-month-day separated by a delimiter} date 
 * @param {Separator of full date's year, month and day } delim, default: "-"
 * @param {Parameter to extract from date: year, month, day} param 
 */
Utils.prototype.getMonth = function(date, delim, param){
    var delimiter = (delim !==  null) ? delim : "-";
  
    if(date === "")
        return -1;
  
    if(date.indexOf(delim) === -1)
        return -1;
  
    var parts = date.split(delim);
    if(parts.length === 3 && param !== undefined){
        if(param === 'year'){
            return parts[0];
        }
        else if(param === 'month'){
            return parts[1];
        }
        else if(param === 'day'){
            return parts[2];
        }
        else{
            return -1;
        }
    }
    else{
        return -1;
    }
};


/**
 * Returns TRUE|FALSE if a JS object has no more JS-Object children
 * @param {JS Object} ob 
 */
Utils.prototype.isEmpty = function(ob){
    for(var key in ob){
        if(typeof(ob[key]) === 'object'){
            return false;
        }
    }
    return true;
}


/**
 * Get the indicated parameter(s) from url
 * @param {specified url} url
 * @param {parameter/s to get from url. String if single value. Array of strings[] if multiple values} keys 
 * Returns a single string value or a key-pair object of keys and values
 */
Utils.prototype.getUrlParam = function(url, keys){
	// Replace starting "?" with "&" and split parameters by the "&" sign
	var params = url.replace("?", "&").split("&");
	
	// Remove the base url
	params.splice(0, 1);	
	
	// Create an empty nodes and value object to return
	var obj = {};

	params.some(function(value, index, _arr){
		var pair = value.split("=");
		
		if(pair.length !== 2){
			obj = "Invalid url query for " + value + ". Please check your parameters.";
        }
        else{
            // Retrieve the value of only (1) key
            if(typeof(keys) === "string"){
                if(pair[0] === keys){
                    obj = pair[1];	
                    return true;
                }
            }
            else if(Array.isArray(keys)){
                // Retrieve the values of only the specified keys in the array
                if(keys.indexOf(pair[0]) >= 0){
                    obj[pair[0]] = pair[1];	
                    keys.splice(keys.indexOf(pair[0]), 1);
                }
            }		
            else{
                // Retrieve all keys and their values from the url
                obj[pair[0]] = pair[1];	
            }	      
        }	
    });
  
	return obj;
}


/**
 * Creates an ordered firebase path or url query string 
 * @param urlParams	a JS Object that contains a key-value pair of url parameters and their values
 * @param type	indicates the final url format. Values can be "firebase" or "url"
 */
Utils.prototype.urlBuilder = function(urlParams, type){
	if(type !== undefined){
		if(["firebase","url"].indexOf(type) === -1){
			return "Invalid url type " + type;
		}
	}
	
	var format = (type !== undefined) ? type : "url";
	var nodes_order = ['year','node','userid'];
	var query = '';
	
	nodes_order.forEach(function(key){
		if(urlParams[key] !== undefined){
			if(format === 'url')
				query += key + '=' + urlParams[key] + '&';
			else if(format === 'firebase')
				query += urlParams[key] + '/';
		}
	});
	
	return query.substring(0, query.length-1);
}


/**
 * Count the object length
 * @param {JS object} obj 
 */
Utils.prototype.getObjectLength = function(obj){
    var count = 0;
    if(obj !== null && obj !== undefined)
        count = Object.keys(obj).length;
    return count;
};


/**
 * Gets all the keys of the last level of a nested JS Object recursively
 * @param {Simple or nested JS Object} obj 
 * @param {Empty array to contain the extracted keys} array 
 */
Utils.prototype.getObjectKeys = function(obj, array){
    for(var key in obj){
        if(typeof(obj[key]) === 'object'){
            console.log('key: ' + key + ' is an object');
            this.getObjectKeys(obj[key], array);
            break;
        }
        else{
            array.push(key);
            // console.log('not an object: ' + key);
        }
    }
  
    return array;
}


/**
 * Converts a single or nested JS Object (json) into an array of jsons
 * Uses recursion to get to the root level of the object before extracting key-value sets
 * @param {A single or nested JS Object} data 
 * @param {An empty JS array on which to push json data by line/record} container 
 */
Utils.prototype.jsonToArray = function(data, container){
    for(var key in data){
        if(!this.isEmpty(data[key])){
            this.jsonToArray(data[key], container);
        }
        else{
            console.log('end of line reached! ' + key);
            // Push the json object into the array
            container.push(data[key]);
        }
    }
  
    return container;
};


module.exports = new Utils();