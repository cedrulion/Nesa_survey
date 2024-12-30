const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/routes/userRoute");
const surveyRoutes = require('./src/routes/surveyRoutes');
const createAdminUser = require('./adminSetup'); 
const adminRoutes = require('./src/routes/adminRoutes');

const dbConnect=require("./src/database/db")
//configuring express
const app = express();

//connecting to the database
dbConnect()
// Calling createAdminUser to ensure admin is set up on server start
createAdminUser();
//middlewares
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use("/api/user", userRoutes);
app.use('/api', surveyRoutes);
app.use('/api', adminRoutes);


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server started on port ${port}`)
})
