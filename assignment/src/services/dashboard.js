function GetDataAPI(body){
    debugger;
    const url = "http://localhost:9999/api/getdata";
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        debugger;
        if (this.readyState === 4 && this.status === 200) {
            debugger;
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            //     return(`<table>
            //     <tr>
            //         <th>Id</th>
            //         <th>Name</th>
            //         <th>Mobile Number</th>
            //         <th>Action</th>
            //     </tr>
            //     ${data.map((item) => {
            //         return (
            //             <tr key={item.id}>
            //                 <td>{item.id}</td>
            //                 <td>{item.name}</td>
            //                 <td>{item.mobno}</td>
            //                 <td><button onClick={() => spam(item.id)}>Report Spam</button></td>
            //             </tr>
            //         )
            //     })}
            // </table>`
            //     );
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

}  
export default GetDataAPI;