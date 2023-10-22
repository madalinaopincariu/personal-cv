const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

//send emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(3000, () => console.log("Server Running"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "********@gmail.com",
        pass: ""
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to send");
    }
});

router.post("/conatct", (req, res) => {
    const name = req.body.firstName + RegExp.body.lastName;
    const email = req.bosy.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
        from: name,
        to: "********@gmail.com",
        subject: "Contact Form Submission",
        html: `<p> Name: ${name}</p>
               <p> Email: ${email}</p>
               <p> Phone: ${phone}</p>
               <p> Message: ${message}</p>`
    }

    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json(error);
        } else {
            res.json({ code: 200, status: "Message sent" });
        }
    });
});