import toast, { Toaster } from "react-hot-toast";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AddPage from "./pages/Add";
import ListPage from "./pages/List";
import AuthPage from "./pages/AuthPage";
import ProtectRoute from "./components/ProtectRoute";
import { useState, useEffect } from "react";

// Cập nhật Type User để chứa username
export type User = {
  email: string;
  username: string; 
};

function App() {
  const nav = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công");
    nav("/login");
  };

  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            <strong>WEB502 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">Trang chủ</Link>
            <Link to="/list" className="hover:text-gray-200">Danh sách</Link>
            <Link to="/add" className="hover:text-gray-200">Thêm mới</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {/* Hiển thị username thay vì email */}
                <span className="font-medium">Chào, {user.username}</span>
                <button
                  className="bg-red-500 hover:bg-red-600 transition rounded-2xl px-4 py-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200">Đăng nhập</Link>
                <Link to="/register" className="hover:text-gray-200">Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB502</h1>
        <Routes>
          <Route path="/list" element={<ListPage />} />
          <Route element={<ProtectRoute />}>
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<AddPage />} />
          </Route>
          <Route path="/register" element={<AuthPage setUser={setUser} />} />
          <Route path="/login" element={<AuthPage isLogin setUser={setUser} />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;