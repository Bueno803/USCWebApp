const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/accounts"))
app.use(require("./routes/items"))
app.use(require("./routes/lists"))

const dbo = require("./db/conn");

app.listen(port, () => {
	// perform a database connection when server starts
	dbo.connectToServer(function (err) {
		if (err) console.error(err);
			console.log("")
		});
	
	console.log(`Server is running on port: ${port}`);
});