# Coding_Assignment

#1. Firstly create React App.

## Node Module Installation
#2. Install Required Node Modules in assignment Folder.
  -npm install

## Database Creation
#3. Excute all sql queries from db.sql file. 
#4. Import Data from Global.csv file using  following command.

-LOAD DATA INFILE '/var/lib/mysql-files/global data.csv' INTO TABLE global FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';

*Note: Kindly save the global.csv file in your /var/lib/mysql-files folder if you are using Ubuntu/Linux.

#5. Make the necessary changes in env.js and .env file for database connection. .ie Database Name,username,Password etc.

#6. Insert the suitable Data in respective tables to visualize proper output through front-end.

## Execution
#7. Start the npm server through command line using following command.
- npm start

#8. start the node server from integrated terminal of vs code using following command.
-node index.js

** server will start**

#9. change the url to localhost:3000/register to register the user.Verify the same.Similarly change the url to localhost:3000/login to get the login page. 

#10. Login the app using the credentials registerd during the registration.and now you can acess the respective contacts and you can mark them spam also.