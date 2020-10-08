const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'articulosdb'
  });

  connection.connect( (err) => {
    if(err) {
        throw err;
    } else {
        console.log('connection ok')
    }
  })

app.get('/', (req,res) => {
    res.send('hello world')

    const articulo = {
        descripcion: 'segundo producto',
        precio: 20.99,
        stock: 200
    }

    

});

// mostrar todos los articulos
app.get('/api/articulos', (req,res) => {
    connection.query('SELECT * FROM articulos', (err,rows) => {
        if(err) {
            throw err
        } else {
            res.send(rows)
        }
    })
})

//mostrar un solo articulo
app.get('/api/articulos/:id', (req,res) => {
    connection.query('SELECT * FROM articulos WHERE id = ?', [req.params.id], (err,row) => {
        if(err) {
            throw err
        } else {
            res.send(row)
            //res.send(row[0].descripcion) //mostrar un dato en espesifico del articulo
        }
    })
})

//creando un articulo
app.post('/api/articulos', (req,res) => {
    let articulo = {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock
    };

    var query = connection.query('INSERT INTO articulos SET ?', articulo, function (error, results) {
        if (error) {
            throw error;
        } else {
            res.send(results)
            console.log(query.sql);
        }

    });
    
})

// actualizar articulo
app.put('/api/articulos/:id', (req,res) => {
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;

    let sql = 'UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?';
    connection.query(sql, [descripcion,precio,stock,id], function(err,resul) {
        if (err) {
            throw error;
        } else {
            res.send(resul)
        }
    })
})


app.delete('/api/articulos/:id', (req,res) => {
    connection.query('DELETE FROM articulos WHERE id = ?', [req.params.id], function(err, resul) {
        if (err) {
            throw error;
        } else {
            res.send(resul)
        }
    })
})


const puerto = process.env.PUERTO || 3000;

app.listen(puerto, () => {
    console.log('server ok' + puerto)
})