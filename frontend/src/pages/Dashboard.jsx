import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [wishlists, setWishlists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchWishlists = async () => {
      try {
        const response = await axiosInstance.get('/api/wishlists', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setWishlists(response.data);
      } catch (error) {
        alert('Failed to fetch wishlists.');
      } finally {
        setLoading(false);
      }
    };
    fetchWishlists();
  }, [user, navigate]);

  

  if (loading) return <div className="loading">Loading your wishlists...</div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1>🎁 My Wishlists</h1>
        <Link to="/create-wishlist" className="btn btn-primary">
          + Create Wishlist
        </Link>
      </div>

     
    </div>
  );
};

export default Dashboard;
