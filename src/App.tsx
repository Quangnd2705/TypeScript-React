import { Toaster } from "react-hot-toast";
import { Link, Routes, Route } from "react-router-dom";

import AddPage from "./pages/Add";
import ListPage from "./pages/List";
import EditPage from "./pages/Edit";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR: Sửa lại để chữ trắng nổi bật trên nền xanh */}
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-white text-2xl font-bold tracking-tight">
                WEB502 <span className="text-blue-200">App</span>
              </span>
            </Link>

            {/* Menu: Bỏ 'hidden' để hiện trên cả điện thoại nếu bạn muốn */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-blue-200 font-medium transition-colors">
                Trang chủ
              </Link>
              <Link to="/list" className="text-white hover:text-blue-200 font-medium transition-colors">
                Danh sách
              </Link>
              <Link to="/add" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                Thêm mới
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENT: Thêm Padding và bo góc cho phần nội dung */}
      <main className="max-w-6xl mx-auto mt-10 px-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center py-10">
                  <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Chào mừng đến với WEB502
                  </h1>
                  <p className="text-gray-500 text-lg">Hệ thống quản lý sản phẩm chuyên nghiệp</p>
                </div>
              }
            />
            <Route path="/list" element={<ListPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Routes>
        </div>
      </main>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;