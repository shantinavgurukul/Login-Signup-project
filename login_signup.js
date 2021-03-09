const fs = require("fs");
const { resolve } = require("path");
const readlineSync = require("readline-sync")
const updatesData = require('./finalDetails.json')
function password_validations(password){
    return new Promise((resolve,reject) =>{
        var check =0;
        if(password.includes("@") || password.includes("#")){
            // var i =0;
            for(var i =0;i<10;i++){
                if(password.includes(i)){
                    check=1
                    break;
                }
            }
        
        if (check==0){
            reject(false)
        }
        else{
            resolve("Succesfull password")
        }
    }else{
        reject("Invalid password")
        
    }
    })
}
// password_validations().then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })
var user = readlineSync.question("what you want to do sign-up/login=")

if(user == "S" || user == "s"){
    const readlineSync = require("readline-sync")
    var user_name = readlineSync.question("Enter the name=")
    var user_password = readlineSync.question("Enter the password=")
    var user_password2 = readlineSync.question("Enter the password2=")
    var discraption = readlineSync.question("Enter the discription ")
    
    var DOB = readlineSync.question("Enter the DOB=")
    var Gender = readlineSync.question("Enter the Gender=")
    if(user_password==user_password2){
        password_validations(user_password)
        .then((res) => {
            console.log(res)

        }).catch((err)=>{
            console.log(err)
        })

    }
    var dic = {}
    dic["discraption"]= discraption
    var user_details = {
        "name" : user_name,
        "password": user_password,
        "profils":dic,
        "DOB": DOB,
        "Gender": Gender,
    }
    // console.log(user_details)
    
    var writeJsonData = JSON.stringify(user_details)
    var  file = fs.readFileSync('./finalDetails.json',"utf8")
    var jsonFile = JSON.parse(file)
    let flag=false
            for(let i =0; i<jsonFile.length;i++){
                if(jsonFile[i].name == user_details.name ){
                    flag=true
                    break;
                }
            }
            if(flag){
                console.log("Already -exit")
            }
            else{
                console.log("Signup successfully ")
                const writeFilePromise = (fileName, data) => {
                    return new Promise((resolve, reject) => {
                        jsonFile.push(user_details)
                        // console.log(jsonFile)
                        fs.writeFileSync(fileName, JSON.stringify(jsonFile)) 
                        resolve(data)
                });
                };
                writeFilePromise("finalDetails.json",writeJsonData)
                .then((result) => {
                console.log(result)
                })
                .catch((error) => {
                    console.log(error)
                });
            }
        }
else if(user == "L" || user =="l"){

    const user_name = readlineSync.question("Enter the user new name =")
    const user_password = readlineSync.question("Enter the user new password=")

    fs.readFile("./finalDetails.json","utf8",(err ,data)=>{
        if (err){
            throw err
        }
        let check =false;
        for (let i =0 ; i<updatesData.length;i++){
            if (user_name == updatesData[i].name && user_password == updatesData[i].password){
                check =  true;
                break;
            }
        }
        if(check){
            console.log("login successfully")
        }
        else{
            console.log("password is wrong")
           
        }
     
})
}

// const readFilePromise = (fileName) =>{
//     return new Promise((resolve,reject) =>{
//         jsonData = fs.readFileSync(fileName,"utf8")
//         data = JSON.parse(jsonData);
//         resolve(data);
        
//         })
// }
// readFilePromise("finalDetails.json")
// .then((res) => {
//     console.log(res)

// }).catch((err) =>{
//     console.log(err)
// })

