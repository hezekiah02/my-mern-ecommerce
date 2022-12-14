import './App.css';
import Home from './components/Home/Home';
import WebFont from "webfontloader";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from './components/Products/ProductDetails';
import LoginSignup from './components/Authentication/LoginSignup';
import Loading from './components/more/Loader';
import { useSelector } from 'react-redux';
import UserData from './components/more/UserData';
import Store from "./store";
import { loadUser } from './actions/userActions';
import ProtectedRoute  from './route/ProtectedRoute'
import Profile from './components/user/Profile';
import UpdatePassword from './components/user/UpdatePassword';
import EditProfile from './components/user/EditProfile';
import About from './components/About/About';
import Products from './components/Products/Products';
import Search from './components/Products/Search';
import Support from './components/more/Support';
import Cart from './components/cart/Cart';
import Favourites from './components/cart/Favourites';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Payment from './components/cart/Payment';
import Success from './components/cart/Success';
import MoreOption from './components/user/MoreOption';
import Dashboard from './components/Admin/Dashboard';
import CreateProduct from './components/Admin/CreateProduct';
import AllProducts from './components/Admin/AllProducts';
import AllOrder from './components/Admin/AllOrder';
import UpdateOrder from './components/Admin/UpdateOrder';
import AllUsers from './components/Admin/AllUsers';
import UpdateUser from './components/Admin/UpdateUser';
import AllReviews from './components/Admin/AllReviews';
import EditProduct from './components/Admin/EditProduct';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import CommingSoon from './components/more/CommingSoon';
import Rules from './components/more/Rules';
import Contact from './components/more/Contact';
import MyOrder from './components/user/MyOrder';
import Notfound from './components/more/NotFound';
import MyOrderDetails from './components/user/MyOrderDetails';


function App() {

  const {isAuthenticated,user} = useSelector((state) =>state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    
    Store.dispatch(loadUser());

    getStripeApiKey();

  }, []);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}

       {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )} 

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/login" component={LoginSignup} />
        <Route exact path="/about" component={About} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/favourites" component={Favourites} />
        <Route exact path="/creator" component={CommingSoon} />
         <Route exact path="/faq" component={Rules} />
         <Route exact path="/contact" component={Contact} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/success" component={Success} />
        <ProtectedRoute exact path="/orders" component={MyOrder} />
        <ProtectedRoute exact path="/order/:id" component={MyOrderDetails} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/more" component={MoreOption} />

        <Route exact path="/password/forgot" component={ForgotPassword} />
         <Route exact path="/password/reset/:token" component={ResetPassword} />

        <ProtectedRoute isAdmin={true} exact path="/dashboard" component={Dashboard} />       
         <ProtectedRoute isAdmin={true} exact path="/admin/product" component={CreateProduct} />
         <ProtectedRoute isAdmin={true} exact path="/admin/products" component={AllProducts} />
         <ProtectedRoute isAdmin={true} exact path="/edit/product/:id" component={EditProduct} />
         <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={AllOrder} />
         <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={UpdateOrder} />
         <ProtectedRoute isAdmin={true} exact path="/admin/users" component={AllUsers} />
         <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
         <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={AllReviews} />

        {/* <Route exact path="/load" component={Loading} /> */}
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <ProtectedRoute exact path="/me/update/info" component={EditProfile} />

        {/*  <Route component={
           window.location.pathname === "/process/payment" ? null : Notfound
           } />   */}
      </Switch>
    </Router>
  );
}

export default App;
