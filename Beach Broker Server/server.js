/////////////////////////////////////////////
// Beach Broker Node.js Server
/////////////////////////////////////////////

var mysql = require('mysql');
var restify = require('restify');
var sanitizer = require('sanitizer');
var http = require('http');
var request = require('request');
var randomstring = require("randomstring");
var fs = require("fs");
var gm = require('gm').subClass({imageMagick: true});
var mkdirp = require('mkdirp');

var connection  = mysql.createPool({
    connectionLimit : 10,
    host  : 'localhost',
    user  : 'root',
    password  : 'root',
    database  : 'beachbroker',
    port  : 8889
});

var server = restify.createServer();
//var server = restify.createServer();
function validateInputs(value)
{
    if(value == undefined || value == null){
        return false;
    }
    else return true;
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function createUser (req, res, next) {
  console.log("request hit");
  console.log(req.body);
  if(!validateInputs(req.body.email) || !validateInputs(req.body.password) || !validateInputs(req.body.firstName) || !validateInputs(req.body.lastName)){
      res.send(414); //Invalid inputs
      next();
      return;
  }

  var token = randomstring.generate(255);
  var query = "SELECT * FROM users WHERE email = " + mysql.escape(req.body.email) + ";";
  console.log(query);
  connection.query(query, function(err, results){
      if(results.length > 0) {
        res.send(401); //401 is user already exists
        next();
        return;
      }
      var query2 = "INSERT INTO Users (email, password, firstName, lastName, token) VALUES("
      + mysql.escape(req.body.email)+ ", PASSWORD(" + mysql.escape(req.body.password) + "), "
      + mysql.escape(req.body.firstName) + ","
      + mysql.escape(req.body.lastName) + ", '" + token + "');";
      console.log(query2);
      connection.query(query2, function(err, results){
      if(err)
        throw err;
      res.send({"token":token});
      next();
      return;
  });
  });

}

function authorizeUser (req, res, next) {
  if(!validateInputs(req.body.password) || !validateInputs(req.body.email)){
        res.send(414); //Invalid inputs
        next();
        return;
    }

    var query = "SELECT * FROM Users WHERE password = PASSWORD(" + mysql.escape(req.body.password) + ") AND email = " + mysql.escape(req.body.email) + ";";
    console.log(query);
    connection.query(query,  function(err, results){
	if (err)
	    throw err;
	else if (results.length < 1)
	    res.send({"loggedIn":false});
	else {
	  res.send({"loggedIn":true, "token":results[0].token});
  }
	 return next();
    });

}

function uploadListingPictures(req, res, next){

  //console.log("endpoint was hit");

  var token = mysql.escape(req.body.userToken);
  checkToken(token,function(response){
    if(response['value']){
      var query2 = "INSERT INTO listings (userId, fullAddress, streetNumber, streetName, city, state, country, zipcode, latitude, longitude, cost, sqft, beds, baths, beachDistance, homeType, description, published) VALUES("
      +  mysql.escape(response['email']) + ","
      + mysql.escape(req.body.fullAddress) + ","
      + mysql.escape(req.body.streetNumber) + ","
      + mysql.escape(req.body.streetName) + ","
      + mysql.escape(req.body.city) + ","
      + mysql.escape(req.body.state) + ","
      + mysql.escape(req.body.country) + ","
      + mysql.escape(req.body.zipcode) + ","
      + mysql.escape(req.body.latitude) + ","
      + mysql.escape(req.body.longitude) + ","
      + mysql.escape(req.body.cost) + ","
      + mysql.escape(req.body.sqft) + ","
      + mysql.escape(req.body.beds) + ","
      + mysql.escape(req.body.baths) + ","
      + mysql.escape(req.body.beachDistance) + ","
      + mysql.escape(req.body.homeType) + ","
      + mysql.escape(req.body.description) + ","
      + mysql.escape(req.body.published) + "); ";
      //console.log(query2);
      connection.query(query2, function(err, results){
        //console.log("shit's done");
        if(err)
          throw err;
        else{

          var insertId = results['insertId'].toString();
          console.log(insertId);
          //console.log(res);
          //Build a list of filenames
          var filenames = [];
          var counter = 0;
          //Upload the files to the server
          for(i in req.files) {
            var index = 'file[' + i.toString() + ']';
            var filename = req.files[i]['name'];
            var split = filename.split('.');
            var ext = split[split.length - 1];
            var newFilename = (new Date).getTime() + '.' + ext;
            filenames.push(newFilename);
            var path = "images/listings/" + insertId;
            console.log(path);
            var uploadPath = path + '/' + newFilename;
            mkdirp(path, function (err) {
                if (err) console.error(err)
                else console.log('pow!')
            });
            console.log(uploadPath);
            fs.createReadStream(req.files[i]['path']).pipe(fs.createWriteStream(uploadPath));
            //var middle = gm(req.files[i]['path']).thumb(200, 200, "images/listings/thumb/" + insertId + "/" + newFilename, 75, function(err){if(err) console.log(err)});
          }


          //console.log(results);
        //  var query3 = "";
        var queryString = "INSERT INTO listingPictures (idListing, filePath) VALUES"

          for(var i = 0; i < filenames.length; i++) {
            console.log(filenames[i]);
            queryString += " (" + results['insertId'] + ", '" + filenames[i] + "')";
            if(i != (filenames.length - 1)) {
              queryString += ", ";
            } else {
              queryString += ";"
            }
            console.log(queryString);
          }

          //console.log(queryString);
          connection.query(queryString, function(err, results){
            if(err)
              throw err;
            else{
              res.send(200);
              next();
              return;
            }

          });


        }

      });
    }else{
      console.log("Invalid token");
      res.send(300); //token wasn't present or incorrect
      next();
      return;
    }

  });



  res.send(200);
  next();
  return;
}

//Check if a user's token is valid
function checkToken(token,callback){
  var query = "SELECT * FROM users WHERE token = " + token + ";";
  console.log(query);
  connection.query(query, function(err, results){
    if(err)
      throw err;
    else if(results.length > 0){
      var obj = {
        value: true,
        email: results[0]['email']
      }
      return callback(obj);
    }else{
      console.log("token was wrong");
      var obj = {
        value: false,
        email: null
      }
      return callback(obj);
    }
  });
}


function getUserListings (req, res, next) {
  console.log(req.body);
  var token = mysql.escape(req.body.userToken);
  checkToken(token,function(response){
    if(response['value']){
      //console.log(response);
      var query = "SELECT * FROM listings as L, listingPictures as P " +
                  "where L.userId = " + mysql.escape(response['email']) + " and P.idListing = L.id " +
                  "GROUP BY L.id";
      //var query = "SELECT * FROM listings WHERE userId = " + mysql.escape(response['email']) + ";";
      //console.log(query);
      connection.query(query, function(err, results){
        if(err)
          throw err;
          //console.log(results);
        res.send(results);
        next();
        return;
      });
    }
    else{
      res.send(300);
      next();
      return;
    }
  });
}

function getUser(req,res,next){
  var token = mysql.escape(req.body.userToken);
  checkToken(token,function(response){
    if(response['value']){
      var query = "SELECT * FROM users WHERE email = "  + mysql.escape(response['email']) + ";";
      connection.query(query, function(err, results){
        if(err)
          throw err;
          //console.log(results);
        res.send(results);
        next();
        return;
      });
    }else{
      res.send(300);
      next();
      return;
    }
  });
}

function getAllListings (req, res, next) {

}

function getSingleListing (req, res, next) {
  if(!validateInputs(req.params.id)){
      res.send(414); //Invalid inputs
      next();
      return;
  }
  var query = "SELECT * FROM listings WHERE id = " + mysql.escape(req.params.id) +" ;";
  connection.query(query, function(err, results){
  if(err)
      throw err;
  else if(results.length < 1)
      res.send(408); //no such listing exists
  else{
    var query2 = "SELECT * FROM listingPictures WHERE idListing = " + mysql.escape(req.params.id) +" ;";
    connection.query(query2, function(err, results2){
      if(err)
          throw err;
      else{
        var obj = {
          "listingData": results,
          "listingPictures": results2
        };
        res.send(obj);
        next();
      }
    });
  }


  })
}

function getListingsByAddress (req, res, next) {
  console.log(req.body);
  if(req.body.streetNumber != ''){
    var query = "SELECT * FROM listings as L, listingPictures as P WHERE streetNumber =" + mysql.escape(req.body.streetNumber) + " and streetName= " + mysql.escape(req.body.streetName) +" and P.idListing = L.id GROUP BY L.id;";
    console.log(query);
    connection.query(query, function(err, results){
      if(err)
          throw err;
      else{
        res.send(results);
        next();
      }
    });
  }
  else if(req.body.streetName != ''){
    var query = "SELECT * FROM listings as L, listingPictures as P WHERE streetName = " + mysql.escape(req.body.streetName) +" and P.idListing = L.id GROUP BY L.id;";
    console.log(query);
    connection.query(query, function(err, results){
      if(err)
          throw err;
      else{
        res.send(results);
        next();
      }
    });
  }else if(req.body.city != ''){
    var query = "SELECT * FROM listings as L, listingPictures as P WHERE city = " + mysql.escape(req.body.city) +" and P.idListing = L.id GROUP BY L.id;";
    console.log(query);
    connection.query(query, function(err, results){
      if(err)
          throw err;
      else{
        res.send(results);
        next();
      }
    });
  }else if(req.body.state != ''){
    var query = "SELECT * FROM listings as L, listingPictures as P WHERE state = " + mysql.escape(req.body.state) +" and P.idListing = L.id GROUP BY L.id;";
    console.log(query);
    connection.query(query, function(err, results){
      if(err)
          throw err;
      else{
        res.send(results);
        next();
      }
    });
  }else if(req.body.country != ''){
    var query = "SELECT * FROM listings as L, listingPictures as P WHERE country = " + mysql.escape(req.body.country) +" and P.idListing = L.id;";
    console.log(query);
    connection.query(query, function(err, results){
      if(err)
          throw err;
      else{
        res.send(results);
        next();
      }
    });
  }else{
    console.log("no idea bro...");
    res.send(200);
    next(395);
    return;
  }

}

function updateUser (req, res, next) {
  var token = mysql.escape(req.body.userToken);
  console.log(req.body);
  checkToken(token,function(response){
    if(response['value']){

      //console.log(res);
      //Build a list of filenames
      var filenames = [];
      var counter = 0;
      //Upload the files to the server
      for(i in req.files) {
        var index = 'file[' + i.toString() + ']';
        var filename = req.files[i]['name'];
        var split = filename.split('.');
        var ext = split[split.length - 1];
        var newFilename = (new Date).getTime() + '.' + ext;
        filenames.push(newFilename);
        fs.createReadStream(req.files[i]['path']).pipe(fs.createWriteStream("images/profile/" + newFilename));
        //var middle = gm(req.files[i]['path']).thumb(200, 200, "images/profile/thumb/" + newFilename, 75, function(err){if(err) console.log(err)});
      }

      var query = "Update users SET firstName=" + mysql.escape(req.body.firstName) + ", lastName=" + mysql.escape(req.body.lastName) +
      ", contactEmail=" + mysql.escape(req.body.contactEmail) +
      ", phone=" + mysql.escape(req.body.phone) +
      ", imagePath=" + mysql.escape(filenames[0]) + " WHERE token=" + token + ";";

      console.log(query);

      //console.log(query2);
      connection.query(query, function(err, results){
        //console.log("shit's done");
        if(err)
          throw err;
        else{
          res.send(200); //token wasn't present or incorrect
          next();
          return;
        }

      });
    }else{
      console.log("Invalid token");
      res.send(300); //token wasn't present or incorrect
      next();
      return;
    }

  });



  res.send(200);
  next();
  return;
}

/////////////////////////////////////////////
// Route Definition
/////////////////////////////////////////////
server.use(function crossOrigin(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', 'false');
    return next();
});
server.use(restify.bodyParser ({mapParams: false, multiples: true}));



server.post('/users', createUser);
server.post('/users/authorize', authorizeUser);
server.post('/users/name', getUser);
server.post('/users/update',updateUser);
//server.post('/listings', createListing);
server.post('/listings/pictures', uploadListingPictures);
server.post('/listings/user', getUserListings);
server.get('/listings', getAllListings);
server.get('/listings/:id',getSingleListing);
server.post('/listings/all', getListingsByAddress);





server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
