const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let phonebook = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
    }
  ]

  app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${phonebook.length} people</p>
    <p>${date}</p>`)
  })

  app.get('/api/persons', (request, response) => {
    response.json(phonebook)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = phonebook.find(contact => contact.id === id)
    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
  })

  const generateId = () => {
    const id = Math.floor(Math.random() * 1000)
    return id
  }

  const personExists = (name) => {
    const duplicate = phonebook.find(contact => contact.name === name)
    if (duplicate) {
        return true
    } else return false
}
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    } else if (!body.number) {
    return response.status(400).json({ 
        error: 'number missing' 
      })
    } else if (personExists(body.name)) {
        return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const contact = {
      id: generateId(),
      name: body.name,
      number: body.number
    }
  
    phonebook = phonebook.concat(contact)
  
    response.json(contact)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(contact => contact.id !== id)

    response.status(204).end()
  })  

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)