import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../loader/Loading';
import { AuthContext } from './AuthProvider';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
     ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/v1/login",
        credentials,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true // Includes cookies with the request
        }
      );
      setCredentials({ username: "", password: "" })

      if (response.status === 200) {
        let userData = response.data.data;
        let nowDate = new Date().getTime()
        localStorage.setItem("userData", JSON.stringify(userData))
        localStorage.setItem("atExpiration", new Date(nowDate + (userData.accessExpiration * 1000)).toString());
        localStorage.setItem("rtExpiration", new Date(nowDate + (userData.refreshExpiration * 1000)).toString());
        login(userData); // This line seems to be calling a function that is not defined in this scope
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.status === 401) {
        console.log(error.response.data)
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      {isLoading? <Loading /> : ""}
      <h2 className="text-3xl font-bold mb-4">User Login</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usename">
            UserName
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="usename"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;