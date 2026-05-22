// listen 


const eventEmmiter = require("events")
const fs = require("fs")

const userEmmiter = new eventEmmiter()

// Q. Listing for multiple types of user events (eg. Login , Logout, Purches, Pofile_updates)


//  maintain how much time which events trigger

let eventsCounter = {
    login:0,
    logout:0,
    purches:0,
    profileUpdates:0
}



//  ceating file for metainin our countes because manually server start and countFile data will be reset
const LogFile = "eventlog.json"

if(fs.existsSync(LogFile)){
    const data = fs.readFileSync(LogFile, "utf-8")
    Object.assign(eventsCounter, JSON.parse(data))
}

function saveCounters(){
    fs.writeFileSync(LogFile, JSON.stringify(eventsCounter, null , 2))
}



//  login user events 
userEmmiter.on("LOGIN",(username)=>{
    console.log(`${username} you are Login successfully 👍`)
    eventsCounter.login ++
    console.log("login event count : " , eventsCounter.login)
    saveCounters()
})

// logout User events 
userEmmiter.on("LOGOUT",(username)=>{
    console.log(`${username} you are Logout successfully ☠️`)
    eventsCounter.logout ++
    saveCounters()

})

// purches item
userEmmiter.on("PURCHASE",(userName, item)=>{
    console.log(`${userName} is purchased ${item}`)
    eventsCounter.purches++
    saveCounters()

})


// profile Updates 
userEmmiter.on("PROFILE_UPDATES",(username, fields)=>{
    console.log(`${username} updates this fields : ${fields}`)
    eventsCounter.profileUpdates++
    saveCounters()

})


//  events emit with different arguments

userEmmiter.emit("LOGIN","Krishna")
userEmmiter.emit("LOGOUT","Krishna")
userEmmiter.emit("PURCHASE","Krishna" ,"oppo phone")
userEmmiter.emit("PROFILE_UPDATES","Krishna" , "Email")



// q.  maintain a event summary which event call how much time

userEmmiter.on("SUMMARY",()=>{
    console.log(`\nEvents Summey :`)
    console.log(`Logins : ${eventsCounter.login}`)
    console.log(`logout : ${eventsCounter.logout}`)
    console.log(`purches : ${eventsCounter.purches}`)
    console.log(`profileUpdates : ${eventsCounter.profileUpdates}`)
})

userEmmiter.emit("SUMMARY") 


