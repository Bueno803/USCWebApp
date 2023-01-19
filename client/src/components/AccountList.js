import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const port = 5001;

const Account = (props) => (
	<tr>
		<td>{props.account.first_name}</td>
		<td>{props.account.last_name}</td>
		<td>{props.account.email}</td>
	</tr>
);
 
function AccountList() {
	const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("http://localhost:"+port +"/accounts/");

			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}

		const items = await response.json();
		setAccounts(items);
	}
	
	fetchData();
	return;
	}, [accounts.length]);

	function accountList() {
		return accounts.map((currentAccount, i) => {
			return <Account account={currentAccount} key={i} />;
		});
	}

	return (
		<div>
			<h3>Account List</h3>
			<table className="table table-striped" style={{ marginTop: 20 }}>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				{accountList()}
			</tbody>
			</table>
		</div>
	);
};

export default AccountList;