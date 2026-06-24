const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({ storage });



mongoose
  .connect("mongodb://127.0.0.1:27017/studentdb")
  .then(() =>
    console.log("MongoDB Connected")
  )
  .catch((err) =>
    console.log(err)
  );



const studentSchema =
  new mongoose.Schema({
    name: String,
    rollNo: String,
    email: String,
    phone: String,
    gender: String,
    graduation: String,
    photo: {
      type: String,
      default: "",
    },
  });

const Student = mongoose.model(
  "Student",
  studentSchema
);



app.post(
  "/api/students",
  upload.single("photo"),
  async (req, res) => {
    try {
      const student =
        await Student.create({
          name: req.body.name,
          rollNo: req.body.rollNo,
          email: req.body.email,
          phone: req.body.phone,
          gender: req.body.gender,
          graduation:
            req.body.graduation,
          photo: req.file
            ? req.file.filename
            : "",
        });

      res.json(student);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);



app.get(
  "/api/students",
  async (req, res) => {
    try {
      const students =
        await Student.find();

      res.json(students);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);


app.put(
  "/api/students/:id",
  upload.single("photo"),
  async (req, res) => {
    try {
      console.log(
        "Updating ID:",
        req.params.id
      );

      const updateData = {
        name: req.body.name,
        rollNo: req.body.rollNo,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        graduation:
          req.body.graduation,
      };

      if (req.file) {
        updateData.photo =
          req.file.filename;
      }

      const student =
        await Student.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true,
          }
        );

      console.log(
        "Updated Student:",
        student
      );

      res.json(student);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);



app.delete(
  "/api/students/:id",
  async (req, res) => {
    try {
      await Student.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Student Deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

app.get("/", (req, res) => {
  res.send(
    "Student Management System API"
  );
});


app.listen(5000, () => {
  console.log(
    "Server Running On Port 5000"
  );
});