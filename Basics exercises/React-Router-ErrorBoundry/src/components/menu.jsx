import {
    Route,
    Link,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import React from 'react';
import Home from './home';
import About from './aboutUs';
import Contact from './contact';
import Danger from './danger';

class Menu extends React.Component {
    render() {
        return(
            <Router>
            <div>
                <ul>
                    <li>
                        <Link to = '/'>Hem</Link>
                    </li>
                    <li>
                        <Link to = '/aboutUs'>Om Oss</Link>
                    </li>
                    <li>
                        <Link to = '/contact'>Kontakt</Link>
                    </li>
                    <li>
                        <Link to = '/danger'>Danger</Link>
                    </li>
                </ul>
                <hr />
                <Switch>
                    <Route exact path = '/' component = {Home} />
                    <Route path = '/aboutUs' component = {About} />
                    <Route path = '/contact' component = {Contact} />
                    <Route path = '/danger' component = {Danger} />
                </Switch>
            </div>
            </Router>
        )
    }
}

export default Menu;