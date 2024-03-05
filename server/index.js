const express = require("express");
const app = express();
const mysql = require("mysql");
const cors=require("cors");

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"SDGP_CRUD"
});

app.post("/create",(req,res)=>{
    const nombre=req.body.nombre
    const edad=req.body.edad
    const pais=req.body.pais
    const cargo=req.body.cargo
    const anios=req.body.anios

    db.query('INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/empleados",(req,res)=>{
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const idempleados=req.body.idempleados
    const nombre=req.body.nombre
    const edad=req.body.edad
    const pais=req.body.pais
    const cargo=req.body.cargo
    const anios=req.body.anios

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE idempleados=?',[nombre,edad,pais,cargo,anios,idempleados],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.delete("/delete/:idempleados",(req,res)=>{
    const idempleados=req.params.idempleados;

    db.query('DELETE FROM empleados WHERE idempleados=?',[idempleados],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})