# Day-2 Backend Learning Notes

## Topics Covered

### 1. **HTTP Server Creation with Node.js HTTP Module**

#### File: `Index.js`

**Concept:** Creating a basic HTTP server using Node.js built-in `http` module.

```javascript
const http = require("http")
const fs = require("fs")
const PORT = 3000

const myServer = http.createServer((req, res) => {
    // Server logic here
})

myServer.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})
```

**Key Points:**
- `http.createServer()` takes a callback with `req` (request) and `res` (response) objects
- `req.url` contains the requested URL path
- `res.end()` sends response back to client
- `res.statusCode` sets HTTP status code (200, 500, etc.)
- `.listen(PORT)` starts the server on specified port

#### Logging with File System:
```javascript
fs.appendFile("./log.txt", log, (err) => {
    if(err) {
        res.statusCode = 500
        res.end("internal server error")
    }
})
```
- `fs.appendFile()` adds content to file (creates if doesn't exist)
- Async operation with callback for error handling

---

### 2. **Global Object in Node.js**

**Concept:** Unlike browsers with `window` object, Node.js has a `global` object.

**Examples of Global Functions:**

#### setTimeout()
```javascript
setTimeout(() => {
    console.log("this is global object")
}, 2000)
```
- Executes callback after specified milliseconds
- Non-blocking async operation

#### setInterval()
```javascript
let a = 1
let interval = setInterval(() => {
    a++
    console.log("this is set interval", a)
    
    if(a == 8) {
        clearInterval(interval)  // Stop the interval
    }
}, 2000)
```
- Repeatedly executes callback at fixed intervals
- `clearInterval()` stops the interval

#### setImmediate()
```javascript
setImmediate(() => {
    console.log("hellow from setImmediate")
}, 0)
```
- Executes callback in the next iteration of event loop
- More predictable than setTimeout with 0ms delay

---

### 3. **Advanced: How Node.js Works**

#### Execution Order & Event Loop

**Important Note:**
```javascript
console.log("hellow 1")  
// When no synchronous work is happening, 
// the sequence of async operations can change
```

**Key Understanding:**
- Top-level synchronous code runs first
- Then microtasks (promises, setImmediate)
- Then macrotasks (setTimeout, setInterval)
- Event loop orchestrates this execution

---

### 4. **Crypto Module - Password Hashing**

#### File: `arc.js`

**Concept:** Using Node.js `crypto` module for password hashing with PBKDF2 algorithm.

```javascript
const crypto = require("crypto")
let start = Date.now()

crypto.pbkdf2("password-1", "salt1", 1000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms Done`)
})
```

**PBKDF2 Parameters:**
- `password-1`: Password to hash
- `salt1`: Salt for security (prevents rainbow table attacks)
- `1000`: Number of iterations (higher = more secure but slower)
- `1024`: Length of derived key in bytes
- `sha512`: Hash algorithm
- Callback: Executes when hashing is complete

**Multiple Async Operations:**
```javascript
// 6 crypto operations are queued
// Node.js uses thread pool to handle them
// Default thread pool size is 4
```

#### Thread Pool Configuration:
```javascript
// process.env.UV_THREADPOOL_SIZE = 64
// Increases the number of worker threads for heavy operations
// Default: 4, Can be increased for better performance with many async tasks
```

---

### 5. **File Logging System**

#### Log Format:
```
1779372289980 : New request received & from /
```

**Structure:**
- Timestamp (milliseconds)
- Request path (`req.url`)
- Additional info

**Implementation in Index.js:**
```javascript
const log = `${Date.now()} : New request received & form ${req.url} enjoy`

fs.appendFile("./log.txt", log, (err) => {
    if(err) {
        res.statusCode = 500
        res.end("internal server error")
    }
})
```

---

## Key Concepts Summary

| Concept | Purpose | Type |
|---------|---------|------|
| **http.createServer()** | Create HTTP server | Synchronous |
| **fs.appendFile()** | Add data to file | Asynchronous |
| **setTimeout()** | Delayed execution | Asynchronous |
| **setInterval()** | Repeated execution | Asynchronous |
| **setImmediate()** | Next event loop cycle | Asynchronous |
| **crypto.pbkdf2()** | Password hashing | Asynchronous |
| **process.env** | Environment variables | Synchronous |
| **Thread Pool** | Handles heavy async tasks | Infrastructure |

---

## Project Structure

```
Day-2/
├── Index.js           (Main HTTP server with logging)
├── arc.js            (Crypto operations & threading demo)
├── log.txt           (Request logs - auto-generated)
├── package.json      (Project metadata)
├── README.md         (Brief overview)
└── NOTES-DAY2.md     (This file - Detailed notes)
```

---

## Running the Project

```bash
npm start
# Starts the HTTP server on port 3000
```

Then visit: `http://localhost:3000/` in browser
- Each request gets logged to `log.txt`
- Response: "hellow form server side"

---

## Important Learnings

1. **Node.js is event-driven:** Async operations don't block the main thread
2. **Thread Pool:** Heavy operations use thread pool (configurable via `UV_THREADPOOL_SIZE`)
3. **Security:** Always use salt with password hashing (crypto operations)
4. **Error Handling:** Always handle errors in async callbacks
5. **Global Functions:** setTimeout, setInterval, setImmediate are available globally
6. **Event Loop:** Understanding execution order is crucial for debugging

---

## Next Steps

- Explore routing in HTTP server
- Implement proper error handling
- Learn about middleware concepts
- Study Express.js framework (abstraction over HTTP module)

