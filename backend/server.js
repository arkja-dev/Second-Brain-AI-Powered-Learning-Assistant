require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");
const askRoutes = require("./routes/askRoutes");
const documentRoutes = require("./routes/documentRoutes");
const quizRoutes = require("./routes/quizRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const revisionRoutes = require("./routes/revisionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const studyPlanRoutes = require("./routes/studyPlanRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);
app.use("/api", askRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api", quizRoutes);
app.use("/api", bookmarkRoutes);
app.use("/api", revisionRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", studyPlanRoutes);
app.use("/api", searchRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
    res.send("Cortex AI Backend Running");
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
