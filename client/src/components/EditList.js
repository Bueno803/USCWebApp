import React, { useEffect, useState } from "react";
import milk from "./images/milk.jpg";
import { useParams, useNavigate, resolvePath } from "react-router-dom";
const port = 5001;

function EditList() {
	const [items, setItems] = useState([]);
	const [listName, setListName] = useState("");
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("http://localhost:" + port + "/lists/" + params.id.toString() + "/items");

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

	
	const ListName = () => {
		fetch("http://localhost:"+port+"/lists/"+params.id.toString(), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setListName(data.listName);
			}
		);
	}

	const ChangeListName = (name) => {
		fetch("http://localhost:"+port+"/lists/"+params.id.toString()+"/name", {	
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ listName: name, listItems: items}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			}
		);
	}


	const AddItemToList = (itemId) => {
		fetch("http://localhost:"+port+"/lists/" + params.id.toString() + "/additem", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ itemId: itemId }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			}
		);
		
		// rerender the list to show the new item
		window.location.reload(); // This is a hack, but it works TODO: fix this
	};

	const RemoveItemFromList = (itemId) => {
		fetch("http://localhost:"+port+"/lists/" + params.id.toString() + "/deleteItem", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ itemId: itemId }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			}
		);
		// rerender the list to show the new item
		window.location.reload(); // This is a hack, but it works TODO: fix this
	};

	const Item = (props) => (
		<tr>
			<td>{props.item.itemName}</td>
			<td>{props.item.description}</td>
			<td><img src={milk} width="60"></img></td>
			<td><button onClick={() => RemoveItemFromList(props.item._id)}>Delete</button></td>
		</tr>
	);



	const SearchItem = (props) => (
		// if this table is clicked on, add the item to the list
		<tr onClick={() => AddItemToList(props.item._id)}>
			<td>{props.item.itemName}</td>
			<td>{props.item.description}</td>
			<td><img src={milk} width="60"></img></td>
		</tr>
	);
	

	
	const GetSearchItems = () => {
		const [searchitems, setSearchItems] = useState([]);
		useEffect(() => {
			const fetchSearchItems = async () => {
				const response = await fetch("http://localhost:" + port + "/items/");
				if (!response.ok) {
					const message = `An error occurred: ${response.statusText}`;
					window.alert(message);
					return;
				}
	
				const searchitems = await response.json();
				setSearchItems(searchitems);
				setFoundItems(searchitems);
			};
			fetchSearchItems();
		}, []);
	
		function searchItemList() {
			return foundItems.map((currentitem) => {
				return <SearchItem item={currentitem} key={currentitem._id} />;
			});
		}
		
		// the value of the search field 
		const [searchTerm, setSearchTerm] = useState('');

		// the search result
		const [foundItems, setFoundItems] = useState(searchitems);
	

		const Filter = (e) => {
		const keyword = e.target.value;
		if (keyword !== '') {
			const results = searchitems.filter((item) => {
			return item.itemName.toLowerCase().startsWith(keyword.toLowerCase());
			// Use the toLowerCase() method to make it case-insensitive
			});
			setFoundItems(results);
		} else {
			setFoundItems(searchitems);
			// If the text field is empty, show all items
		}
	
		setSearchTerm(keyword);
		};
		
	
		return (
			<div className="itemWrapper">
				<div className="itemList">
					<h3>Search Items</h3>
					<input type="text" placeholder="Search" value={searchTerm} onChange={Filter} />
			</div>
			
			<button className="add_Button" onClick={() => navigate("/newItem")}>Add Custom Item</button>
			<table className="table table-striped table-hover" style={{ marginTop: 20 }}>
				<thead>
					<tr>
						<th>Item Name</th>
						<th>Description</th>
						<th>Image</th>
					</tr>
				</thead>
				<tbody>
					{searchItemList()}
				</tbody>
			</table>
			</div>
		);
	};

	return (
		<div>
			<div className="tableWrapper">
				<div className="listName">
					{ListName()} 
					<input type="text" placeholder={listName} onChange={(e) => ChangeListName(e.target.value)} />
				</div>
				<table className="table table-striped" style={{ marginTop: 20 }}>
				<thead>
					<tr>
						<th>Item Name</th>
						<th>Description</th>
						<th>Image</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{itemList()}
				</tbody>
				</table>
			</div>
			<div className="searchWrapper">
				{GetSearchItems()}
			</div>
		</div>

	);
};

export default EditList;