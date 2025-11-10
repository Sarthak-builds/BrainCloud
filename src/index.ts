import  express  from "express";
import cors from 'cors';
import { config } from "dotenv";
import { connectDB } from "./DB/connection.js";
import authRoutes from './routes/auth.js';

config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));
app.use(express.json());
//routes check kro
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
} );

export default app;