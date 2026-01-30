# 📚 API DOCUMENTATION

## 🔐 Authentication Endpoints

### POST /api/auth/login
Login with credentials to get JWT token.

**Request:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  },
  "expiresIn": "7d"
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Validation error
- `401` - Invalid credentials

---

### GET /api/auth/verify
Verify if JWT token is still valid.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "userId": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

**Status Codes:**
- `200` - Token valid
- `401` - Token expired/invalid

---

### POST /api/auth/refresh
Get a new JWT token using existing token.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "7d"
}
```

---

### POST /api/auth/change-password
Change admin password (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "oldPassword": "admin",
  "newPassword": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&*)

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Responses:**
```json
// Weak password
{
  "success": false,
  "error": {
    "code": "WEAK_PASSWORD",
    "message": "Password does not meet security requirements",
    "details": [
      "Password must be at least 8 characters",
      "Password must contain at least one uppercase letter"
    ]
  }
}

// Old password incorrect
{
  "success": false,
  "error": {
    "code": "INVALID_PASSWORD",
    "message": "Old password is incorrect"
  }
}
```

---

### POST /api/auth/logout
Logout (client should delete token from localStorage).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 📰 News Endpoints

### GET /api/news
Get all news articles.

**Query Parameters:**
```
page=1              (optional, default: 1)
limit=10            (optional, default: 10)
sort=-createdAt     (optional, - for descending)
search=keyword      (optional, search in title)
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Tin tức mới",
      "excerpt": "Tóm tắt tin tức",
      "content": "Nội dung đầy đủ...",
      "category": "Hoạt động",
      "author": "Admin",
      "image": "https://...",
      "date": "2026-01-30T10:30:00.000Z",
      "createdAt": "2026-01-30T10:30:00.000Z",
      "updatedAt": "2026-01-30T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

---

### GET /api/news/:id
Get single news article by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Tin tức mới",
    "excerpt": "Tóm tắt tin tức",
    "content": "Nội dung đầy đủ...",
    "category": "Hoạt động",
    "author": "Admin",
    "image": "https://...",
    "date": "2026-01-30T10:30:00.000Z"
  }
}
```

---

### POST /api/news
Create new news article (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Tiêu đề bài viết",
  "excerpt": "Tóm tắt bài viết (10-500 ký tự)",
  "content": "Nội dung đầy đủ của bài viết...",
  "category": "Hoạt động",
  "author": "Tên tác giả",
  "image": "https://example.com/image.jpg",
  "date": "2026-01-30T10:30:00.000Z"
}
```

**Validation:**
- title: 5-200 characters (required)
- excerpt: 10-500 characters (required)
- content: minimum 20 characters (required)
- category: minimum 2 characters (required)
- author: minimum 2 characters (required)
- image: valid URL (optional)
- date: ISO datetime (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Tiêu đề bài viết",
    ...
  }
}
```

**Error Response (validation):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "message": "Title must be at least 5 characters",
        "type": "too_small"
      },
      {
        "field": "image",
        "message": "Invalid image URL",
        "type": "invalid_string"
      }
    ]
  }
}
```

---

