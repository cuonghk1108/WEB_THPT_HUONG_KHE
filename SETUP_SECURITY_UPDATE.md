# 🚀 SETUP GUIDE - SECURITY & FEATURES UPDATE

## 📋 Overview
Cập nhật này thêm các tính năng bảo mật và chất lượng quan trọng:
- ✅ JWT Authentication (Token-based security)
- ✅ Input Validation (Zod)
- ✅ Error Handling Middleware
- ✅ Logging System (Winston)
- ✅ Custom Error Pages (404, 500)
- ✅ Email Service (Nodemailer)

---

## 🔧 INSTALLATION STEPS

### Step 1: Install New Backend Dependencies
```bash
cd backend
npm install jsonwebtoken bcryptjs winston zod nodemailer
```

### Step 2: Install Frontend Dependencies (Optional)
```bash
cd ..
npm install zod
# Note: Other dependencies (TypeScript, React) should already be installed
```

### Step 3: Configure Environment Variables
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local with your values:
# - JWT_SECRET: Generate random string
# - EMAIL credentials for contact form
# - Other API keys
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Create Logs Directory
```bash
# Backend logs will be saved here
mkdir -p logs
```

### Step 5: Update Backend Server
The `backend/server.js` has been updated with:
- HTTP request logging via httpLogger middleware
- Error handling middleware
- 404 handler
- Auth routes

No additional code changes needed.

---

## 🔐 AUTHENTICATION SYSTEM

### How It Works
1. **Client** → POST `/api/auth/login` with username & password
2. **Server** → Validates credentials → Generates JWT token
3. **Server** → Returns token + user info
4. **Client** → Stores token in localStorage
5. **Future requests** → Include token in Authorization header: `Bearer <token>`
6. **Server** → Verifies token before processing request

### Default Credentials (Demo)
```
Username: admin
Password: admin
```

### Login Endpoint
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { "id": 1, "username": "admin", "role": "admin" },
  "expiresIn": "7d"
}
```

### Protected Routes
All admin routes now require JWT token:
```
Authorization: Bearer eyJhbGc...
```

### Change Password
```
POST /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

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

---

## ✅ INPUT VALIDATION

### Validated Endpoints

#### News
```typescript
newsSchema = {
  title: string (5-200 chars),
  excerpt: string (10-500 chars),
  content: string (min 20 chars),
  image: URL (optional),
  category: string (min 2 chars),
  author: string (min 2 chars),
  date: ISO datetime (optional)
}
```

#### Teachers
```typescript
teacherSchema = {
  name: string (2-100 chars),
  subject: string (2-100 chars),
  email: valid email,
  phone: valid phone format,
  bio: string (min 10 chars),
  image: URL (optional)
}
```

#### Clubs
```typescript
clubSchema = {
  name: string (3-100 chars),
  description: string (10-500 chars),
  image: URL (optional),
  members: integer ≥ 0,
  advisor: string (min 2 chars)
}
```

#### Events
```typescript
eventSchema = {
  title: string (5-200 chars),
  description: string (min 10 chars),
  startDate: ISO datetime,
  endDate: ISO datetime (optional),
  location: string (min 5 chars),
  image: URL (optional),
  category: string (optional)
}
```

---

## 📊 ERROR HANDLING

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "timestamp": "2026-01-30T10:30:00.000Z",
    "details": [
      {
        "field": "email",
        "message": "Invalid email address",
        "type": "invalid_string"
      }
    ]
  }
}
```

### Common Error Codes
- `NO_TOKEN` - Missing authentication token
- `INVALID_TOKEN` - Token format invalid
- `TOKEN_EXPIRED` - Token has expired
- `FORBIDDEN` - Insufficient permissions
- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `INTERNAL_ERROR` - Server error
- `INVALID_CREDENTIALS` - Login failed

### Custom Error Pages
- **404 Page**: `/pages/Error404.tsx` - Not found resources
- **500 Page**: `/pages/Error500.tsx` - Server errors

---

## 📝 LOGGING SYSTEM

### Log Levels
```
error    - Errors and exceptions
warn     - Warnings (failed logins, etc)
info     - General information
debug    - Debug details
```

### Log Storage
```
backend/logs/
├── error.log      # Errors only
├── combined.log   # All logs
```

### Log Format
```
2026-01-30 10:30:45 [thpt-huong-khe-api] info: HTTP Request {
  method: "POST",
  url: "/api/auth/login",
  status: 200,
  duration: "125ms",
  userId: "admin"
}
```

### View Logs
```bash
# Follow logs in real-time
tail -f logs/combined.log

# See only errors
tail -f logs/error.log

