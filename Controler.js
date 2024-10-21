const express = require("express");
const mysql2 = require("mysql2");
const cors = require('cors');

const app= express(); 
const PORT = 3000; 
const cond = require("./cond"); 

app.use(cors());
app.use(express.json()); 


//listar 
app.get('/api/producto', (soli, respuesta)=>{
    
    const sql = 'SELECT * FROM producto';  
    cond.query(sql, (error, resultado)=>{
        if(error){
            console.log("Error" , error); 
            return respuesta.status(500).set('Error en el servidor')
        }else{
            console.log("Listado"); 
            return  respuesta.status(200).send(resultado);
        }
    });     
}
); 

// INSERTAR

app.post('/api/producto',(solicitud, respuesta)=>{
    const sql = 'INSERT INTO PRODUCTO(NOMBRE, PRECIO, CANTIDAD) VALUES(?,?,?)';
    const { nombre, precio ,cantidad} = solicitud.body;

    cond.query(sql, [nombre, precio, cantidad], (error, resultado)=>{
        if(error){
            console.log('ERROR', error);

        }else{
            console.log('CREADO');
            return  respuesta.status(201).send({nombre, precio, cantidad});         
        }
    });

});

// EDITAR

app.put('/api/producto/:id', (solicitud, respusta)=>{
    const sql= 'UPDATE PRODUCTO SET NOMBRE = ?, PRECIO = ?, x= ? WHERE IDPRODUCTO = ? ';
    const {id} = solicitud.params; 
    const {nombre, precio, cantidad } = solicitud.body; 

    cond.query(sql, [nombre, precio, cantidad, id], (error, resultado)=>{
        if(error){
            console.log("ERROR", error);
            return respusta.send("Error en el servidor");
        }else if (resultado.affectedRows===0){
            console.log("Producto no encontado");
            return respusta.status(404).send("Producto no encontrado")

        }else{
            console.log("EDITADO");
            return respusta.send({nombre, precio, cantidad}); 
        }

    });

});

// ELIMINAR

app.delete('/api/producto/:id',(solicitud, respuesta)=>{

    const sql = 'DELETE FROM PRODUCTO WHERE IDPRODUCTO =  ? ';
    const {id} = solicitud.params

    cond.query(sql, [id], (error, resultado)=>{
        if(error){
            console.log('Error' , error);
        }else if(resultado.affectedRows===0){
            console.log("No se encontro el producto")
            return respuesta.status(404).send("No se encontro producto")
        }else{
            console.log("ELIMINADO");
            return respuesta.send('ELIMINADO'); 
        }

    });
    
});


app.listen(PORT);
