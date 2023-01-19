import React, { useEffect, useState } from "react";
import milk from "./images/milk.jpg";
import { useParams, useNavigate } from "react-router-dom";
const port = 5001;


function NewItem() {
    const [form, setForm] = useState({
        itemName: "",
        description: "",
    });
    const navigate = useNavigate();
    
    
    function updateForm(value) {
        setForm((prev) => {
            return { ...prev, ...value};
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const newItem =  {...form};

        await fetch("http://localhost:"+port+"/items/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        setForm({ itemName: "", description: "" });
        navigate("/items");
    }

    return (
        <div className="container">
            <h3>Create New Item</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Item Name: </label>
                    <input type="text" required className="form-control" value={form.itemName} onChange={(e) => updateForm({ itemName: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Item Description: </label>
                    <input type="text" required className="form-control" value={form.description} onChange={(e) => updateForm({ description: e.target.value })} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Item" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default NewItem;