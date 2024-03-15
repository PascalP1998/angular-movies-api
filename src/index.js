const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const supabase = require("@supabase/supabase-js");
require('dotenv').config();

//const bcryptSalt = bcrypt.genSaltSync(10);
const saltRounds = 10;

const supabaseUrl = process.env.ANG_SUPABASE_URL;
const supabaseKey = process.env.ANG_SUPABASE_KEY;


supabase_client = supabase.createClient(supabaseUrl, supabaseKey);

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));

app.get('/api/test', (req, res) => {
    res.json("Test ok");
});

app.post('/api/addmovie', async (req, res) => {
    const {username, name, rating, type} = req.body;

    console.log("Empfangene Daten:", req.body);

    if (username == '' || name == '' || rating == '' || type == '') {
        res.status(418).json({message: 'Missing information', status:'418'});
    } else {
        const {data, error} = await supabase_client
        .from('movies')
        .insert([
            {username: username, name: name, rating: rating, type: type}
        ])
        .select()
    
        if (error) {
            res.status(422).json({message: error, status:'422'});
        } else {
            res.status(200).json({message: data, status:'200'});
        }
    }
})

app.get('/api/getreviews', async (req, res) => {
    
    const {data, error} = await supabase_client
    .from('movies')
    .select('*')
    
    if (error) {
        res.status(422).json(error);
    } else {
        res.status(200).json(data);
    }
})

const PORT = 4000;
app.listen(PORT, function(err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
});