import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Login from "./Login";
import AddCustomerComponent from "./AddCustomerComponent";

const App = () => {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/customers">Customers management</Link>
                    </li>
                </ul>
                <Routes>
                    <Route exact path='/' element={<Login/>}></Route>
                    <Route exact path='/customers' element={< AddCustomerComponent/>}></Route>
                </Routes>
            </div>
        </Router>
    );
}


export default App;