# Day-8: Cookies, Headers & Status Codes - Detailed Notes

## 1. COOKIES

### What are Cookies?
- Cookies are small text files stored on the client-side (browser)
- They are sent with every HTTP request to the server
- Maximum size is around 4KB per cookie
- Used to store user preferences, session data, authentication tokens, etc.
- Cookies are domain-specific and cannot be accessed by other domains

### Cookie Structure
```
- Name: identifier for the cookie
- Value: data stored in the cookie
- Domain: which domain can access the cookie
- Path: which URL path the cookie applies to
- Expiration/Max-Age: how long the cookie persists
- HttpOnly: if true, cookie is only sent via HTTP (not accessible via JavaScript)
- Secure: if true, cookie is only sent over HTTPS
- SameSite: controls cross-site cookie behavior
```

### Advantages of Cookies
✓ Lightweight and small file size
✓ Persistent storage (survives browser restarts)
✓ Automatically sent with every request
✓ Easy to implement and widely supported
✓ Can store user preferences and session data
✓ Can be used for tracking and analytics
✓ No server storage needed for basic data

### Disadvantages of Cookies
✗ Limited storage capacity (4KB)
✗ Security concerns (can be stolen if not encrypted)
✗ Privacy issues (tracking and monitoring)
✗ Users can disable or delete cookies
✗ Cannot store complex data structures
✗ Transmitted with every request (can slow down traffic)
✗ Subject to XSS attacks if not properly secured

### Setting Cookies in Node.js
```javascript
res.cookie(name, value, {
  maxAge: 1000 * 60 * 60 * 24,  // expiration time in milliseconds
  httpOnly: true,                 // inaccessible to client-side JS
  secure: false,                  // only send over HTTPS (set true in production)
  sameSite: 'strict'              // CSRF protection
})
```

### Reading Cookies in Node.js
- Requires `cookie-parser` middleware from express
- Without middleware: use `req.headers.cookie` (raw string)
- With middleware: use `req.cookies` (parsed object)

```javascript
// Install: npm install cookie-parser
import cookieParser from "cookie-parser"
app.use(cookieParser())

// Access parsed cookies
console.log(req.cookies)  // Object with all cookies
```

---

## 2. HTTP HEADERS

### What are Headers?
- Headers are metadata sent along with HTTP requests and responses
- They contain information about the message body and transmission details
- Key-value pairs in format: `Header-Name: Header-Value`
- Both requests and responses can have headers

### Types of HTTP Headers

#### Request Headers (Client → Server)
- `Accept`: data types the client can accept (e.g., application/json)
- `Content-Type`: format of data being sent (e.g., application/json)
- `Authorization`: authentication credentials (Bearer tokens, Basic auth)
- `User-Agent`: information about the client browser/software
- `Referer`: URL of the previous page
- `Cookie`: cookies stored for that domain
- `Content-Length`: size of the request body
- `Host`: domain name of the server

#### Response Headers (Server → Client)
- `Content-Type`: format of response data (e.g., application/json)
- `Content-Length`: size of response body
- `Cache-Control`: how to cache the response
- `Set-Cookie`: instruct browser to store a cookie
- `Location`: redirect URL (used with 3xx status codes)
- `Access-Control-Allow-Origin`: CORS headers for cross-origin requests
- `Server`: information about the server software
- `ETag`: unique identifier for response version

### Setting Headers in Node.js
```javascript
res.set('Header-Name', 'Header-Value')
res.header('Header-Name', 'Header-Value')
res.setHeader('Header-Name', 'Header-Value')

// Examples
res.set('Content-Type', 'application/json')
res.set('X-Custom-Header', 'custom-value')
res.set('Cache-Control', 'no-cache')
```

### Reading Headers in Node.js
```javascript
// From request
req.get('Header-Name')
req.header('Header-Name')
req.headers['header-name']  // headers are lowercase

// Examples
const userAgent = req.get('User-Agent')
const contentType = req.headers['content-type']
const authorization = req.header('Authorization')
console.log(req.headers)  // Object with all headers
```

---

## 3. HTTP STATUS CODES

### What are Status Codes?
- Three-digit numbers in HTTP responses indicating the result of the request
- Format: `code reason-phrase`
- First digit indicates the class of response

### Categories of Status Codes

