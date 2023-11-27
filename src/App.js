import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import StoreOwnerDashboard from './Dashboard/StoreOwnerDashboard';
import SuperAdminDashboard from './Dashboard/SuperAdminDashboard';
import './App.css'
import Subscriptions from './pages/Subscriptions';
import Merchants from './pages/Merchants';
import Users from './pages/Users';
import Questions from './pages/Questions';
import Product from './pages/Product';
import WithDraws from './pages/WithDraws';
import Order from './pages/Order';
import Reviews from './pages/Reviews';
import Staff from './pages/Staff';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route  path="/superAdmin" element={<SuperAdminDashboard />} />
        <Route  path="/superAdmin/subscriptions" element={<Subscriptions />} />
        <Route  path="/superAdmin/merchants" element={<Merchants />} />
        <Route  path="/superAdmin/users" element={<Users />} />
       
        
        <Route  path="/storeOwner" element={<StoreOwnerDashboard />} />
        <Route  path="/storeOwner/questions" element={<Questions />} />
        <Route  path="/storeOwner/products" element={<Product />} />
        <Route  path="/storeOwner/staff" element={<Staff />} />
        <Route  path="/storeOwner/orders" element={<Order />} />
        <Route  path="/storeOwner/withdraws" element={<WithDraws />} />
        <Route  path="/storeOwner/reviews" element={<Reviews/>} />

      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
