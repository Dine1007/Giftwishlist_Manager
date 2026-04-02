import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Dashboard from './pages/Dashboard';
import CreateWishlist from './pages/CreateWishlist';
import WishlistDetail from './pages/WishlistDetail';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-wishlist" element={<CreateWishlist />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/wishlist/:id" element={<WishlistDetail />} />
        <Route path="/wishlist/:id/add-item" element={<AddItem />} /> 
        <Route path="/wishlist/:id/edit-item/:itemId" element={<EditItem />} />
      </Routes>
    </Router>
  );
}

export default App;
