const sendEmail = require('./emailSend')

const BASE_URL = process.env.REACT_APP_BASEURL || 'http://127.0.0.1:3000'

const registerUserEmail = async (firstName, lastName, email) => {
	const message = `
        Hey ${firstName} ${lastName},
        
        You have successfully registered in our Bloodbank App :)
        
        Thanks a lot for registering into our application. Safe blood is essential for helping people of all ages who suffer from diseases, disasters, and accidents. Your donation saves lives and makes our community safe. Blood is always needed to save lives and treat people. Show your solidarity to the community and contribute with regular blood donations!
        
        You can now log in here:${BASE_URL}/user/login/user
    `

	try {
		await sendEmail({
			email: email,
			subject: 'You have successfully registered into Bloodbank Application',
			message,
		})
	} catch (error) {
		console.error(`Failed to send registration email to user: ${error.message}`)
	}
}

const registerBloodbankEmail = async (bloodbankName, email, password) => {
	const message = `
        Hey ${bloodbankName},
        
        Welcome to our domain!
        
        Your email: ${email}
        Your password: ${password}
        
        You can now log in here: ${BASE_URL}/bloodbank/login/bloodbank
    `

	try {
		await sendEmail({
			email: email,
			subject: 'You have successfully registered into Bloodbank Application',
			message,
		})
	} catch (error) {
		console.error(`Failed to send registration email to bloodbank: ${error.message}`)
	}
}

const forgotPasswordEmail = async (resetToken, email) => {
	const resetURL = `${BASE_URL}/resetpassword/${resetToken}/user`
	const message = `
        You requested a password reset. Please use the following link to reset your password:
        
        ${resetURL}
        
        This link is valid for only 10 minutes.
    `

	try {
		await sendEmail({
			email: email,
			subject: 'Your password reset token (valid for only 10 minutes)',
			message,
		})
	} catch (error) {
		console.error(`Failed to send password reset email: ${error.message}`)
	}
}

module.exports = {
	registerUserEmail,
	registerBloodbankEmail,
	forgotPasswordEmail,
}
