import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// const expres = require("express");

// buat ngumpetin URI dari mongodbnya.
// key disimpen di variabel .env yang lokal, yang mana untuk akses nilainya perlu modul dotenv ini.
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; //kalo kiri undefined, kanan dipake. nama tekniknya fallback value.

// connectDB();
// dipindahin. kalo dibiarin, servernya jalan duluan sebelum koneksi database.
// jadinya disatuin dengan app.listen dibawah, make method .then()

// middleware : fungsi yang berjalan di antara proses req dan res.
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method}, & req URL is ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(()=> {
    app.listen(5001, () => {
        console.log("Server started on PORT : ", PORT);
    });
}); 