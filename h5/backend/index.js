const express = require("express");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY, latitude FLOAT, longitude FLOAT)");

    db.run("INSERT INTO locations (latitude, longitude) VALUES (?, ?)", [37.7749, -122.4194]);
    db.run("INSERT INTO locations (latitude, longitude) VALUES (?, ?)", [34.0522, -118.2437]);
    db.run("INSERT INTO locations (latitude, longitude) VALUES (?, ?)", [40.7128, -74.0060]);

});
app.use(express.json());
app.use("/api/locations", router);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

router.get('/', (req, res) => {
    db.all("SELECT * FROM locations", [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

function shutDown() {
    db.close();
    console.log('Closed database connection');
    process.exit();
}

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);