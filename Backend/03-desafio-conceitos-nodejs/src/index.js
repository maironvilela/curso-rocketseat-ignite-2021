const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

  const users = [];

function checksExistsUserAccount(request, response, next) {
  const {username} = request.headers;

  const user = users.find(user => user.username === username)

  if(!user){
    response.status(404).json({error: 'user not found'})
  }

  request.user = user;

  return next();
 
}
 

app.post('/users', (request, response) => {
  const {name, username} = request.body;

   const isUserExists =  users.some((user) => user.username === username);

   if(isUserExists){
    response.status(400).json({ error: 'Username informed already registered' });

   }

  const index =users.push({
    id: uuidv4(),
    name,
    username,
    todos:[],
  })

  response.status(201).json(users[index-1])

 });

app.get('/todos', checksExistsUserAccount, (request, response) => {
  
  const user = request.user;

  response.status(200).json(user.todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
   const {title, deadline} = request.body;

   const user = request.user;

   const indexTodo = user.todos.push({
    id: uuidv4(), 
    title,
    done: false, 
    deadline: new Date(deadline), 
    created_at: new Date()
   }) 
 
   response.status(201).json(user.todos[indexTodo-1])
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const {id} = request.params;
  const {title, deadline} = request.body;

  const user = request.user;

  const todo = user.todos.find(todo => todo.id === id);

  if(!todo){
    response.status(404).json({error: 'todo not found'})
  }

  todo.title = title;
  todo.deadline = new Date(deadline)
  response.json(todo)
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const {id} = request.params;

  const user = request.user;

  const todo = user.todos.find(todo => todo.id === id);

  if(!todo){
    response.status(404).json({error: 'todo not found'})
  }

  todo.done = true;

  response.status(200).json(todo)
 });

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {  
  const {id} = request.params;
  const user = request.user;

  const todo = user.todos.find(todo => todo.id === id);

  if(!todo){
    response.status(404).json({error: 'todo not found'})
  }
  
  const index = user.todos.findIndex(todo => todo.id === todo.id) ;
  user.todos.splice(index, 1)
 
  response.status(204).send();
});

module.exports = app;