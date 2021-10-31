import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AuthProvider from './context/AuthProvider';
import ManageAllOrders from './pages/Manage All Orders/ManageAllOrders';
import NotFound from './pages/Not Found/NotFound';
import MyOrders from './pages/My Orders/MyOrders';
import AddNewSpot from './pages/Add New Spot/AddNewSpot';
import Login from './pages/Login/Login';
import BookSpot from './pages/Book Spot/BookSpot';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Register from './pages/Register/Register';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/spot/:id">
            <BookSpot></BookSpot>
          </PrivateRoute>
          <PrivateRoute path="/myOrders">
            <MyOrders></MyOrders>
          </PrivateRoute>
          <PrivateRoute path="/manageAllOrders">
            <ManageAllOrders></ManageAllOrders>
          </PrivateRoute>
          <PrivateRoute path="/addNewSpot">
            <AddNewSpot></AddNewSpot>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
        <Footer></Footer>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
