const express = require('express');
const db = require('../db');
const projectRouter = express.Router();

function executeQuery(statement){
    return new Promise((resolve, reject) => {
        db.query(statement,(error, data)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        });
    });
};

// register user api
projectRouter.post('/register', async(request, response)=>{
    try{
        const { name, mobno, email, password } = request.body;
        if(email === undefined)
            email = null;
        var statement = `select id from users where mobno = '${mobno}'`;
        var data = await executeQuery(statement);
       
        if(data.length !== 0){
            response.status(400).send('This mobile number is aleady registered.');
            return;
        }

        statement = `select id, name from global where mobno = '${mobno}'`;
        data = await executeQuery(statement);

        if(data.length === 0){
            statement = `insert into global values(default, '${name}', '${mobno}', default)`;
            await executeQuery(statement);
        }

        statement = `insert into users values(default, '${name}', '${mobno}', '${email}', '${password}')`;
        data = await executeQuery(statement);
        if(data.insertId){
            response.status(200).send("User registered successfully.");
        }else{
            response.status(400).send("Something went wrong");
        }
    }
    catch(error){
        response.status(400).send(error);
    }
});

// login api
projectRouter.post('/login', async(request, response) => {
    try{
        const { mobno, password } = request.body;
        var statement = `select id, password from users where mobno = '${mobno}'`;
        var data = await executeQuery(statement);

        var isPasswordValid = (password === data[0].password);
        if(isPasswordValid){
            response.status(200).send({"user_id": data[0].id, "message": "Logged In"});
        }else{
            response.status(400).send("something went wrong");
        }
    }catch(error){
        response.status(400).send(error);
    }
});


// Get data api
projectRouter.post('/getdata', async(request, response) => {
    try{
        const { user_id } = request.body;
        var statement = `select mobno from users where id = ${user_id}`;
        var data = await executeQuery(statement);
        var mobile = data[0].mobno;


        statement = `select g.id, g.name, g.mobno, g.spam_count from incontact i, global g 
                where i.global_id = g.id and i.user_id = ${user_id};`;
        data = await executeQuery(statement);

        
        if(data.length === 0){
            response.status(200).send({"message": "Contacts not found"});
        }else{
            console.log(data);
            response.status(200).send(data);
        }

    }catch(error){
        response.status(400).send({"error": error});
    }
});


// api to mark as spam
projectRouter.post('/markspam', async(request, response) => {
    try{
        const { id } = request.body;
        console.log(id);
        var statement = `update global set spam_count = spam_count + 1 
        where id = ${id}`;
        var data = await executeQuery(statement);

        if(data.affectedRows !== 1){
            response.status(400).send("Something went wrong");
        }else{
            response.status(200).send("Reported Spam.");
        }
    }catch(error){
        response.status(400).send(error);
    }
});

// api to search by name
projectRouter.post('/searchbyname', async(request, response) => {
    try{
        const { nameregex } = request.body;
        console.log(nameregex);

        var statement = `select id, name, mobno, email from users where mobno = '${nameregex}'` 
        var data = await executeQuery(statement);
        if(data.length == 0){
            var statement = `select id, name, mobno, spam_count from global where lower(name) 
            like '${nameregex}%' OR lower(name) like '%${nameregex}' OR lower(name) like '%${nameregex}%' OR mobno like '${nameregex}'`;
            data = await executeQuery(statement);  
        }else{
            var statement = `select id, spam_count from global where name = '${data[0].name}' AND  mobno = '${data[0].mobno}'` 
            var data1 = await executeQuery(statement);
            data[0].id = data1[0].id;
            data[0].spam_count = data1[0].spam_count;
        }

        if(data.length === 0){
            response.status(400).send("Data not found");
        }else{
            response.status(200).send(data);
        }
    }catch(error){
        response.status(400).send({"error": error});
    }
});







module.exports = projectRouter;