# Day-3 Notes - Events in Node.js

## Overview
Day-3 focuses on **Event Emitter** in Node.js - a fundamental concept for building asynchronous applications. Events are at the core of Node.js programming model.

---

## 1. Path Module Basics

### What is the Path Module?
The `path` module provides utilities for working with file and directory paths across different operating systems.

### Key Methods:

#### `path.join()`
- Combines path segments into a single path
- Handles separators automatically (\ on Windows, / on Unix)
```javascript
const path = require("path");
const filePath = path.join("folder", "student", "data.txt");
// Output: folder/student/data.txt
```

#### `path.parse()`
- Parses a file path and returns an object
```javascript
const parsed = path.parse("folder/student/data.txt");
// Returns: { root, dir, base, ext, name }
```

#### `path.resolve()`
- Returns absolute path from relative path
```javascript
const absolute = path.resolve(filePath);
```

#### `path.extname()`
- Returns file extension
```javascript
path.extname("data.txt"); // ".txt"
```

#### `path.basename()`
- Returns last portion of path (filename)
```javascript
path.basename("folder/student/data.txt"); // "data.txt"
```

#### `path.dirname()`
- Returns directory name of path
```javascript
path.dirname("folder/student/data.txt"); // "folder/student"
```

---

## 2. EventEmitter - Core Concepts

### What is EventEmitter?
EventEmitter is a Node.js module that allows you to:
- Create custom events
- Listen for events
- Trigger/emit events
- Handle multiple events simultaneously

### Import EventEmitter:
```javascript
const EventEmitter = require("events");
const emitter = new EventEmitter();
```

### Key Methods:

#### `on(eventName, listener)`
- Registers a listener function for an event
- The listener executes when the event is emitted
```javascript
emitter.on("GREETEVENT", () => {
    console.log("Hello from Node.js events!");
});
```

#### `emit(eventName, [args])`
- Triggers/fires an event
- Can pass arguments to listener functions
```javascript
emitter.emit("GREETEVENT");
```

### Example with Arguments:
```javascript
// Create event with argument
emitter.on("ARGGREET", (args) => {
    console.log(`Hello ${args.userName}, your ID is: ${args.id}`);
});

// Emit event with data
emitter.emit("ARGGREET", {
    userName: "Krishna",
    id: "ad4542af54a2354aaf"
});
```

---

## 3. Practical Application - Task.js

### Real-World Use Case: User Event Tracking System

**Problem Statement:**
Create a system that tracks multiple user events (Login, Logout, Purchase, Profile Updates) and maintains a persistent counter in a JSON file.

### Implementation Details:

#### 1. Event Counter Object
```javascript
let eventsCounter = {
    login: 0,
    logout: 0,
    purches: 0,
    profileUpdates: 0
};
```

#### 2. Persistent Storage (File System)
```javascript
const LogFile = "eventlog.json";

// Load existing data if file exists
if(fs.existsSync(LogFile)){
    const data = fs.readFileSync(LogFile, "utf-8");
    Object.assign(eventsCounter, JSON.parse(data));
}

// Save counter to file
function saveCounters(){
    fs.writeFileSync(LogFile, JSON.stringify(eventsCounter, null, 2));
}
```

**Why persistent storage?**
- Without file storage, all counters reset when server restarts
- With file storage, event data persists across sessions

#### 3. User Events Implementation

**LOGIN Event:**
```javascript
userEmmiter.on("LOGIN", (username) => {
    console.log(`${username} you are Login successfully 👍`);
    eventsCounter.login++;
    saveCounters();
});
```

**LOGOUT Event:**
```javascript
userEmmiter.on("LOGOUT", (username) => {
    console.log(`${username} you are Logout successfully ☠️`);
    eventsCounter.logout++;
    saveCounters();
});
```

**PURCHASE Event:**
```javascript
userEmmiter.on("PURCHASE", (userName, item) => {
    console.log(`${userName} is purchased ${item}`);
    eventsCounter.purches++;
    saveCounters();
});
```

**PROFILE_UPDATES Event:**
```javascript
userEmmiter.on("PROFILE_UPDATES", (username, fields) => {
    console.log(`${username} updates this fields: ${fields}`);
    eventsCounter.profileUpdates++;
    saveCounters();
});
```

#### 4. Event Emission (Triggering Events)
```javascript
userEmmiter.emit("LOGIN", "Krishna");
userEmmiter.emit("LOGOUT", "Krishna");
userEmmiter.emit("PURCHASE", "Krishna", "oppo phone");
userEmmiter.emit("PROFILE_UPDATES", "Krishna", "Email");
```

#### 5. Event Summary
```javascript
userEmmiter.on("SUMMARY", () => {
    console.log(`\nEvents Summary:`);
    console.log(`Logins: ${eventsCounter.login}`);
    console.log(`Logouts: ${eventsCounter.logout}`);
    console.log(`Purchases: ${eventsCounter.purches}`);
    console.log(`Profile Updates: ${eventsCounter.profileUpdates}`);
});

userEmmiter.emit("SUMMARY");
```

---

## 4. Key Concepts Learned

### Event-Driven Architecture
- Decouples components through events
- Makes code more modular and maintainable
- Ideal for real-time applications

### Persistence
- `fs.existsSync()` - Check if file exists
- `fs.readFileSync()` - Read file synchronously
- `fs.writeFileSync()` - Write file synchronously
- `JSON.parse()` / `JSON.stringify()` - Convert between objects and JSON

### Object Spread
```javascript
Object.assign(target, source);
// Copies all properties from source to target
```

---

## 5. File Structure

```
Day-3/
├── index.js           (Basic EventEmitter concepts)
├── Task.js            (Advanced example: User event tracking)
├── eventlog.json      (Persistent counter storage)
├── package.json       (Project metadata)
├── README.md          (Brief overview)
└── NOTES.md           (This detailed guide)
```

---

## 6. How to Run

```bash
# Navigate to Day-3
cd Day-3

# Install dependencies (if any)
npm install

# Run basic examples
node index.js

# Run user event tracking system
node Task.js
```

---

## 7. Key Takeaways

✅ EventEmitter is the foundation of Node.js asynchronous programming
✅ Events allow loose coupling between different parts of application
✅ Can track multiple events and maintain counters
✅ Persistence (file storage) ensures data survives server restarts
✅ Perfect pattern for building user analytics, logging systems, real-time apps

---

## 8. Common Patterns

### Pattern 1: Simple Event Listener
```javascript
const emitter = new EventEmitter();
emitter.on("eventName", callback);
emitter.emit("eventName", data);
```

### Pattern 2: Multiple Arguments
```javascript
emitter.on("event", (arg1, arg2, arg3) => {
    // Handle multiple arguments
});

emitter.emit("event", val1, val2, val3);
```

### Pattern 3: Persistent Data
```javascript
// Save after each event
emitter.on("event", () => {
    updateData();
    saveToFile();
});
```

---

## 9. Real-World Applications

- **User Analytics** - Track user actions
- **Logger Systems** - Log events to files
- **Chat Applications** - Handle messages between users
- **Real-time Notifications** - Emit notifications to clients
- **Error Handling** - Emit and handle errors globally
- **Pub/Sub Systems** - Publish-subscribe architecture

---

## Notes
- Always ensure file paths exist before writing
- Use `JSON.stringify(obj, null, 2)` for readable JSON output
- Consider using `.on()` for permanent listeners
- Consider using `.once()` for one-time listeners (if you use it)
