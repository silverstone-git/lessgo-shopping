import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./Layout";
import App from './App';

import './output_style/output.css';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './dashboard/Dashboard';
import LogOut from './Logout';
import Items from './Items';
import ItemMaster from './ItemMaster';
import Cart from './cart/Cart';
import ItemPage from './ItemPage';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="items" element={<Items />} />
        <Route path="/item/:passedId" element={<ItemPage />} />
        <Route path="item-master" element={<ItemMaster />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path='/logout' element={<LogOut />}>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
