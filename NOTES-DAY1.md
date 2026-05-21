# 📚 Day-1 Backend Notes - Node.js Fundamentals

## 🎯 Topics Covered

---

## 1️⃣ **Modules & Require**

### What is a Module?
- Reusable code ko alag file mein likhte ho aur dusre files mein use karte ho
- `module.exports` se export karte ho, `require()` se import karte ho

### Example:
```javascript
// math.js mein
function add(a, b) {
    return a + b
}
function sub(a, b) {
    return a - b
}
module.exports = { add, sub }

// index.js mein
const math = require("./math")
console.log(math.add(5, 4))  // Output: 9
```

---

## 2️⃣ **File Handling (CRUD Operations)**

File operations ke 4 types hote hain:
- **Create/Write** - Naya file banao ya overwrite karo
- **Read** - File padhna
- **Update/Append** - File mein content add karna
- **Delete** - File delete karna

### ✍️ **WRITE Operations**

#### **fs.writeFileSync()** - Synchronous (Blocking)
```javascript
fs.writeFileSync("./file.txt", "Hello World")
```
- Pura likha jane tak baaki code wait karega
- Simple tasks ke liye theek hai

#### **fs.writeFile()** - Asynchronous (Non-blocking)
```javascript
fs.writeFile("./file.txt", "Hello World", (err) => {
    if(err) {
        console.log("Error:", err)
    } else {
        console.log("File written successfully!")
    }
})
```
- Background mein likha jaata hai
- Large files ke liye better performance
- Callback se pata chalता hai jab complete ho

---

### 📖 **READ Operations**

#### **fs.readFileSync()** - Synchronous
```javascript
const res = fs.readFileSync("./file.txt", "utf-8")
console.log(res)
```

#### **fs.readFile()** - Asynchronous
```javascript
fs.readFile("./file.txt", "utf-8", (err, res) => {
    if(err) {
        console.log(err)
    } else {
        console.log(res)
    }
})
```

---

### 🔄 **UPDATE/APPEND Operations**

```javascript
// Neeche likha jaata hai purane content ke baad
fs.appendFileSync("./file.txt", "\nNaya content yahan add hoga")
```

---

## ⚡ **IMPORTANT: Async vs Sync (CRITICAL)**

### 🔴 **COMMON BUG - Timing Problem**

```javascript
// ❌ WRONG - Append pehle complete hota hai!
fs.writeFile("./file.txt", "Content", (err) => {})
fs.appendFileSync("./file.txt", "Append")  // Ye pehle chalega!

// ✅ RIGHT - Callback ke andar append karo
fs.writeFile("./file.txt", "Content", (err) => {
    if(!err) {
        fs.appendFileSync("./file.txt", "\nAppend")  // Ab ye baad mein chalega
    }
})
```

### Kyu hoता hai?
- `writeFile()` **asynchronous** hai - background mein chalta hai
- `appendFileSync()` **synchronous** hai - turant execute hota hai
- Append pehle complete ho jaata hai, phir write hota hai!

---

## 📋 **File Module (fs) Summary**

| Operation | Sync | Async |
|-----------|------|-------|
| Write | `writeFileSync()` | `writeFile()` |
| Read | `readFileSync()` | `readFile()` |
| Append | `appendFileSync()` | `appendFile()` |
| Delete | `unlinkSync()` | `unlink()` |

---

## 🎓 **Best Practices**

1. **Production code mein Async use karo** - Better performance
2. **Callbacks ko properly handle karo** - Error check karo
3. **Encoding specify karo** - Usually `"utf-8"`
4. **Async operations ka order rakho** - Nested callbacks ya promises use karo
5. **Path module use karo** - `const path = require('path')`

---

## 💡 **Key Takeaways**

✅ Modules banate ho reusable code ke liye  
✅ File handling ke 4 types: Create, Read, Update, Delete  
✅ Async operations fast hote hain but ordering care rakni padti hai  
✅ Sync operations slow hote hain but ordering guarantee rahti hai  
✅ Production mein Async + Callbacks/Promises best practice hai  

---

## 🔗 **Common Methods**

```javascript
const fs = require('fs')
const path = require('path')

// Path mein separator add karna
path.join(__dirname, 'file.txt')

// File ke name ko extract karna
path.basename('/path/to/file.txt')  // 'file.txt'

// Directory ko extract karna
path.dirname('/path/to/file.txt')   // '/path/to'
```

---

**Last Updated:** May 21, 2026  
**Status:** ✅ Complete - Day 1 Concepts
