import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Use the logout function

  const handleLogout = async () => {
    console.log("btn clicked");
    try {
      const response = await axios.post("http://localhost:8080/api/v1/logout", "",
        {
          headers: { "Content-Type": "application/json" },
          
          withCredentials: true // Fix the typo
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("userData"); // Remove the user data from local storage
        localStorage.removeItem("atExpiration");
        localStorage.removeItem("rtExpiration");
        logout(); // Call the logout function
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 401) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <>
      <br /><br />
      <hr />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Logout;