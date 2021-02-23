import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";

const Main = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [newUserEmail, setNewUserEmail] = useState("");
	const [userList, setUserList] = useState([]);
	const [profilePicture, setProfilePicture] = useState("");

	useEffect(() => {
		axios.get("http://localhost:3001/read").then((response) => {
			console.log(response.data);
			setUserList(response.data);
		});
	}, [userList]);

	const addToDataBase = () => {
		axios.post("http://localhost:3001/insert", {
			firstName: firstName,
			lastName: lastName,
			email: email,
			imageUri: profilePicture,
		});
		setFirstName("");
		setLastName("");
		setEmail("");
		setProfilePicture("");
	};

	const updateItem = (id) => {
		axios.put("http://localhost:3001/update", {
			id: id,
			newUserEmail: newUserEmail,
		});
	};

	const deleteUser = (id) => {
		axios.delete(`http://localhost:3001/delete/${id}`);
	};

	return (
		<div className='App'>
			<h1>Save User App</h1>
			<label>Profile Picture</label>
			<input
				type='text'
				placeholder='Image Uri'
				onChange={(event) => setProfilePicture(event.target.value)}
			/>
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
			<br />
			<Button color='primary' onClick={addToDataBase}>
				Add to database
			</Button>
			<h1>Users List</h1>
			{userList.length > 0 && (
				<Table>
					<thead>
						<tr>
							<th>Profile Picture</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
						</tr>
					</thead>
					{userList.map((user) => (
						<tbody key={user.id}>
							<tr>
								<th scope='row'>
									<img
										style={{
											width: "50px",
											height: "50px",
										}}
										src={user.imageUri}
										alt={user.userName + `profile picture`}
										className='img-thumbnail'
									/>
								</th>
								<td>{user.userName}</td>
								<td>{user.userLastName}</td>
								<td>{user.userEmail}</td>
								<Button
									onClick={() => {
										deleteUser(user._id);
									}}
									color='danger'>
									Delete
								</Button>
							</tr>
							<tr>
								<th scope='row'></th>
								<td></td>
								<td>
									<input
										type='text'
										placeholder='Email'
										onChange={(event) => setNewUserEmail(event.target.value)}
									/>
									<Button
										outline
										color='info'
										onClick={() => updateItem(user._id)}>
										Update
									</Button>
								</td>
							</tr>
						</tbody>
					))}
				</Table>
			)}
		</div>
	);
};
export default Main;
