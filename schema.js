require('dotenv').config();
const mysql = require('mysql2'),
      fs = require('fs'),
      dropDb = fs.readFileSync('db/dropDatabase.sql', 'utf8'),
      createDb = fs.readFileSync('db/createDatabase.sql', 'utf8');

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME
});

const useDb = `USE ecommerce_db;`;

// Drop database
connection.query(dropDb, (err) => {
  if (err) {
    console.error(err);
    connection.end();
  } else {
    console.log('Database dropped successfully!');

    // Create database
    connection.query(createDb, (err) => {
      if (err) {
        console.error(err);
        connection.end();
      } else {
        console.log('Database created successfully!');

        // Select database
        connection.query(useDb, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Database selected successfully!');

            // Import schema
            const schema = fs.readFileSync('db/schema.sql', 'utf8');
            connection.query(schema, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Schema imported successfully!');
              }
              connection.end();
            });
          }
        });
      }
    });
  }
});