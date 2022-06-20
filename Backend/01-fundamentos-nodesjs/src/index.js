const express = require("express");

const app = express();
app.use(express.json())

app.get('/users', (request, response) =>{
  const {page, size} = request.query;
   return response.json({page,size})
});

app.get('/users/:id', (request, response) =>{
  const id = request.params;
  return response.json(id)
});

app.post('/users', (request, response) =>{
  const {name, email} = request.body;
  console.log(response.body)
  return response.json({name, email})
}); 

app.put('/users/:id', (request, response) =>{
  return response.json({metod: "Metodo HTTP PUT"})
});

app.delete('/users/:id', (request, response) =>{
  return response.json({metod: "Metodo HTTP DELETE"})
});

app.listen(3333,()=>{
  console.log("App rodando na porta 3333")
})

