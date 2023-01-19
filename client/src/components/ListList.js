import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import milk from "./images/milk.jpg";
const port = 5001;

const List = (props) => (
	<div className= "listPreview">
		<Link to={`/EditList/${props.list._id}`}>
			<div className= "listImage">
					<img src = {milk} alt = "list" height={100}></img>
				</div>
			<div className= "listInfo">
				<h2>{props.list.listName}</h2>
			</div>
		</Link>
	</div>
);

//todo take user id as a parameter

function ListList () {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:" + port +"/lists/"); //todo update to fetch only lists for the current user
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const lists = await response.json();
            setLists(lists);
        }
        fetchData();
        return;
    }, [lists.length]);

	const RemoveListFromList = (itemId) => {
		fetch("http://localhost:"+port+"/lists/"+itemId + "/delete", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setLists(lists.filter((list) => list._id !== itemId));
			}
		);
	};

    function listList() {
        return lists.map((currentList, i) => {
            return (
			<div className="listPreviewWrapper">
				<List list={currentList} key={i} />
				<button onClick={() => RemoveListFromList(currentList._id)}>Delete</button>
			</div>
			);
		});
    }

	const AddList = () => {
		fetch("http://localhost:"+port+"/lists/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ listName: "New List" , listItems: []}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			}
		);
			
		// rerender the list to show the new list
		window.location.reload(); // This is a hack, but it works TODO: fix this
	};

    return (
        <div className = "listGallery">
			{listList()}
			<button className="add_Button" onClick={AddList}>Add List</button>
        </div>
    );
};

export default ListList;