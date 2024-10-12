/**
 * 
 * This file stores the backend API interface
 * 
 */

var databaseCON = require("./database");//Imported my database.js
var connection = databaseCON.getconnection();
connection.connect();//Use the connect() method to establish a connection with the MySQL database
var express = require('express');
var router = express.Router();


//This GET request is used by me to test whether the database is connected. It is not used in Assignment 2.
router.get("/fundraiser", (req, res) => {
    connection.query("SELECT * FROM fundraiser", (err, records, fields) => {
        if (err) {
            console.error("Failed to retrieve data from the 'fundraiser' table: ", err);//Return error
        } else {
            res.send(records); //Return all records in the funder table
        }
    });
});// test ok

//GET method: Retrieve all active fundraisers, including categories
router.get("/active", (req, res) => {
    connection.query(
        `SELECT FUNDRAISER.*, CATEGORY.NAME AS category_name
        FROM FUNDRAISER
        JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
        WHERE FUNDRAISER.ACTIVE = 1;`,(err, records,fields) => {
            if (err) {
                console.error("Failed to retrieve active fundraisers:", err);
            } else {
                res.send(records);// Send the active fundraisers
            }
        }
    );
});//ok

//GET method: Retrieve all categories
router.get("/categories", (req, res) => {
    connection.query("SELECT * FROM CATEGORY", (err, records,fields) => {
        if (err) {
            console.error("Failed to retrieve categories:", err);
        } else {
            res.send(records);// Send all categories
        }
    });
});


//GET method: Retrieve active fundraisers based on multiple filters
router.get("/search", (req, res) => {
    const { organizer, caption, target_funding, current_funding, city, category_name } = req.query;

    let query = `
        SELECT FUNDRAISER.*, CATEGORY.NAME AS category_name
        FROM FUNDRAISER
        JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
        WHERE FUNDRAISER.ACTIVE = 1`;
    
    const queryParams = [];//Use a JavaScript array to store search parameters.

    //Use if statements to implement multiple conditional searches
    if (organizer) {
        query += ` AND FUNDRAISER.ORGANIZER = ?`; 
        queryParams.push(organizer);
    }

    if (caption) {
        query += ` AND FUNDRAISER.CAPTION = ?`; 
        queryParams.push(caption);
    }

    if (target_funding) {
        query += ` AND FUNDRAISER.TARGET_FUNDING = ?`;
        queryParams.push(target_funding);
    }

    if (current_funding) {
        query += ` AND FUNDRAISER.CURRENT_FUNDING = ?`;
        queryParams.push(current_funding);
    }

    if (city) {
        query += ` AND FUNDRAISER.CITY = ?`;
        queryParams.push(city);
    }

    if (category_name) {
        query += ` AND CATEGORY.NAME = ?`;
        queryParams.push(category_name);
    }

    connection.query(query, queryParams, (err, records,fields) => {
        if (err) {
            console.error("Failed to search fundraisers:", err);
        } else {
            res.send(records);
        }
    });
});

//GET method: Search fundraiser details by ID
router.get("/:id", (req, res) => {
    connection.query(
        `SELECT FUNDRAISER.*, CATEGORY.NAME AS category_name
        FROM FUNDRAISER
        JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
        WHERE FUNDRAISER.FUNDRAISER_ID = `+ req.params.id,
        (err, records,fields) => {
            if (err) {
                console.error("Failed to retrieve fundraiser details:", err);
            } else {
                res.send(records);
            }
        }
    );
});

module.exports = router;//Export the router so it can be used in other modules.
// /////////////////////// New code //////////////////////////////////

// POST method: Insert a new fundraiser
router.post("/fundraiser", (req, res) => {
    const { organizer, caption, targetFunding, currentFunding, city, active, categoryId } = req.body;
    const query = "INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, [organizer, caption, targetFunding, currentFunding, city, active, categoryId], (err, result) => {
        if (err) {
            console.error("Failed to insert fundraiser:", err);
            res.status(500).send("Server error");
        } else {
            res.send({ message: "Fundraiser created successfully", fundraiserId: result.insertId });
        }
    });
});

// PUT method: Update an existing fundraiser
router.put("/fundraiser/:id", (req, res) => {
    const { organizer, caption, targetFunding, currentFunding, city, active, categoryId } = req.body;
    const query = "UPDATE FUNDRAISER SET ORGANIZER = ?, CAPTION = ?, TARGET_FUNDING = ?, CURRENT_FUNDING = ?, CITY = ?, ACTIVE = ?, CATEGORY_ID = ? WHERE FUNDRAISER_ID = ?";
    connection.query(query, [organizer, caption, targetFunding, currentFunding, city, active, categoryId, req.params.id], (err, result) => {
        if (err) {
            console.error("Failed to update fundraiser:", err);
            res.status(500).send("Server error");
        } else {
            res.send({ message: "Fundraiser updated successfully" });
        }
    });
});

// DELETE method: Delete an existing fundraiser
router.delete("/fundraiser/:id", (req, res) => {
    const query = "DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ? AND CURRENT_FUNDING = 0";
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error("Failed to delete fundraiser:", err);
            res.status(500).send("Server error");
        } else if (result.affectedRows === 0) {
            res.status(400).send("Cannot delete fundraiser with donations");
        } else {
            res.send({ message: "Fundraiser deleted successfully" });
        }
    });
});

// POST method: Insert a new donation for a nominated fundraiser
router.post("/donation", (req, res) => {
    const { amount, fundraiserId, donorName } = req.body;
    
    // 确保客户端提交了所有必要的信息
    if (!amount || !fundraiserId || !donorName) {
        return res.status(400).send("Missing required donation information");
    }

    const query = "INSERT INTO DONATION (amount, FUNDRAISER_ID, DONOR_NAME) VALUES (?, ?, ?)";
    connection.query(query, [amount, fundraiserId, donorName], (err, result) => {
        if (err) {
            console.error("Failed to insert donation:", err);
            res.status(500).send("Server error");
        } else {
            res.send({ message: "Donation created successfully", donationId: result.insertId });
        }
    });
});