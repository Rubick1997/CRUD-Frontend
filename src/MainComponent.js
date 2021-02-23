import React, { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const [userList, setUserList] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3001/read").then((response) => {
			console.log(response.data);
			setUserList(response.data);
		});
	}, []);

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
			<h1>Users List</h1>
			{userList && (
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>First Name</th>
							<th scope='col'>Last Name</th>
							<th scope='col'>Email</th>
						</tr>
					</thead>
					<tbody>
						{userList.map((user) => (
							<tr key={user.id}>
								<td>{user.userName}</td>
								<td>{user.userLastName}</td>
								<td>{user.userEmail}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};
export default Main;
