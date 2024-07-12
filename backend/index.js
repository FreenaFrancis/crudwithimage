const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const userModel = require('./model/user'); // Assuming userModel is exported from another file

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = 6500;

mongoose.connect('mongodb+srv://freenafrancis2000:pxk7zr5wan7dpoOs@cluster0.e7dpoiw.mongodb.net/crudwithimage',)
  .then(() => {
    console.log("DB is connected");
  })
  .catch(err => {
    console.error("Connection error:", err);
  });

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Filename configuration
  }
});

// Initialize multer upload
const upload = multer({ storage: storage });

// POST method to create a new user
app.post('/users', upload.single('image'), async (req, res) => {
  try {
    const { name, place } = req.body;
    const image = req.file.filename; // Get the filename of the uploaded image
    const newUser = new userModel({ name, place, image });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
    console.log(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get('/getuser', async (req, res) => {
    try {
      const users = await userModel.find();
      res.json(users); // Send the fetched users as a response
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.put('/update/:id',async(req,res)=>{
    try{
        const  id=req.params.id;
        const updateUser=await userModel.findByIdAndUpdate({_id:id});
        console.log(updateUser);

    }
    catch(err){
        console.log(err);
    }
  })
  
  app.delete('/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const deleteUser=await  userModel.findByIdAndDelete(id);
        console.log(deleteUser);
    }
    catch(err){
        console.log(err);
    }
    
  })
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
