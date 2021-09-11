const { secureHeapUsed } = require("crypto");
// Requiring the node modules installed through the terminal
const express = require ("express");
const app = express();
const https = require ("https");
const bodyParser = require ("body-parser");
// Using body parser to parse the HTML body from the index.html
app.use(bodyParser.urlencoded({extended:true}));


app.get("/" , function(req, res){
    res.sendFile(__dirname+"/index.html");

    
});

app.post("/", function(req, res){
    
  const query = req.body.cityName;
//   Catching the data sent by the user in the form of index.html
    const APIkey = "b9ed0c4062c58c162db06aa74c5b9f53";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+APIkey;
    // Modified API URL

    https.get(url, function(response){
        // Response from the API server to my server
        response.on("data", function (data){
            const weatherdata = JSON.parse(data);
            // Parsing JSON from the API 

            // Using the data returned by API
           const temp = weatherdata.main.temp
           const description = weatherdata.weather[0].description
           const icon = weatherdata.weather[0].icon

        //    Image URL modified as per the API conditions used 
           const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

        //    For writing HTML in the below code
           res.setHeader("Content-Type", "text/html");

        //    For printing the data on the screen as output
           res.write("<img src="+imageURL+">");
           res.write("<h1> The temprature of "+query+" is  " +temp+"</h1>");
           res.write("<h2>The weather description of "+query+" is " +description+"</h2>");
        //    Multiple write statements can be used.

           res.send();
        //Sending response from my server to client server
        });
    });

  
});






app.listen(3000, function(){
    console.log("server is running on port 3000");
}
);