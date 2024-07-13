
import axios from 'axios';
import { createContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext=createContext(null)


// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {

    const[isLogin,setIsLogin] = useState(null)
    const navigate = useNavigate();
    const refreshTokenCalled = useRef(false); 
    const [user, setUser] = useState({
        userId:"",
        username:"",
        accessExpiration:null,
        refreshExpiration:null
    });
    const login = (userData)=>{
        setIsLogin(userData);
        localStorage.setItem("userData",JSON.stringify(userData));
        // localStorage.setItem("accessExpiration", new Date(userData.accessExpiration * 1000).toString());
        // localStorage.setItem("refreshExpiration", new Date(userData.refreshExpiration * 1000).toString());
        localStorage.setItem("refreshToken", userData.refreshToken);
    };
    const logout =() =>{
        setIsLogin(null);
        localStorage.removeItem("userData");
        localStorage.removeItem("atExpiration");
        localStorage.removeItem("rtExpiration");
        };
    
    const handleRefreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await axios.post("http://localhost:8080/api/v1/refresh", { refreshToken }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true // Includes cookies with the request
            });
            
            if (response.status === 200) {
                let userData = response.data.data;
                let nowDate = new Date().getTime();
                localStorage.setItem("atExpiration", new Date(nowDate + (userData.accessExpiration * 1000)).toString());
                localStorage.setItem("rtExpiration", new Date(nowDate + (userData.refreshExpiration * 1000)).toString());
                login(userData);
                console.log("RT regenerated successfully done");
                refreshTokenCalled.current = false; // Reset the ref after successful refresh
            }
        }  catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                logout();
                navigate("/login");
            }
            refreshTokenCalled.current = false; // Reset the ref in case of error
        }
    };

    useEffect(() => {
        let currentTime = new Date();
        let atExpiration = new Date(localStorage.getItem("atExpiration"));
        let rtExpiration = new Date(localStorage.getItem("rtExpiration"));
        let userData = localStorage.getItem("userData");
        if (userData)
            userData = JSON.parse(userData);

        if (userData) {
            if (atExpiration > currentTime && currentTime < rtExpiration) {
                if (!isLogin) {
                    setIsLogin(userData);
                }
            } else if (atExpiration < currentTime && currentTime < rtExpiration) {
                if (!refreshTokenCalled.current) {
                    refreshTokenCalled.current = true;
                    handleRefreshToken();
                }
            } else {
                logout();
                navigate("/login");
            }
        }
    }, [isLogin, navigate]);
    

    
  return (
    <AuthContext.Provider value={{user,setUser,isLogin,login, logout}}>
            {children}
        </AuthContext.Provider>
  )
}

export default AuthProvider
