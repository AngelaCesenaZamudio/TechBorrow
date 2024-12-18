const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const figlet = require('figlet')
const asciify = require('asciify-image')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))

const credentials = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'techborrow'
}

app.get('/', (req, res) => {
	res.send('Bienvenido, soy el servidor!')
})

app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const values = [username, password]
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM usuario WHERE correo = ? AND password = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					  "id": result[0].id,
					"matricula": result[0].matricula,
					 "nombre": result[0].nombre,
					"apellidoP": result[0].apellidoP,
					"apellidoM": result[0].apellidoM,
					"password": result[0].password,
					 "correo": result[0].correo,
					"fecha_registro": result[0].fecha_registro,
					"tipo": result[0].tipo,
					 "isAuth": true
			
				})
				
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})

app.get('/api/usuarios', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM usuario', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

app.post('/api/eliminar', (req, res) => {
	const { id } = req.body
	var connection = mysql.createConnection(credentials)
	connection.query('DELETE FROM usuario WHERE id = ?', id, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
		}
	})
	connection.end()
})

app.post('/api/guardar', (req, res) => {
	const { matricula, nombre, apellidoP, apellidoM, password, correo,fecha_registro,tipo } = req.body
	const params = [[matricula, nombre, apellidoP, apellidoM, password, correo,fecha_registro, tipo]]
	var connection = mysql.createConnection(credentials)
	connection.query('INSERT INTO usuario (matricula,nombre,apellidoP,apellidoM,password,correo,fecha_registro,tipo) VALUES ?', [params], (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario creado" })
		}
	})
	connection.end()
})

app.post('/api/editar', (req, res) => {
	const { id, matricula, nombre, apellidoP, apellidoM, password, correo } = req.body
	const params = [matricula, nombre, apellidoP, apellidoM, password, correo, id]
	var connection = mysql.createConnection(credentials)
	connection.query('UPDATE usuario set matricula = ?, nombre = ?, apellidoP = ?, apellidoM = ?, password = ?, correo = ? WHERE id = ?', params, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario editado" })
		}
	})
	connection.end()
})

app.listen(4000, async () => {
	const ascified = await asciify('helmet.png', { fit: 'box', width: 10, height: 10 })
	console.log(ascified)
	console.log(figlet.textSync('Inicia Servidor v. 1.0.0'))
})