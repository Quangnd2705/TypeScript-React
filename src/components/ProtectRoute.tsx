import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
    const isLogingedIn = Boolean(localStorage.getItem("accessToken"));
    console.log(isLogingedIn);
    
    if(isLogingedIn){
        return <Outlet/>;
    }else{
        return (
            <div>
            Bạn cần đăng nhập
            <Navigate to="/login" replace></Navigate>
            </div>
        );
    }
  
}

export default ProtectRoute;