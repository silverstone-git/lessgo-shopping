import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout";
import App from './dashboard/components/App';

import './output_style/output.css';
import Login from './auth/components/Login';
import Signup from './auth/components/Signup';
import Dashboard from './dashboard/components/Dashboard';
import LogOut from './auth/components/Logout';
import Items from './items/customer/components/Explore';
import ItemMaster from './items/vendor/ItemMaster';
import Cart from './cart/components/Cart';
import ItemPage from './items/customer/components/ItemPage';
import Checkout from './checkout/CheckoutPage';
import Thankyou from './thankyou/thankyou';
import { YourOrders } from './orders/components/YourOrders';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const window1 : any = { ...window };

root.render(
  <GoogleOAuthProvider clientId={window1.__ENV__?.REACT_APP_GOAUTH_CLID ?? ""}>
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="items" element={<Items />} />
        <Route path="/item/:passedId" element={<ItemPage />} />
        <Route path="item-master" element={<ItemMaster />} />
        <Route path="login" element={<Login />} />
        <Route path="/login/:exitCode" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Dashboard />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="thankyou" element={<Thankyou />} />
        <Route path="your-orders" element={<YourOrders />} />
      </Route>
      <Route path='/logout' element={<LogOut />}>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
