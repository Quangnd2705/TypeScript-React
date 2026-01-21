import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

type Course = {
  id: number;
  name: string;
  credit: number;
  category: string;
  teacher: string;
};

function ListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filterTeacher, setFilterTeacher] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 5;

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/courses");
        setCourses(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    getAll();
  }, []);

  const handleSearch = () => {
    setSearchName(inputValue);
    setCurrentPage(1);
  };

 const handleDelete = async (id: number) => {
  try {
    const ok = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (!ok) return;

    await axios.delete(`http://localhost:3000/courses/${id}`);
    setCourses(courses.filter((course) => course.id !== id));
    toast.success("Xóa khóa học thành công");
  } catch (error) {
    toast.error("Xóa thất bại");
  }
};


  const filteredCourses = courses.filter((course) => {
    const matchesName = course.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesTeacher = filterTeacher === "" || course.teacher === filterTeacher;
    return matchesName && matchesTeacher;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const teachers = Array.from(new Set(courses.map((c) => c.teacher)));

  return (
    <div className="p-6 text-left">
      <h1 className="text-2xl font-bold mb-6 text-center">Quản lý khóa học</h1>

      <div className="flex flex-wrap gap-4 mb-6 items-end justify-center">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="border p-2 rounded w-64"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Tìm kiếm
          </button>
        </div>

        <select
          className="border p-2 rounded w-48"
          onChange={(e) => {
            setFilterTeacher(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">--Chọn giáo viên--</option>
          {teachers.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 w-16">ID</th>
              <th className="px-4 py-2 border border-gray-300">Tên khóa học</th>
              <th className="px-4 py-2 border border-gray-300">Tín chỉ</th>
              <th className="px-4 py-2 border border-gray-300">Chuyên mục</th>
              <th className="px-4 py-2 border border-gray-300">Giáo viên</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>

            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300 text-center">{item.id}</td>
                  <td className="px-4 py-2 border border-gray-300 font-medium">{item.name}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">{item.credit}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.category}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.teacher}</td>
                  <td>
                    <Link to={`/edit/${item.id}`} className=" ml-8 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500 italic">
                  Không tìm thấy kết quả phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-1 border rounded transition ${currentPage === page ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListPage;