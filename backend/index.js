import express from "express";
import spamDetect from "./utils/spamDetect.js";
import authRoutes from "./routes/auth.js"
import connectDB from "./config/db.js";
import cors from 'cors'

const app=express()
const PORT=8000

// spamDetect("England v Macedonia - dont miss the goals/team news. Txt ur national team to 87077 eg ENGLAND to 87077 Try:WALES, SCOTLAND 4txt/ú1.20 POBOXox36504W45WQ 16+")

connectDB()

app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)

app.listen(PORT,()=>console.log("server is running on port : "+PORT))
