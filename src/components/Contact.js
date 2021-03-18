import React from "react";
import axios from "axios";
import "./Contact.css";

const API_PATH = "/api/SendEmail.php";

const Contact = () => {
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [subject, setSubject] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [error, setError] = React.useState("");
	const [mailSent, setMailSent] = React.useState(false);

	const checkInputFields = () => {
		if (!name) return "Please enter your name.";
		else if (!email || !email.includes("@") || !email.includes(".")) return "Please enter a valid e-mail address.";
		else if (!subject) return "Please enter a subject.";
		else if (!message) return "Please enter a message.";
		return "";
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		const result = checkInputFields();
		setError(result);
		if (result) return;

		axios({
			method: "post",
			url: `${API_PATH}`,
			headers: { "content-type": "application/json" },
			data: { name: name, email: email, subject: subject, message: message },
		}).then((result) => {
			setMailSent(true);
		});
	};

	const contactStatus = () => {
		if (mailSent) {
			return (
				<div className="message-sent">
					<h3>Thank you for reaching out!</h3>
					<br /> We'll get back to you as soon as possible.
				</div>
			);
		} else {
			return (
				<form action="" method="post">
					<input type="text" placeholder="Full Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
					<input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
					<textarea rows="6" placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
					<input type="submit" onClick={(e) => handleFormSubmit(e)} value="Send Message" />
				</form>
			);
		}
	};

	return (
		<div className="contact rotate-in">
			<div className="contact-form">
				<div className="content copy-format">
					<h2>Get in touch!</h2>
					<h4>To: Stefan and Maia</h4>
					<br />
					<div className={error === "" ? "status" : "status form-error"}>{error}</div>

					{contactStatus()}
				</div>
			</div>
		</div>
	);
};

export default Contact;
