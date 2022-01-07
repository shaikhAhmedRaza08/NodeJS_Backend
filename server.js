const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const env = require('./env');
// const port = 3001;
// const connectionString = 'postgres://postgres:winworld@1@localhost:5432/MyDataBase'
const client = new Client({
    connectionString: env.connectionString
})

app.use(cors());
app.use(bodyParser.json());

// const employee = [
//     { id: 1, name: "Ahmed Raza" },
//     { id: 2, name: 'Ibrahim' },
//     { id: 3, name: "Faiz" },
//     { id: 4, name: "Zakir" }
// ]

client.connect();

// client.query(`SELECT * from employee."employee"`, (err, res) => {
//     console.log(err, res)
//     client.end;
// })




// app.get('/', (req, res) => {
//     console.log('Startinng endpoint');
//     res.send('<h1>Hello World</h1>');
// })


app.get('/employee', (req, response) => {
    // res.send(JSON.parse(JSON.stringify(employee)));
    client.query(`SELECT * from employee."employeeTable"`, (err, res) => {
        if (!err) {
            return response.send(res.rows);
        } else {
            console.log(res.err);
        }
        client.end;
    })
})

app.get('/event', (req, res) => {
    res.send('Data got')
})

app.put('/employee/:id', (req, res) => {
    // console.log("Request Parameters: ", req.params);
    const { id } = req.params;
    const { name } = req.body;
    // console.log(id, name);
    // const employeeObj = employee.find((obj) => obj.id === Number(id));
    // const newEmpList = employee.map(obj => {
    //     if (obj.id === Number(id)) {
    //         obj.name = name;
    //     }
    //     return obj;
    // });
    console.log(id, name)
    client.query(`UPDATE employee."employeeTable" SET name = '${name}' WHERE id = ${id}`);
    res.send(`Data at Id ${id} is updated successfully`);
})

app.delete('/employee/:id', (req, res) => {
    const { id } = req.params;
    // const newList = employee.filter(emp => emp.id !== Number(id));
    client.query(`DELETE FROM employee."employeeTable" WHERE id = ${id}`);

    res.send(`Data with Id ${id} deleted successfully.`);

})

app.post('/employee/post', (req, res) => {
    console.log("Request Body", req.body);
    const { name } = req.body;
    console.log("Name: ", name)
    client.query(`INSERT INTO employee."employeeTable"(name) VALUES ($1)`, [name])
    // res.send('Data Added')


    // employee.push(req.body);
    // res.send(employee);
})

app.listen(env.port, () => {
    console.log("Server started at port ", env.port);
})