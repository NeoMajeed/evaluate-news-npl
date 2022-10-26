const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const Apikey = process.env.API_KEY;
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const cors = require('cors');

const app = express()

app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) 
app.use(cors());


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(resolve('src/client/views/index.html'))
})

//get data from meaning cloud api and send it to the client side
app.post('/api', async(req, res)=> {
    let url = req.body.url
    const fullURL = `${baseURL}?key=${Apikey}&url=${url}&lang=en`;
    console.log(fullURL);
    const response = await fetch(fullURL)
    try {
        const Data = await response.json();
        let polarity = Data.score_tag;
        let subjectivity = Data.subjectivity;
        let text = Data.sentence_list[0].text;

        let data = {
            polarity,
            subjectivity,
            text
        }
        
        res.send(data);
    }
    catch (error) {
        console.log("error", error);
    }

})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

