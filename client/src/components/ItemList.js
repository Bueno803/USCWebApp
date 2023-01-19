import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const port = 5001;

function fileNameToSource(fileName) {
	return "./images/" + fileName;
}


const Item = (props) => (
	<tr>
		<td>{props.item.itemName}</td>
		<td>{props.item.description}</td>
		<td><img src={fileNameToSource(props.item.image)}></img></td>
	</tr>
);

function ItemList() {
	const navigate = useNavigate();
	const [items, setItems] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("http://localhost:" + port + "/items/");

			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}
			
			const items = await response.json();
		setItems(items);
	}
	
	fetchData();
	return;
	}, [items.length]);


	function itemList() {
		return items.map((currentItem, i) => {
			return <Item item={currentItem} key={i} />;
		});
	}


	return (
		<div>
			<h3>Item List</h3>
			<table className="table table-striped" style={{ marginTop: 20 }}>
			<thead>
				<tr>
					<th>Item Name</th>
					<th>Description</th>
					<th>Image</th>
				</tr>
			</thead>
			<tbody>
				{itemList()}
			</tbody>
			</table>
			<button className="add_Button" onClick={() => navigate("/newItem")}>Add Custom Item</button>
		</div>
		
	);
};

export default ItemList;