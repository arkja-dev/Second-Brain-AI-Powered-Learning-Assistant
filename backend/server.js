require("dotenv").config();
const askRoutes = require("./routes/askRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const uploadRoutes = require("./routes/uploadRoutes");  // ADD THIS LINE

const app = express();

app.use(cors());
app.use(express.json());

const documentRoutes = require("./routes/documentRoutes");

app.use("/api", uploadRoutes);  // ADD THIS LINE
app.use("/api", askRoutes);
app.use("/api/docs", documentRoutes);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
    res.send("Cortex AI Backend Running");
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    console.log("Gemini Key:", process.env.GEMINI_API_KEY);

});
