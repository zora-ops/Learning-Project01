import notesRoutes from './routes/notesRoutes.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDb } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
dotenv.config();

console.log(process.env.MONGO_URI);


const app = express();
const port = process.env.PORT || 5000;


app.use(cors({
     origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

connectDb().then( ()=> {app.listen(port, () => {
     console.log('Server is running on port 5000');
})
})