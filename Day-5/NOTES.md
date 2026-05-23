# DAY-5: OS & CRYPTO MODULES

## 1. OS MODULE - System Information

### क्या है OS Module?
- Node.js में built-in module जो **operating system** की info देता है
- CPU, Memory, Platform आदि के बारे में जानकारी मिलती है

### Important OS Methods:

#### a) `os.platform()`
```javascript
console.log(os.platform())  // "win32", "linux", "darwin" (mac)
```
- Server किस OS पर चल रहा है पता चलता है

#### b) `os.userInfo()`
```javascript
console.log(os.userInfo())
// { uid, gid, username, homedir, shell }
```
- Current user की information देता है

#### c) `os.cpus()`
```javascript
console.log(os.cpus().length)  // CPU cores की संख्या
```
- सभी CPU cores की details

#### d) `os.arch()`
```javascript
console.log(os.arch())  // "x64", "arm64", "x86"
```
- System architecture (32-bit या 64-bit)

#### e) `os.freemem()`
```javascript
console.log(os.freemem())  // Available RAM in bytes
```
- अभी कितनी RAM free है

#### f) `os.totalmem()`
```javascript
console.log(os.totalmem())  // Total RAM in bytes
```
- कुल कितनी RAM है

---

## 2. CRYPTO MODULE - Encryption & Hashing

### क्या है Crypto Module?
- **Security** के लिए use होता है
- Data को encrypt/decrypt करना
- Hash values generate करना
- Random bytes generate करना

---

## 3. RANDOM BYTES - Secure Random Data

```javascript
const randomBytes = crypto.randomBytes(8)
console.log(randomBytes.toString("hex"))  // Random hex string
```

### Use Cases:
✅ Generate tokens  
✅ Generate session IDs  
✅ Generate password salts  
✅ Generate encryption keys

### Formats:
```javascript
randomBytes.toString("hex")        // Hexadecimal
randomBytes.toString("base64")     // Base64
randomBytes.toString("utf8")       // UTF-8
```

---

## 4. HASHING - One-way Encryption

### क्या है Hashing?
- One-way process - reverse नहीं हो सकता
- Same input = Same output
- **Example**: Password storage

```javascript
const hashvalue = crypto
    .createHash("sha256")
    .update("krishna")
    .digest("hex")

console.log(hashvalue)
// 5f7c4ab...a9d2e (हमेशा यही)
```

### Common Hash Algorithms:
- **sha256** - 64 character hex (सबसे common)
- **sha1** - पुराना, कम secure
- **md5** - बहुत पुराना, vulnerable

### उदाहरण - Password Verification:
```javascript
// User signup में
const passwordHash = crypto.createHash("sha256")
    .update(userPassword)
    .digest("hex")

// Database में save करो

// Login में
const inputHash = crypto.createHash("sha256")
    .update(inputPassword)
    .digest("hex")

if (inputHash === passwordHash) {
    console.log("Login successful!")
}
```

---

## 5. ENCRYPTION - दोनों तरफा (Reversible)

### बनाम Hashing:
| Hashing | Encryption |
|---------|-----------|
| One-way | Reversible |
| Same input = Same output | Key की जरूरत |
| Passwords के लिए | Sensitive data के लिए |

### AES Encryption (Advanced Encryption Standard)

#### Components:
1. **secretKey** - 256-bit (32 bytes) - बहुत important
2. **IV** - Initialization Vector (16 bytes) - हर बार unique होना चाहिए
3. **Algorithm** - "aes-256-cbc"

```javascript
const secretKey = crypto.randomBytes(32)   // 256-bit
const iv = crypto.randomBytes(16)          // 128-bit
const message = "Hello Shubham"
```

---

## 6. ENCRYPTION PROCESS

```javascript
function encrypt(text) {
    const cipher = crypto.createCipheriv(
        "aes-256-cbc",    // Algorithm
        secretKey,        // Encryption key
        iv                // Initialization vector
    );

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
}

const encrypted = encrypt("Hello Shubham")
console.log("Encrypted:", encrypted)
// Output: a9d2e5f8c3b1a7f9e8d2c3b1a7f9e8d2
```

### Steps:
1. Cipher object बनाओ
2. `update()` से text को encrypt करो
3. `final()` से encryption complete करो
4. Hex format में output लो

---

## 7. DECRYPTION PROCESS

```javascript
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",    // Same algorithm
        secretKey,        // Same key (बहुत important!)
        iv                // Same IV
    );

    let decrypted = decipher.update(
        encryptedText,
        "hex",        // Encrypted data format
        "utf8"        // Output format
    );

    decrypted += decipher.final("utf8");

    return decrypted;
}

const decrypted = decrypt(encrypted)
console.log("Decrypted:", decrypted)  // "Hello Shubham"
```

### IMPORTANT:
⚠️ **Same secretKey और IV** use करना जरूरी है!  
अगर अलग key/IV use करो तो decryption fail होगा

---

## 8. SECURITY BEST PRACTICES

### ✅ DO:
- Passwords को **hash** करो (never store plain text)
- Sensitive data को **encrypt** करो (credit card, SSN)
- हर encryption के लिए **unique IV** generate करो
- Strong passwords के लिए **bcrypt** or **argon2** use करो
- Keys को **environment variables** में store करो

### ❌ DON'T:
- Encryption keys को code में hardcode न करो
- Secret key को git commit न करो
- Weak algorithms (MD5, SHA1) use न करो
- Same IV बार-बार न use करो
- Hashed passwords को decrypt करने की कोशिश न करो

---

## 9. REAL-WORLD USE CASES

✅ **User Passwords** - Hash करके store  
✅ **Payment Info** - Encrypt करके store  
✅ **Tokens/Sessions** - Random bytes से generate  
✅ **API Keys** - Random bytes से generate  
✅ **Data Privacy** - GDPR compliance के लिए encrypt  
✅ **SSL/TLS Certificates** - Secure communication

---

## 10. KEY TAKEAWAY

**OS Module** = System information  
**Crypto Module** = Security (hashing + encryption)

**पासवर्ड हमेशा hash करो**, संवेदनशील डेटा को encrypt करो! 🔐
