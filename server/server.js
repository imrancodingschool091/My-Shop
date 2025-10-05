import app from "./app.js";
import { connectDb } from "./config/db.js";

connectDb();

const port=process.env.PORT||8080

app.listen(port,()=>{
    console.log(`The App is Running On Port:${port}`);
    
})