#### 1xx - Informational (Request Received, Processing Continuing)
- `100 Continue`: Server received headers, client should continue
- `101 Switching Protocols`: Protocol upgrade (HTTP to WebSocket)

#### 2xx - Success (Request Accepted and Processed)
- `200 OK`: Successful request, response data included
- `201 Created`: Resource successfully created
- `202 Accepted`: Request accepted for processing (async)
- `204 No Content`: Successful request, no content to return
- `206 Partial Content`: Only part of resource returned

#### 3xx - Redirection (Further Action Needed)
- `300 Multiple Choices`: Multiple possible responses
- `301 Moved Permanently`: Resource permanently moved to new URL
- `302 Found`: Resource temporarily moved to new URL
- `304 Not Modified`: Resource not modified since last request
- `307 Temporary Redirect`: Temporary redirect with method preservation
- `308 Permanent Redirect`: Permanent redirect with method preservation

#### 4xx - Client Error (Bad Request)
- `400 Bad Request`: Invalid request syntax
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Client not authorized to access resource
- `404 Not Found`: Resource does not exist
- `405 Method Not Allowed`: HTTP method not supported for resource
- `409 Conflict`: Request conflicts with current state
- `422 Unprocessable Entity`: Semantic error in request
- `429 Too Many Requests`: Rate limiting exceeded

#### 5xx - Server Error (Server Failed to Process)
- `500 Internal Server Error`: Generic server error
- `501 Not Implemented`: Feature not supported by server
- `502 Bad Gateway`: Invalid response from upstream server
- `503 Service Unavailable`: Server temporarily unavailable
- `504 Gateway Timeout`: Upstream server timeout

### Sending Status Codes in Node.js
```javascript
// Single status code
res.status(200).send('Success')
res.status(404).send('Not Found')

// With different response types
res.status(200).json({ message: 'Success' })
res.status(201).send('Created')
res.status(401).json({ error: 'Unauthorized' })

// Without explicit status (defaults to 200)
res.send('Success')
```

### Common Status Code Usage
```javascript
// Successful operations
res.status(200).send(data)           // GET, PUT, PATCH successful
res.status(201).send(newData)        // POST (created) successful
res.status(204).send()               // DELETE successful (no content)

// Client errors
res.status(400).send('Bad request')  // Invalid input
res.status(401).send('Unauthorized') // Not authenticated
res.status(403).send('Forbidden')    // Authenticated but not authorized
res.status(404).send('Not found')    // Resource doesn't exist

// Server errors
res.status(500).send('Server error') // Unexpected server error
```

---

## 4. PRACTICAL EXAMPLE: COOKIES WITH EXPRESS

### Implementation Overview
```javascript
import express from "express"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())
```

### Setting Cookies Endpoint
```javascript
app.get("/", (req, res) => {
    res.cookie("name", "express", {
        maxAge: 1000 * 60 * 60 * 24,  // 24 hours
        httpOnly: true,                // Secure: JS cannot access
        secure: false                  // Set to true in production
    })
    res.send("Hello from server")
})
```

### Reading Cookies & Authorization
```javascript
app.get("/product", (req, res) => {
    console.log(req.cookies)           // Parse cookies
    console.log(req.headers.cookie)    // Raw cookie string
    
    // Check if authorized
    if(req.cookies.name && req.cookies.name === "express") {
        res.status(200).json({
            id: 1,
            name: "item-1",
            price: "$1000"
        })
    } else {
        res.status(403).send("You are not authorized")
    }
})
```

### Dependencies
```json
{
  "dependencies": {
    "express": "^5.2.1",
    "cookie-parser": "^1.4.7"
  }
}
```

---

## 5. KEY TAKEAWAYS

✓ Cookies store client-side data and are sent with every request
✓ Use HttpOnly flag to prevent XSS attacks on sensitive cookies
✓ Headers provide metadata about requests and responses
✓ Status codes indicate the result of HTTP transactions
✓ Always validate and authorize using cookies/sessions
✓ Use appropriate status codes for different scenarios
✓ In production, always use Secure and HttpOnly flags for cookies
✓ Headers should be set before sending response body

---

## 6. RUNNING THE PROJECT

```bash
# Install dependencies
npm install

# Start the server with nodemon
npm start

# Test endpoints
curl http://localhost:3000/                    # Set cookie
curl -b "name=express" http://localhost:3000/product  # Read cookie
```
