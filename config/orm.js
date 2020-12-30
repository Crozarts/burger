var connection = require("./connections.js");

// sql helper function
function questionMarks(x) {
    var arr = [];
    for (y = 0; y < x; y++) {
        arr.push("?");
    }
    return arr.toString();
}

// object to sql helper function
function obToSql(ob) {
    var arr = [];
    for (var key in ob) {
        arr.push(key + "=" + ob[key]);
    }
    return arr.toString();
}

// Our Homemade orm ("YUM!")
var orm = {
    // selectAll() to select all burgers from the database for display
    selectAll: (tableInput, cb) => {
        connection.query("SELECT * FROM " + tableInput + ";", function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    // insertOne() Add new burger to the database
    insertOne: (table, cols, vals, cb) => {
        connection.query("INSERT INTO " + table + " (" + cols.toString() + ") VALUES (" + questionMarks(vals.length) + ") ", vals, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    // updateOne() to flag a burger that has been "devoured"
    updateOne: (table, objColVals, condition, cb) => {
        connection.query("UPDATE " + table + " SET " + toSql(objColVals) + " WHERE " + condition, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

// Export
module.exports = orm;