# Search logs
grep "error" logs/combined.log
grep "user: admin" logs/combined.log
```

---

## 💌 EMAIL SERVICE

### Setup Email (Gmail)
1. Enable 2-Factor Authentication on your Gmail account
2. Go to [myaccount.google.com](https://myaccount.google.com)
3. Select "Security" from left menu
4. Scroll to "App passwords"
5. Select "Mail" and "Windows Computer" (or your device)
6. Google will generate a 16-character password
7. Copy this password to `.env.local` as `EMAIL_PASSWORD`

### Contact Form Email
```bash
POST /api/email/contact
Content-Type: application/json

{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "phone": "0123456789",
  "subject": "Hỏi về tuyển sinh",
  "message": "Tôi muốn hỏi về..."
}
```

### Email Templates Available
1. **Contact Form** - Nhận liên hệ từ website
2. **News Notification** - Thông báo tin tức mới
3. **Event Notification** - Thông báo sự kiện
4. **Password Reset** - Đặt lại mật khẩu

### Send News Notification
```javascript
import { EmailService } from './backend/services/emailService.js';

await EmailService.sendNewsNotificationEmail(
  'student@example.com',
  'Tin tức tuyển sinh 2026',
  'Nhà trường công bố...',
  'https://thpthuongkhe.vercel.app/tin-tuc/...'
);
```

---

## 🧪 TESTING THE SETUP

### Test 1: Login with JWT
```bash
# Request
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'

# Response should include token
```

### Test 2: Verify Token
```bash
# Use token from login response
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer <your-token>"
```

### Test 3: Create News with Validation
```bash
curl -X POST http://localhost:5000/api/news \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tin Tức",
    "excerpt": "Nội dung tóm tắt",
    "content": "Nội dung đầy đủ...",
    "category": "Hoạt động",
    "author": "Admin"
  }'

# Should validate all fields
```

### Test 4: Check Logs
```bash
tail -f logs/combined.log
# Should see HTTP requests logged
```

### Test 5: Email Service
```bash
node -e "
import { EmailService } from './backend/services/emailService.js';
await EmailService.sendContactFormEmail(
  'Nguyễn Văn A',
  'user@example.com',
  '0123456789',
  'Test',
  'Nội dung test'
);
"
```

---

## 🐛 TROUBLESHOOTING

### "JWT_SECRET not set"
**Solution**: Add `JWT_SECRET` to `.env.local` file

### "Email service not responding"
**Solution**: 
1. Check email credentials in `.env.local`
2. For Gmail: use App Password, not regular password
3. Check `logs/combined.log` for error details

### "Validation error: Invalid email"
**Solution**: Ensure email format is valid (example@domain.com)

### "Token expired"
**Solution**: Logout and login again to get new token

### "Cannot POST /api/news"
**Solution**: Ensure you're sending Authorization header with valid token

### "404 Not Found"
**Solution**: Check URL is correct, use custom Error404 page now

---

## 📚 FILE STRUCTURE

```
backend/
├── middleware/
│   ├── auth.js                 # JWT token & role checking
│   ├── passwordUtils.js        # Password hashing & validation
│   ├── logger.js               # Winston logging
│   ├── errorHandler.js         # Error handling & formatting
│   └── validation.js           # Zod validation schemas
├── routes/
│   ├── auth.js                 # NEW: Login, verify, change password
│   ├── news.js                 # Updated with validation
│   ├── teachers.js             # Updated with validation
│   ├── clubs.js                # Updated with validation
│   ├── events.js               # Updated with validation
│   └── gallery.js
├── services/
│   └── emailService.js         # NEW: Email sending service
├── logs/                       # NEW: Log files (created at runtime)
└── server.js                   # Updated with middleware

frontend/
├── services/
│   └── authService.ts          # NEW: JWT authentication service
├── hooks/
│   └── useAuth.ts              # NEW: useAuth hook
├── pages/
│   ├── Error404.tsx            # NEW: 404 error page
│   ├── Error500.tsx            # NEW: 500 error page
│   └── Admin/
│       └── Login.tsx           # Updated with JWT login
└── App.tsx                     # Updated with error pages

.env.example                    # NEW: Environment variables template
SETUP_SECURITY_UPDATE.md        # This file
```

---

## ✨ NEXT STEPS

1. **Install dependencies**: `npm install` in both frontend and backend
2. **Configure environment**: Create `.env.local` with your values
3. **Test authentication**: Use curl or Postman to test login
4. **Monitor logs**: Check `logs/combined.log` for activity
5. **Setup email**: Configure Gmail App Password for contact forms
6. **Update admin password**: Change default credentials from demo

---

## 📖 ADDITIONAL RESOURCES

- [JWT.io](https://jwt.io) - JWT documentation
- [Zod](https://zod.dev) - Validation library
- [Winston](https://github.com/winstonjs/winston) - Logging library
- [Nodemailer](https://nodemailer.com) - Email service
- [Google App Passwords](https://support.google.com/accounts/answer/185833) - Gmail security

---

**Version**: 3.1.0  
**Updated**: January 30, 2026  
**Status**: ✅ Ready for production (with proper environment setup)
