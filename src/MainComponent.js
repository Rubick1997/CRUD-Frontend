import React, { useState } from "react";
import axios from "axios";

const Main = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const addToDataBase = () => {
		axios.post("http://localhost:3001/insert", {
			firstName: firstName,
			lastName: lastName,
			email: email,
		});
	};

	return (
		<div className='App'>
			<h1>Save User App</h1>
			<label>First Name</label>
			<input
				type='text'
				placeholder='First Name'
				onChange={(event) => setFirstName(event.target.value)}
			/>
			<label>Last Name</label>
			<input
				type='text'
				placeholder='Last Name'
				onChange={(event) => setLastName(event.target.value)}
			/>
			<label>Email</label>
			<input
				type='email'
				placeholder='Email'
				onChange={(event) => setEmail(event.target.value)}
			/>
			<button onClick={addToDataBase}>Add to database</button>
		</div>
	);
};
export default Main;
