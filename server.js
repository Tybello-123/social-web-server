const express = require('express');
const multer = require('multer');
const Link = require("./modules/links");




const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))


app.set("view engine", "ejs")

//enabling CORS IN the server

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


const links = [];

links.push(new Link("Hacker News", "https://news.ycombinator.com", "Baptiste"));
links.push(new Link("Reddit", "https://reddit.com", "Thomas"));
links.push(new Link("Boing Boing", "boingboing.net", "Daniel"));

  

app.get('/' , (req,res) => {
  res.sendFile(`${__dirname}/views/index.html`)
})




app.get('/api/links', (req, res) =>  {
    res.json(links);
  });
  
app.post('api/links', (req, res, next) => {
   // Handle the post for this route
   //create new link object
   const title = request.body.title;
   const url = request.body.url;
   const author = request.body.author;

  
   const link = new(Link(title,url,author));

    //Add new link to the beginning of the list 
   links.unshiift(link)
    //send the response back as a json
   res.json(link)
  })





app.listen(8080)