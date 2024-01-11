import { useHistory } from "react-router-dom";


function LoginAPI(body){
    debugger;
    const history = useHistory();
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

export default LoginAPI;