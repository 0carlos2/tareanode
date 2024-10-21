const mysql= require("mysql2");

const con= mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "123456",
    database: "bdnode2"

});

con.connect((ss)=>{
    if(ss){
        console.log(ss);
    }else{
        console.log("Conectado")
    }
});

module.exports= con; 