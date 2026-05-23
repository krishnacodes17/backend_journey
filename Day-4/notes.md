# DAY-4: STREAMS & CHUNKING NOTES

## 1. FILE READING - BAD WAY vs GOOD WAY

### BAD WAY: `fs.readFileSync()` - पूरी file memory में एक साथ load
- **समय**: तेजी नहीं (blocking होता है)
- **Memory**: ज्यादा RAM use होती है
- **Problem**: बड़ी files के लिए server hang हो सकता है

```javascript
const file = fs.readFileSync("heavyFile.txt")
res.end(file)  // पूरी file एक बार में भेजता है
```

---

## 2. GOOD WAY: `fs.createReadStream()` - CHUNKS में data भेजो

- **Memory efficient**: थोड़ा-थोड़ा करके load करता है
- **Faster**: streaming शुरू हो जाती है तुरंत
- **Scalable**: बहुत बड़ी files भी handle कर सकता है

```javascript
const ReadableStream = fs.createReadStream("heavyFile.txt")
ReadableStream.pipe(res)  // chunks में भेजता है
```

---

## 3. PIPE() METHOD क्या है?

```
Readable Stream ──pipe()──> Writable Stream
(source data)               (destination)
```

### pipe() दो चीजें करता है:
✅ Data को chunks में पढ़ता है  
✅ तुरंत response में भेजता है

### फायदे:
- Automatic buffering
- Back-pressure handling (speed matching)
- Memory efficient

---

## 4. CHUNKS कैसे देख सकते हो?

`'data'` event का use करके:

```javascript
ReadableStream.on('data', (chunk) => {
    console.log(`📦 Chunk मिला: ${chunk.length} bytes`)
})
```

**हर chunk पर यह print होगा!**

---

## 5. OTHER STREAM EVENTS

### a) `'end'` event - जब सभी chunks आ गए
```javascript
ReadableStream.on('end', () => {
    console.log('सभी chunks आ गए!')
})
```

### b) `'error'` event - अगर कोई error आए
```javascript
ReadableStream.on('error', (error) => {
    console.log('Error:', error)
})
```

### c) `'pause'` और `'resume'` - streaming को control करना
```javascript
ReadableStream.pause()   // Stream को रोक दो
ReadableStream.resume()  // फिर से शुरू करो
```

---

## 6. PRACTICAL EXAMPLE - DEFAULT CHUNK SIZE

जब readFileStream बनाते हो तो DEFAULT chunk size:
- **highWaterMark: 64KB** (64 * 1024 bytes)

### Custom chunk size:
```javascript
fs.createReadStream("file.txt", {
    highWaterMark: 32 * 1024  // 32KB chunks
})
```

### बड़े chunks:
```javascript
fs.createReadStream("file.txt", {
    highWaterMark: 256 * 1024  // 256KB chunks
})
```

---

## 7. STREAMS के TYPES

### a) READABLE STREAM - data को read करना
- **Example**: `fs.createReadStream()`
- **Events**: 'data', 'end', 'error', 'pause', 'resume'

### b) WRITABLE STREAM - data को write करना
- **Example**: `fs.createWriteStream()`, response object
- **Methods**: `write()`, `end()`

### c) TRANSFORM STREAM - data को modify करते हुए pass करना
- **Example**: `zlib.createGzip()`, crypto streams
```
in ──transform──> out
```

---

## 8. REAL-WORLD USE CASES

✅ **Video Streaming** - YouTube, Netflix  
✅ **File Downloads** - बड़ी files download करना  
✅ **Database Queries** - बहुत सारे records को stream करना  
✅ **Log Processing** - बड़े log files को parse करना  
✅ **API Responses** - बड़े JSON responses भेजना

---

## 9. KEY TAKEAWAY

❌ **AVOID**: पूरी file को memory में एक बार load करना  
✅ **USE**: Streams और chunks का use करके memory बचाना

**Memory-Efficient Code = Fast Server = Happy Users! 🚀**
