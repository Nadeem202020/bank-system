import Navbar from './Navbar';
import Home from './Home';
import ViewCustomers from './ViewCustomers';
import CustomerDetails from './CustomerDetails';
import Transfer from './Transfer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/viewCustomers">
              <ViewCustomers></ViewCustomers>
            </Route>
            <Route path="/viewCustomers/:id">
              <CustomerDetails></CustomerDetails>
            </Route>
            <Route path="/transfers/:id">
              <Transfer />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;