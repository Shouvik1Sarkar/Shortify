# 🔗 Shortify — URL Shortener with Analytics

Shortify is a **full‑stack URL shortener** built with **Node.js, Express, MongoDB, and EJS**. It allows users to shorten URLs, track click counts, view personal history, and analyze top-performing links — all with authentication and user‑scoped data.

This project focuses on **backend fundamentals**, **database modeling**, and **real‑world features** rather than just UI.

---

## ✨ Features

### 🔐 Authentication

- User registration & login
- Secure password hashing
- Cookie‑based authentication
- Protected routes

### 🔗 URL Shortening

- Generate unique short URLs
- Redirect short URL → original URL
- Automatic click counting

### 📊 Analytics

- Total clicks per URL
- Top 5 most‑clicked URLs (per user)
- User‑specific URL history
- MongoDB aggregation pipelines

### 🧑‍💻 User Dashboard

- View all URLs created by the logged‑in user
- History table with:
  - Short URL
  - Original URL
  - Click count

### 🗑 URL Management

- Delete all URLs created by a user

---

## 🛠 Tech Stack

**Backend**

- Node.js
- Express.js
- MongoDB + Mongoose

**Frontend**

- EJS (server‑side rendering)
- Bootstrap 5

**Other Tools**

- Cookie Parser
- Custom API Error & Response handlers

---

## 🧠 Data Models

### User

```js
{
  fullName: String,
  userName: String,
  email: String,
  password: String
}
```

### URL

```js
{
  randomCode: String,
  originalUrl: String,
  noOfClicks: Number,
  createdBy: ObjectId (User),
  timestamps
}
```

---

## 🚀 How It Works

1. User registers / logs in
2. User submits a long URL
3. App generates a unique short code
4. Short URL redirects to original URL
5. Each redirect increments click count
6. User can view analytics and history

---

## 📌 Example Routes

### Auth

```
GET  /api/v1/users/register
POST /api/v1/users/register
GET  /api/v1/users/login
POST /api/v1/users/login
```

### URLs

```
POST /api/v1/urls/short
GET  /api/v1/urls/short/:code
GET  /
DELETE /api/v1/urls/delete
```

---

## 📈 MongoDB Aggregation Example

Top 5 most clicked URLs (per user):

```js
Url.aggregate([
  { $match: { createdBy: userId } },
  { $sort: { noOfClicks: -1 } },
  { $limit: 5 },
]);
```

---

## 🔐 Security Considerations

- Passwords are hashed before storage
- User‑scoped access to URLs
- Protected routes using authentication middleware

---

## 🧪 Future Improvements

Planned upgrades:

- ⏱ Expiring URLs
- 🚦 Rate limiting (prevent abuse)
- 📊 Click analytics by date
- 👤 Unique visitor tracking
- ✏️ Custom short URLs
- ♻️ Soft delete URLs
- 📈 Dashboard charts
- 🌍 React frontend (API‑first architecture)

---

## 📚 Learning Goals

This project helped practice:

- RESTful routing
- Authentication flows
- MongoDB aggregation pipelines
- Data relationships
- Server‑side rendering
- Real‑world backend patterns

---

## 🤝 Contributions

This project is currently under active development.
Suggestions and feedback are welcome.

---

## 📜 License

MIT License
