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

app.post('/api/registerUser', async (req, res) => {
    console.log("Empfangene Daten:", req.body);
    const {email, password, username} = req.body;

    try {
        const {data, error} = await supabase_client
        .from('users')
        .insert([
            {username: username, email: email, password: bcrypt.hashSync(password, saltRounds)}
        ])
        .select()

        if (error) {
            res.status(422).json(error);
        } else {
            res.status(200).json(data);
        }
    } catch (e) {
        res.status(500).json(e);
    }
});

const PORT = 4000;
app.listen(PORT, function(err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
});