const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyparser.urlencoded({extended : true}));
const publicpath = path.join(__dirname, 'public');
app.use(express.static(publicpath));

// Middleware to parse incoming request bodies
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json())

// -----------
// data storage javascript part - not a part of routing

let userName ; // variable to store username and userEmail upon login
let userEmail ;
let userOrder; // variable to store user Order


function sendEmail1(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "dheerendrapratapsingh1509@gmail.com",
        Password : "ECF23215F819034DB816FBC02BB5CCC245A9",
        To : userEmail, // Use the recipientEmail variable here
        From : "dheerendrapratapsingh1509@gmail.com",
        Subject : "Your OTP", // Change this subject as per your requirement
        Body : `Your order is - ${userOrder}` // Change the body as per your requirement
    }).then(
        (message) => {
            console.log(message);
            alert(message);
        }

    );
}




// -----------

const templatePath = path.join(__dirname, '/templates')

app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.static(templatePath))
console.log(templatePath);


app.get('/index', (req, res)=>{
    res.render('index');
})

app.get('/orderPlaced', (req, res)=>{
    res.render('orderPlaced');
})

// // Route to handle data submission from page1
// app.post('/submit-data', (req, res) => {
//     const data = req.body.data;
//     // Redirect to page2 with data in query string
//     res.redirect(`/page2?data=${encodeURIComponent(data)}`);
// });

// --- checkOut button

// const express = require('express');
const mongoose = require('mongoose');
// const Order = require('./order');

// const app = express();

