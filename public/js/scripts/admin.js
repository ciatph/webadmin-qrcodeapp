var Admin = function(){

};

/**
 * Creates a new table that contains the key field name and value of a firebase node
 * Appends a checkbox and listens for click events on user checked
 * @param {ID of table to create} tblName 
 * @param {JSON key-value pair to be displayed per table row} rowData 
 * @param {ID or CLASS of html dom object in which to insert table after} rootNode
 */
Admin.prototype.createTableApi = function(tblName, rowData, rootNode){
    var start = '#';
    var self = this;

    start += (rootNode !== undefined && rootNode !== null) ? rootNode : 'api_common';
    var tableClasses = ['table,table-sm,table-bordered,table-condensed,table-striped']; 
  
    var table = $('<table class="table table-sm table-bordered table-condensed table-striped">');
    table.attr('id', tblName);
  
    // table headers
    // table.append('<thead><th>Field Name</th><th>Description</th></thead>');
    var field = tblName.replace(/api_/g, '').replace('_', ' ').toUpperCase();
    
    // table headers and buttons
    table.append('<tr><td class="table_headers" colspan="2"><b>'+ tblName.replace(/api_/g, '').replace('_', ' ').toUpperCase() 
        + '</b><span style="float: right;">' 
        // Select/unselect buttons
        + '<button id="deselect_' + tblName + '" type="button" class="btn btn-primary">De-select</button> &nbsp; ' 
        + '<button id="select_' + tblName + '" type="button" class="btn btn-primary">Select All</button>'
        + '</td></tr>');
    table.append('<tr><th>Field Name</th><th>Description</th></tr>');
  
    for(var key in rowData){
        var row = '<tr><td><div class="checkbox"><label><input type="checkbox" id="' + key + '">'+ key +'</label></div></td>' + 
        '<td>'+ rowData[key] +'</td></tr>';
        table.append(row);

        // Push unique variable field names
        this.keys.push(key);
    }
  
    table.insertAfter(start);
    return table;
  }