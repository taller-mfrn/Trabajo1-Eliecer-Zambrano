const fastify = require('fastify')();

fastify.register(require('fastify-mysql'), {
  promise: true,
  connectionString: 'mysql://root@localhost/gente'
})

fastify.get('/', (request, reply) => {
    reply.send("Hola!, prueba a usar alguna funcion del README")
  })


fastify.get('/detalle/:id', async (req, reply) => {
  console.log(req.params);
  const connection = await fastify.mysql.getConnection()
  const [rows, fields] = await connection.query(
    `SELECT * FROM personas WHERE personas.id =${req.params.id}`
    )
  connection.release()
  return rows[0]
})

fastify.get('/nombre/:id', async (req, reply) => {
  console.log(req.params);
  const connection = await fastify.mysql.getConnection()
  const [rows, fields] = await connection.query(
    `SELECT nombre FROM personas WHERE personas.id =${req.params.id}`
    )
  connection.release()
  return rows[0]
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})

