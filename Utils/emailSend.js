const nodemailer = require('nodemailer')
const AppError = require('./appError')

const sendEmail = async (options) => {
	// Configure the email transporter
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	})

	// Define email options
	const mailOptions = {
		from: process.env.EMAIL_USERNAME,
		to: options.email,
		subject: options.subject,
		text: options.message,
	}

	// Send the email and handle errors
	try {
		await transporter.sendMail(mailOptions)
	} catch (error) {
		// Throw an AppError if the email fails to send
		throw new AppError(error.message, 400)
	}
}

module.exports = sendEmail