// Connect to MongoDB
let url = 'mongodb+srv://COURA:user123@cluster0.s01nmdy.mongodb.net/LoginAndSignup?retryWrites=true&w=majority&appName=Cluster0';
// mongoose.connect("mongodb://localhost:27017/LoginAndSignup")
mongoose.connect(url)
.then(() => {
    console.log("Mongodb connected");
})
.catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route related to form element
app.post('/checkout', async (req, res) => {
    try {
        const { dataField } = req.body;
        const items = JSON.parse(dataField); // Parse the JSON string to extract the items array
        console.log(items);


    userOrder = items ;
    console.log("Your order is: "); 
    console.log(userOrder);
    // sendEmail1();

        // Save the order with the extracted items
        const order = new Order({ items });
        await order.save();

        // Send a response to the client
        res.redirect('orderPlaced');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// ---------

// placeOrder page - WORKING

// Server-side JavaScript (Node.js with Express and MongoDB)



// MongoDB setup
const Order = mongoose.model('Order', {
    orderId: String,
    customerName: String,
    orderDate: Date,
    gmail: String,
    items: Array,
    shop: String
});


// Endpoint to save order
app.post('/saveOrder', (req, res) => {
    const orderData = req.body;

    // Create new order document
    const newOrder = new Order({
        orderId: orderData.orderId,
        customerName: orderData.customerName,
        orderDate: orderData.orderDate,
        gmail: orderData.gmail,
        items: orderData.items, // Assuming items are collected elsewhere
        shop: orderData.shop
    });
    // Save order to MongoDB
    newOrder.save()
        .then(() => {
            res.status(302); // Redirect to orderPlaced.html with status code 302 (Temporary Redirect)
        })
        .catch(error => {
            console.error('Error saving order:', error);
            res.sendStatus(500); // Send error response
        });
});

// ------

// to render 'css' 
// app.use(express.static('public', { // Assuming your CSS files are in the 'templates' directory
// setHeaders: (res, path, stat) => {
//     if (path.endsWith('.css')) {
//         res.setHeader('Content-Type', 'text/css');
//     }
// }
// }));






// Login and Signup part


// const express = require("express")
// const path = require("path")
// const app = express()
const hbs = require("hbs")
const port = process.env.PORT || 4000

// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/LoginAndSignup")
// .then(() => {
//     console.log("Mongodb connected");
// })
// .catch((error) => {
//     console.error("Failed to connect to MongoDB:", error);
// });

// const LoginSchema=new mongoose.Schema({//to define what your document will look like
//     name:{
//         type:String,
//         required: true
//     },
//     password:{
//         type:String,
//         required: true
//     }
// })

const loginSchema = new mongoose.Schema({
    email: {
      type: String,
    //   required: true,
    //   unique: true, // Ensure email addresses are unique
    //   trim: true, // Trim whitespace from the beginning and end of the email
      lowercase: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true
      // You may want to add more validation for password strength
    }
  });


// // Define the schema
// const placeOrderSchema = new mongoose.Schema({
//     orderId: {
//       type: String,
//       required: true
//     },
//     customerName: {
//       type: String,
//       required: true
//     },
//     orderDate: {
//       type: Date,
//       default: Date.now
//     },
//     gmail: {
//       type: String,
//       required: true
//     }
//   });

// // Define a schema for the miscellaneous collection
// const MiscellaneousSchema = new mongoose.Schema({
//     // Define properties with the Mixed type to allow storing any type of data
//     data: mongoose.SchemaTypes.Mixed
// });


// const collection= new mongoose.model("users", LoginSchema);
const collection= new mongoose.model("users", loginSchema);
// const order = new mongoose.model("orders",placeOrderSchema );
// const miscellaneous = new mongoose.model("miscellaneou", MiscellaneousSchema );

// mongoDB file

// const bodyParser = require('body-parser');
// const { log } = require("console")


// hbs.registerPartials(partialPath)

app.get('/', (req, res) => {
    res.render('dummylogin')
})
app.get('/login', (req, res) => {
    res.render('dummylogin')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})



// // working code
// // Route handler for GET request to fetch products
// app.get('/products', (req, res) => {
// res.render('data');// data is the 'hbs' page on which our data is saved . one rendering it we are getting a submit
// // button which sends data to 'post products'
//   })

// app.get('/placeOrder', (req, res)=>{
//     res.render('placeOrder');
// })
  
//   // Route handler for POST request to receive data from the client
//   app.post('/products', async (req, res) => {
//     const receivedData = req.body;
//     try {
//       // Create a new document using the order model
//       const newOrder = new order(receivedData);
      
//       // Save the new document to MongoDB
//       await newOrder.save();
      
//       console.log('Data saved successfully:', receivedData);
//       res.send('Data received and saved successfully!');
//     } catch (error) {
//         console.log(req.body);
//       console.error('Error saving data:', error);
//       res.status(500).send('Internal server error');
//     }
//   });
  
  

// --------
// forgot password

// Route to handle forgot password request
app.post('/forgotpassword', async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      // Find user by email
      const temp = await collection.find();
      console.log(temp);


      const user = await collection.find({ email }).limit(1);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate salt and hash the new password
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


app.get('/setNewPassword', (req, res)=>{
    res.render('setNewPassword');
})


// --------


app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password, 
        email: req.body.email // Hash the password before storing
    };
    userName=req.body.name;
    userEmail = req.body.email;
    console.log(userName+" "+userEmail);

    console.log(data['name']);
    console.log(data['password']);
    console.log(data['email']);

    try {
        const existingUser = await collection.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(409).send("User already exists"); // Use a specific status code for conflicts
            return;
        }

        await collection.insertMany(data); // Use insertOne instead of insertMany for single documents
        res.status(201).render("index", { naming: req.body.name });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal server error"); // More informative error message
    }
});


app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name })

    userName=check.name;
    userEmail = check.email;
    console.log(userName+" "+userEmail);
        if (check.password === req.body.password) {
            res.status(201).render("index", { naming: `${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {
        console.log(e);

        res.send("wrong details")
        

    }


})

// // working code
// // Route to fetch user history for a particular email
// app.get('/userhistory/:gmail', async (req, res) => {
//     try {
//       // Get the gmail parameter from the request URL
//       const gmail = req.params.gmail;
//       // Find the user documents in the collection based on the gmail
//       const user = await order.find({ gmail: gmail }, { _id: 0, __v: 0 });
    
//       console.log(gmail);
//       console.log(user);
      
//       if (!user || user.length === 0) {
//         // If no user data is found, return a message indicating no user history
//         return res.render('dummyUser-History', { userHistory: [], message: 'No user history found' });
//       }
  
//       // Render the template with the user history data
//       res.render('dummyUser-History', { userHistory: user });
//     } catch (error) {
//       console.error('Error fetching user history:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });



// Catch-all route for handling other paths
app.get('*', (req, res) => {
    // res.status(404).render('error');
    res.render('error');
});


// app.listen(port, () => {
//     console.log('port connected ');
//     console.log('port running at localhost:3000');
// })


// ----------

app.listen(3000, ()=>{
    console.log("App running on port number 3000");
})
