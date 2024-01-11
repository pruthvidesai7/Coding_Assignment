import registerAPI from "../services/register";

const { useEffect, useState } = require("react");


function Register(){
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleMobileNumberChange = (e) => {
        setMobileNumber(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    

    

    function handleSubmit(e){
        e.preventDefault();
        let body = {
            name: name,
            mobno: mobileNumber,
            email: email,
            password: password
        }
        registerAPI(body);
    }
    
    return(        
            <>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Register</title>
            </head>
            <body>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input type="text" placeholder="Name" onChange={handleNameChange}></input>
                    </div>
                    <div>
                        <label>Mobile Number</label>
                        <input type="text" placeholder="Mobile Number" onChange={handleMobileNumberChange}></input>
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder="Email" onChange={handleEmailChange}></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Password" onChange={handlePasswordChange}></input>
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>    
            </body>
            </html>
            </>
    );
}


export default Register;