# DAY-6: EXPRESS.JS BASICS

## 1. WHAT IS EXPRESS?

Express is a lightweight web framework for Node.js. It makes building APIs and web servers very easy.

**Without Express:**
- Manually handle routes, methods, status codes
- Lots of boilerplate code
- Complex code

**With Express:**
- Simple, clean code
- Built-in routing
- Easy middleware support
- Perfect for building APIs

---

## 2. INSTALLATION & SETUP

```bash
npm init -y
npm install express
npm install --save-dev nodemon
```

### package.json Script:
```json
"scripts": {
  "start": "nodemon index.js"
}
```

---

## 3. BASIC EXPRESS SERVER

```javascript
import express from "express"
const app = express()

// Define a route
app.get("/", (req, res) => {
    res.send("Hello World!")
})

// Start server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
```

### Run:
```bash
npm start
```

Visit: `http://localhost:3000`

---

## 4. HTTP METHODS

Express supports different HTTP methods:

### GET - Get data from server
```javascript
app.get("/api/users", (req, res) => {
    res.json({ message: "Get all users" })
})
```

### POST - Send data to server
```javascript
app.post("/api/users", (req, res) => {
    res.json({ message: "User created" })
})
```

### PUT - Update data
```javascript
app.put("/api/users/:id", (req, res) => {
    res.json({ message: "User updated" })
})
```

### DELETE - Delete data
```javascript
app.delete("/api/users/:id", (req, res) => {
    res.json({ message: "User deleted" })
})
```

---

## 5. ROUTING BASICS

### Simple Route:
```javascript
app.get("/", (req, res) => {
    res.send("Home Page")
})
```

Visit: `http://localhost:3000`

### Route with Path:
```javascript
app.get("/about", (req, res) => {
    res.send("About Page")
})
```

Visit: `http://localhost:3000/about`

### Route with Parameters:
```javascript
app.get("/user/:id", (req, res) => {
    const userId = req.params.id
    res.json({ userId: userId })
})
```

Visit: `http://localhost:3000/user/123`
Response: `{ "userId": "123" }`

---

## 6. QUERY PARAMETERS

Query parameters come after `?` in the URL.

### Example:
```
http://localhost:3000/api/users?name=krishna&age=25
```

### Access in Code:
```javascript
app.get("/api/users", (req, res) => {
    const { name, age } = req.query
    
    console.log(name)  // "krishna"
    console.log(age)   // "25"
    
    res.json({ name, age })
})
```

---

## 7. STATUS CODES

HTTP Status codes tell the client if request was successful or not.

### Common Status Codes:

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid data |
| 401 | Unauthorized | Not authenticated |
| 404 | Not Found | Route not found |
| 500 | Server Error | Server problem |

### Usage:
```javascript
app.get("/api/users", (req, res) => {
    res.status(200).json({ message: "Success" })
})

app.post("/api/users", (req, res) => {
    res.status(201).json({ message: "User created" })
})

app.get("/error", (req, res) => {
    res.status(500).json({ message: "Server error" })
})
```

---

## 8. SENDING RESPONSES

### a) Plain Text:
```javascript
res.send("Hello World")
```

### b) JSON:
```javascript
res.json({ name: "Krishna", email: "krishna@example.com" })
```

### c) HTML:
```javascript
res.send("<h1>Hello</h1>")
```

### d) With Status Code:
```javascript
res.status(201).json({ message: "Created" })
```

### e) Redirect:
```javascript
res.redirect("/api/users")
```

---

## 9. SENDING DATA (req, res)

### req (Request):
- Data coming FROM client
- Contains: query, params, body, headers

```javascript
app.get("/user/:id", (req, res) => {
    const id = req.params.id      // From URL path
    const name = req.query.name   // From query string
    const body = req.body         // From POST body
    
    res.json({ id, name })
})
```

### res (Response):
- Data going TO client
- Methods: `send()`, `json()`, `status()`, `redirect()`

```javascript
res.json({ data: "value" })      // Send JSON
res.status(201).json({...})      // With status code
res.send("text")                 // Send text
```

---

## 10. PRACTICAL EXAMPLE

```javascript
import express from "express"
import { data } from "./sample.js"

const app = express()

// Route 1: Get all users
app.get("/api/v1/users", (req, res) => {
    const { name } = req.query
    
    if(name) {
        console.log("Searching for:", name)
    }
    
    res.status(200).json({
        message: "All users",
        data: data
    })
})

// Route 2: Get single user by ID
app.get("/api/v1/users/:id", (req, res) => {
    const userId = req.params.id
    const user = data.find(u => u.id == userId)
    
    if(!user) {
        return res.status(404).json({ message: "User not found" })
    }
    
    res.status(200).json({ data: user })
})

// Start server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})
```

### Test URLs:
```
GET http://localhost:3000/api/v1/users
GET http://localhost:3000/api/v1/users?name=krishna
GET http://localhost:3000/api/v1/users/1
```

---

## 11. COMMON MISTAKES

❌ **Route Path Mismatch:**
```javascript
app.get("/users", ...)     // Route defined here
// But you visit: /user   // 404 error!
```

✅ **Solution:** URL must match route exactly

---

❌ **Forgetting Response:**
```javascript
app.get("/api/users", (req, res) => {
    const data = { name: "Krishna" }
    // Client waiting forever!
})
```

✅ **Solution:** Always send response
```javascript
res.json(data)
```

---

❌ **Multiple Responses:**
```javascript
app.get("/", (req, res) => {
    res.send("First")
    res.send("Second")  // Error!
})
```

✅ **Solution:** Send only one response

---

## 12. USEFUL SHORTCUTS

```javascript
// These are the same:
res.json({...})
res.status(200).json({...})

// Default status is 200, so json() implies status 200
```

---

## 13. DEBUGGING

### Check if server is running:
```bash
npm start
```

### Check console logs:
```javascript
console.log("Request received:", req.query)
```

### Use API testing tools:
- Postman
- Thunder Client (VS Code extension)
- curl command

---

## 14. KEY POINTS TO REMEMBER

✅ Express makes building APIs easy  
✅ Routes define what happens at each URL  
✅ Query params are in the URL: `?name=value`  
✅ Path params are in the URL: `/user/:id`  
✅ Always send a response to the client  
✅ Status codes tell the client if request was successful  
✅ Use `.json()` for APIs  

---

## 15. NEXT STEPS

- Learn Middleware
- Learn POST requests with body parsing
- Learn Error handling
- Learn Authentication
