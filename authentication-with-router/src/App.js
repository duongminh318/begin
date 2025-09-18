// Import các công cụ cần thiết từ thư viện `react-router-dom`.
// - BrowserRouter (đổi tên thành Router): "Bộ não" quản lý việc điều hướng, sử dụng URL của trình duyệt.
// - Routes: "Thùng chứa" để bọc tất cả các tuyến đường (Route).
// - Route: Định nghĩa một "tuyến đường", nối một URL với một component cụ thể.
// - Navigate: Component dùng để điều hướng người dùng đến một URL khác.
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import NotFoundPage from './pages/NotFoundPage';
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./layout/Layout";


// Component App chính của ứng dụng.
function App() {
  
  return (

    // <Router> bọc toàn bộ ứng dụng để kích hoạt chức năng định tuyến.
    <Router>
      {/* <Routes> là nơi định nghĩa tất cả các tuyến đường có thể có. */}
      <Routes>
        {/* Định nghĩa một nhóm các tuyến đường có chung một layout.
            - path="/": Áp dụng cho tất cả các URL bắt đầu bằng "/".
            - element={<Layout />}: Tất cả các component con bên trong sẽ được hiển thị bên trong component Layout này.
        */}
        <Route path="/" element={<Layout/>}>

          {/* Đây là một "tuyến đường mặc định" (index route) cho path="/".
              - index: Thuộc tính này cho biết đây là trang sẽ hiển thị khi người dùng truy cập chính xác vào URL của cha (tức là "/").
              - element={<Navigate.../>}: Thay vì hiển thị một component, nó sẽ tự động chuyển hướng người dùng đến "/student".
          */}
          <Route index element={<HomePage/>} />

          {/* Định nghĩa các tuyến đường con, được lồng bên trong <Layout /> */}

          {/* Khi URL là "/student", hiển thị component StudentHomePage. */}
          <Route path="/product" element={<ProductsPage/>} />

          {/* Khi URL là "/student/create", hiển thị component StudentCreatePage. */}
          <Route path="/login" element={<LoginPage/>} />

          {/* Khi URL là "/student/edit", hiển thị component StudentEditPage. */}
          <Route path="/register" element={<RegisterPage/>} />

          {/* Đây là "tuyến đường bắt tất cả" (catch-all route).
              - path="*": Dấu "*" sẽ khớp với BẤT KỲ URL nào không khớp với các tuyến đường đã định nghĩa ở trên.
              - Nó dùng để hiển thị trang 404 Not Found (Không tìm thấy trang).
          */}
          <Route path="*" element={<NotFoundPage />} />

        </Route>
      </Routes>
    </Router>
  )
}

// Xuất component App ra để sử dụng.
export default App;    