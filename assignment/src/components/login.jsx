import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginAPI from "../services/login";
import registerAPI from "../services/register";

const { useState } = require("react");


function Login(){
    const history = useHistory();
    
    
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    
    

    const handleMobileNumberChange = (e) => {
        setMobileNumber(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    

    function handleSubmit(e){
        e.preventDefault();
        let body = {
            mobno: mobileNumber,
            password: password
        }
        LoginAPI(body);
    }


    const  LoginAPI = (body) => {
        debugger;
        const url = "http://localhost:9999/api/login";
        const xhr = new XMLHttpRequest();
        if(body.password != "" && body.mobno != ""){
    
            xhr.onreadystatechange = function() {
                debugger;
                if (this.readyState === 4 && this.status === 200) {
                    debugger;
                    let data = JSON.parse(xhr.responseText);
                    alert(data.message);
                    localStorage.setItem("user_id", data.user_id);
                    history.push("/dashboard");
                }else if(this.readyState === 4 && this.status != 200){
                    debugger;
                    alert(this.responseText);
                }
            }
        }else{
            alert("error", "Please Fill Email And Password.");
        }
            
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body));
    
    }
    
    
    return(        
            <>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Login</title>
            </head>
            <body>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Mobile Number</label>
                        <input type="text" placeholder="Mobile Number" onChange={handleMobileNumberChange}></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Password" onChange={handlePasswordChange}></input>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>    
            </body>
            </html>
            </>
    );
}


export default Login;