### PUT /api/news/:id
Update news article (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Updated title",
  "excerpt": "Updated excerpt",
  "content": "Updated content...",
  "category": "Updated category",
  "author": "Updated author",
  "image": "https://...",
  "date": "2026-01-30T10:30:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### DELETE /api/news/:id
Delete news article (requires authentication & admin role).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "News article deleted successfully"
}
```

---

## 👨‍🏫 Teachers Endpoints

### GET /api/teachers
Get all teachers.

**Query Parameters:**
```
page=1
limit=10
sort=-createdAt
search=name
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Thầy Hồ Đức Cường",
      "subject": "Tin học",
      "email": "cuong@thpthuongkhe.edu.vn",
      "phone": "0123456789",
      "bio": "Mô tả giáo viên...",
      "image": "https://...",
      "createdAt": "2026-01-30T10:30:00.000Z"
    }
  ],
  "pagination": { ... }
}
```

---

### POST /api/teachers
Create new teacher (requires authentication & admin role).

**Request:**
```json
{
  "name": "Thầy Nguyễn Văn A",
  "subject": "Toán học",
  "email": "nguyenvana@thpthuongkhe.edu.vn",
  "phone": "0123456789",
  "bio": "Mô tả ngắn về giáo viên",
  "image": "https://..."
}
```

**Validation:**
- name: 2-100 characters (required)
- subject: 2-100 characters (required)
- email: valid email (required)
- phone: valid phone format (optional)
- bio: minimum 10 characters (optional)
- image: valid URL (optional)

---

### PUT /api/teachers/:id
Update teacher information.

### DELETE /api/teachers/:id
Delete teacher.

---

## 🏆 Clubs Endpoints

### GET /api/clubs
Get all clubs.

### GET /api/clubs/:id
Get single club.

### POST /api/clubs
Create new club.

**Request:**
```json
{
  "name": "Câu lạc bộ Tin học",
  "description": "Nơi học sinh yêu thích công nghệ gặp gỡ...",
  "image": "https://...",
  "members": 45,
  "advisor": "Thầy Hồ Đức Cường"
}
```

**Validation:**
- name: 3-100 characters (required)
- description: 10-500 characters (required)
- image: valid URL (optional)
- members: positive integer (optional)
- advisor: minimum 2 characters (optional)

### PUT /api/clubs/:id
Update club.

### DELETE /api/clubs/:id
Delete club.

---

## 📅 Events Endpoints

### GET /api/events
Get all events.

### GET /api/events/:id
Get single event.

### POST /api/events
Create new event.

**Request:**
```json
{
  "title": "Tên sự kiện",
  "description": "Mô tả chi tiết sự kiện...",
  "startDate": "2026-02-15T08:00:00.000Z",
  "endDate": "2026-02-15T17:00:00.000Z",
  "location": "Hội trường nhà trường",
  "image": "https://...",
  "category": "Học tập"
}
```

**Validation:**
- title: 5-200 characters (required)
- description: minimum 10 characters (required)
- startDate: ISO datetime (required)
- endDate: ISO datetime (optional)
- location: minimum 5 characters (required)
- image: valid URL (optional)

### PUT /api/events/:id
Update event.

### DELETE /api/events/:id
Delete event.

---

## 🖼️ Gallery Endpoints

### GET /api/gallery
Get all gallery images.

### GET /api/gallery/:id
Get single image.

### POST /api/gallery
Upload new image.

**Request:**
```json
{
  "title": "Tiêu đề hình ảnh",
  "url": "https://...",
  "category": "Hoạt động",
  "description": "Mô tả hình ảnh"
}
```

### PUT /api/gallery/:id
Update image information.

### DELETE /api/gallery/:id
Delete image.

---

## 📧 Email Endpoints

### POST /api/email/contact
Send contact form email.

**Request:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "phone": "0123456789",
  "subject": "Hỏi về tuyển sinh",
  "message": "Nội dung tin nhắn..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

## 🏥 Health Check

### GET /api/health
Check if API is running.

**Response:**
```json
{
  "status": "Server is running ✅"
}
```

---

## Error Codes Reference

| Code | Meaning | Status |
|------|---------|--------|
| NO_TOKEN | Missing JWT token | 401 |
| INVALID_TOKEN | Token format invalid | 401 |
| TOKEN_EXPIRED | Token has expired | 401 |
| FORBIDDEN | Insufficient permissions | 403 |
| VALIDATION_ERROR | Input validation failed | 400 |
| NOT_FOUND | Resource not found | 404 |
| INTERNAL_ERROR | Server error | 500 |
| INVALID_CREDENTIALS | Login failed | 401 |
| WEAK_PASSWORD | Password too weak | 400 |

---

## Headers Reference

### Authentication Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Content Type
```
Content-Type: application/json
```

---

## Rate Limiting (Recommended)
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1674000000
```

---

**API Version**: 1.0  
**Base URL**: http://localhost:5000 (development)  
**Updated**: January 30, 2026
