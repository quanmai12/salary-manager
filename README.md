# Quản Lý Lương Nhân Viên

Ứng dụng quản lý nhân viên với **Spring Boot (Backend)** + **React (Frontend)** + **MySQL**

## Tính năng
- Thêm / Sửa / Xóa nhân viên
- Tìm kiếm theo tên
- Validate dữ liệu
- Giao diện đẹp, responsive
- API test bằng Postman

## Công nghệ
- **Backend**: Spring Boot, JPA, MySQL
- **Frontend**: React, Vite, Bootstrap/Tailwind
- **Database**: MySQL (XAMPP)
- **API Test**: Postman Collection

## Chạy dự án

### 1. Backend
```bash
cd backend
mvn spring-boot:run
→ API: http://localhost:8080/api/users
2. Frontend
bashcd frontend
npm install
npm run dev
→ App: http://localhost:5173
3. Postman
Import file: Salary Management API.postman_collection.json