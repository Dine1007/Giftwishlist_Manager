import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const WishlistDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchWishlist();
  }, [user, id]);

  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get(`/api/wishlists/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setWishlist(response.data.wishlist);
      setItems(response.data.items);
      setNewName(response.data.wishlist.name);
    } catch (error) {
      alert('Failed to load wishlist.');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  
  if (loading) return <div className="loading">Loading wishlist...</div>;
  if (!wishlist) return <div className="loading">Wishlist not found.</div>;

  return (
    <div className="container">
      {/* Wishlist Header */}
      <div className="card mb-4">
        {editingName ? (
          <div>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="form-input mb-2"
            />
            <div className="flex-gap mt-2">
              <button onClick={handleUpdateName} className="btn btn-primary btn-sm">
                Save
              </button>
              <button onClick={() => { setEditingName(false); setNewName(wishlist.name); }} className="btn btn-outline btn-sm">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-between">
            <h1 style={{ color: '#6b3a3a', fontSize: '1.4rem', margin: 0 }}>📋 {wishlist.name}</h1>
            <button onClick={() => setEditingName(true)} className="btn btn-outline btn-sm">
              Edit Name
            </button>
          </div>
        )}
      </div>

      
      
      <div className="text-center mt-4">
        <button onClick={() => navigate('/dashboard')} className="btn btn-outline">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default WishlistDetail;
