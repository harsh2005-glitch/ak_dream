// /server/controllers/contactController.js

const nodemailer = require('nodemailer');

// @desc    Send email from contact form
// @route   POST /api/contact
// @access  Public
exports.sendContactEmail = async (req, res) => {
    // 1. Destructure the form data from the request body
    const { name, email, subject, message } = req.body;

    // 2. Simple validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    // 3. Create a "transporter" object using your email service credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use 'gmail'
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail email from .env
            pass: process.env.EMAIL_PASS, // Your Gmail App Password from .env
        },
    });

    // 4. Define the email options
    const mailOptions = {
        from: `"${name}" <${email}>`, // Shows the sender's name and email in your inbox
        to: process.env.EMAIL_USER,    // The email address that will RECEIVE the messages
        subject: `New Contact Form Submission: ${subject}`, // Subject line
        html: `
            <h2>New Inquiry from Website Contact Form</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr>
            <h3>Message:</h3>
            <p>${message}</p>
        `,
    };

    // 5. Try to send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Thank you! Your message has been sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Sorry, something went wrong. Please try again later.' });
    }
};