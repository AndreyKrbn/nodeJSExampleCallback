module.exports.SearchBy2Fields = function (table, searchString, callback) {
  var Connection = require("tedious").Connection;
  var Request = require("tedious").Request;
  var TYPES = require("tedious").TYPES;
  var config = {
    server: "DESKTOP-NFE7EKG", //update me
    authentication: {
      type: "default",
      options: {
        trustServerCertificate: false,
        userName: "sa", //update me
        password: "sa", //update me
      },
    },
    options: {
      // If you are on Microsoft Azure, you need encryption:
      // encrypt: true,
      database: "Aspect", //update me
    },
  };
  var result = {};
  result.data = [];
  result.count = 0;  
  var connection = new Connection(config);
  connection.on("connect", function (err) {
    // If no error, then good to proceed.
    console.log("Connected");
    //-----------поиск-----
    var query =
      "select * from " +
      table +
      " where name like'%" +
      searchString +
      "%' or decription like'%" +
      searchString +
      "%' order by 2, 3 asc;";
    request = new Request(query, function (err, rowCount) {
      if (err) {
        connection.close();
        console.log(err);
        console.log("Disconnected");
        return;
      }
      result.count = rowCount;
    });
    var i = 0;
    request.on("row", function (columns) {
      if (i > 20) {
        return;
      }
      var item = {};
      item.id = columns[0].value;
      item.name = columns[1].value;
      item.decription = columns[2].value;
      result.data[i] = item;
      i++;      
    });

    request.on("done", function (rowCount, more, rows) {});

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {      
      connection.close();      
      console.log("Disconnected");      
      callback(null,result);
    });
    connection.execSql(request);
    //-----------
  });
  connection.connect();  
};
