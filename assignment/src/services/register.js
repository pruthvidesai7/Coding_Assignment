const registerAPI = (body) => {
    debugger;
    const url = "http://localhost:9999/api/register";
    const xhr = new XMLHttpRequest();
    if(body.name != "" && body.mobno != ""){

        xhr.onreadystatechange = function() {
            debugger;
            if (this.readyState === 4 && this.status === 200) {
                debugger;
                alert(this.responseText);
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

export default registerAPI;