import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from './Component/Auth';
import Homepage from './Component/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Auth />
                </Route>
                <Route exact path="/homepage">
                    <Homepage />
                </Route>
            </Switch>
        </Router>
    )
}
