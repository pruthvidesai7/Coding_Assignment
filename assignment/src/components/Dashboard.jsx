import { useEffect, useState } from "react";

function Dashboard(){
    const [arr, setArr] = useState([]);
    const [nameregex, setNameRegex] = useState('');

    useEffect(()=>{
        getData();
    },[])


    const getData = () => {
        let user_id = localStorage.getItem("user_id")
        let body = {"user_id": user_id};
        GetDataAPI(body);
    }


    const GetDataAPI = (body) => {
        debugger;
        const url = "http://localhost:9999/api/getdata";
        const xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function() {
            debugger;
            if (this.readyState === 4 && this.status === 200) {
                debugger;
                let data = JSON.parse(xhr.responseText);
                if(data.message == "Contacts not found"){
                    alert(data.message);
                    setArr([]);
                }else{
                    setArr(data);
                }
            }else if(this.readyState === 4 && this.status != 200){
                debugger;
                alert(this.responseText);
            }
        }
            
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body));
    }

    const spam = (id) =>{
        debugger;
        let body = {"id" : id};
        const url = "http://localhost:9999/api/markspam";
        const xhr = new XMLHttpRequest();
    
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
            
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body));
    }  
    

    const search = () =>{
        debugger;
        if(nameregex == ""){
            return;
        }
        setArr([]);
        let body = {"nameregex" : nameregex};
        const url = "http://localhost:9999/api/searchbyname";
        const xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function() {
            debugger;
            if (this.readyState === 4 && this.status === 200) {
                debugger;
                let data = JSON.parse(this.responseText);
                setArr(data);
            }else if(this.readyState === 4 && this.status != 200){
                debugger;
                alert(this.responseText);
            }
        }
            
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body));
    }  
    
    const handleSearch = (e) =>{
        setNameRegex(e.target.value);
    }  

    

    return(        
        <>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Dashboard</title>
        </head>
        <body>
            <h1>Dashboard</h1>
            <input type="search" onChange={(e) => {handleSearch(e)}}></input>
            <button onClick={search}>Search</button>
                <table style={{border:"solid"}}>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Mobile Number</th>
                    <th>Email</th>
                    <th>Spam Count</th>
                    <th>Action</th>
                </tr>
                {(arr.length != 0)?arr.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.mobno}</td>
                            <td>{item.email}</td>
                            <td>{item.spam_count}</td>
                            <td><button onClick={() => spam(item.id)}>Report Spam</button></td>
                        </tr>
                    )
                }):
                    <tr  colSpan={5}>
                        <td>Data Not Found</td>
                    </tr>
                }
            </table>
        </body>
        </html>
        </>
    );

}


export default Dashboard;