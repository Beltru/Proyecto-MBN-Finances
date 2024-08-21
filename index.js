import express from "express";
const app = express();

// settings
app.set("port", proccess.env.PORT || 3000);

// midleaqres
app.use(express.jason());


// routes
app.get("/ ", (req, res) => (
    res.json({"Info": "MBN Finances Working."})
));

// routes
