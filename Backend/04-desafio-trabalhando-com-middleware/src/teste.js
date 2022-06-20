const { v4: uuidv4, validate } = require('uuid');

 
const user = {
  id: '236655',
  name: "Maria da Silva",
  username: 'msilva',
  pro: false,
  todos: [1,2,3,4,5,6,7,8]
}
 

console.log(validate(user.id))


