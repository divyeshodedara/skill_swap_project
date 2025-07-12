import express from "express";
import spamDetect from "./utils/spamDetect.js";
import authRoutes from "./routes/auth.js"
import connectDB from "./config/db.js";
import profileRoutes from "./routes/profile.js"
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app=express()
const PORT=8000

// spamDetect("England v Macedonia - dont miss the goals/team news. Txt ur national team to 87077 eg ENGLAND to 87077 Try:WALES, SCOTLAND 4txt/ú1.20 POBOXox36504W45WQ 16+")

connectDB()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use("/api/auth",authRoutes)
app.use("/api/profile",profileRoutes)

app.listen(PORT,()=>console.log("server is running on port : "+PORT))
