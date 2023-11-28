
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Components/Navbar';
import { setLogout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const user = useSelector((state) => state.auth.user);
  const username = useSelector((state) => state.auth.username);
  const role = useSelector((state)=> state.auth.role)

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/')
  }

  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>{user}</h2>
      <button className='logout' onClick={handleLogout}>Logout</button>

    </div>
    <Navbar role={role} />

    <div style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', marginTop: '30px'
    }}>
      <h1>Welcome, <br></br> {user}'s in your Dashboard Page!</h1>
    </div>

  </div>
  );
};
export default SuperAdminDashboard;