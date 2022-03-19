require("dotenv").config();
const path = require("path");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

//Transporter
let transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS,
	},
});

/**
 * Function used to send a template email.
 *
 * @param {*} String templateName
 * @param {*} Object
 * @returns Nodemailer Info
 */
const SendTemplatedEmail = async (templateName, object) => {
	try {
		let htmlString = await ejs.renderFile(
			path.join(__dirname, "templates", templateName),
			object,
			{}
		);
		let info = await transporter.sendMail({
			from: object.from || `MYAPI <${process.env.EMAIL}>`,
			subject: object.subject || "",
			replyTo: object.replyTo || `MYAPI <${process.env.EMAIL}>`,
			to: object.to,
			html: htmlString,
		});
		return info;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	SendTemplatedEmail,
};
