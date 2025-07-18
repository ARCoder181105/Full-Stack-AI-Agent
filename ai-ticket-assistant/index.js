import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/user.js'

const app = express();
const PORT = process.env.PORT || 3000


//middlewares
app.use(cors());
app.use(express.json())

app.use('/api/auth',userRoutes)


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected ✅");
        app.listen(PORT, () => console.log(`Serever is running on port ${PORT}`))
    })
    .catch((err) => console.log("Database Error: ", err.stack));










