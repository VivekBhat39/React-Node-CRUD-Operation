let express = require('express');
var cors = require('cors')
var mysql = require('mysql');
const bodyParser = require('body-parser');
let app = express();

app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodeapi"
});

con.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});

app.get("/", (req, res) => {
    res.send("Welcome to Node.JS")
});

app.get("/users", (req, res) => {

    let sql = "SELECT * FROM users";

    con.query(sql, (err, result) => {
        if (err) {
            console.log("ERROR : " + err);
            res.end("ERROR")
        } else {
            // console.log(result);
            res.send(result)
        }
    })
});

app.get("/users/:id", (req, res) => {
    let userId = req.params.id
    let sql = "SELECT * FROM users WHERE id =" + userId;

    con.query(sql, userId, (err, result) => {
        if (err) {
            console.log("Query Error : ", err);
            res.end("error")
        }
        res.send(result)
    })

});

app.post("/users", (req, res) => {
    let body = req.body;
    console.log(body);

    let sql = "INSERT INTO USERS (name, email, mobile, password)"
    sql += "VALUES('" + body.name + "','" + body.email + "','" + body.mobile + "','" + body.password + "')"

    con.query(sql, (err, result) => {
        if (err) {
            console.log("Query Error : ", err);
            res.end("error")
        }
        res.end(JSON.stringify(result))

    });

});

app.put("/users/:id", (req, res) => {

    let userId = req.params.id
    let body = req.body;
    // console.log(userId, body);


    let sql = `UPDATE users
           SET name = '${body.name}', email = '${body.email}', mobile = '${body.mobile}', password = '${body.password}'
           WHERE id = ${userId};`;

    // console.log(sql);
    con.query(sql, [userId], (err, result) => {
        if (err) {
            console.log("Query ERROR : " + err);
            res.send("Query Error")
        }
        res.send("Single Record Update")
    })


});

app.delete("/users/:id", (req, res) => {

    let userId = req.params.id;
    console.log(userId);
    let sql = "DELETE FROM users WHERE id =" + userId;

    con.query(sql, [userId], (error, results) => {
        if (error) {
            console.error("Error deleting record:", error);
            return res.send("Error deleting record");
        }
        res.send("Record deleted successfully");
    });
});

app.listen(8080, () => {
    console.log("Server Running on http://localhost:8080");
});

