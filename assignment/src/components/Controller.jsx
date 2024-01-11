import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Dashboard from "./Dashboard";


function Controller() {
    return (
        <Router>
                {/* <Route path='/' element={<Home/>}/> */}
                <Route path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/dashboard' component={Dashboard}/>
        </Router>
    );
}

export default Controller;