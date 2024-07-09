const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]

const url =
`mongodb+srv://peogway2403:${password}@cluster0.3alumgy.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    })
    const Person = mongoose.model('Person', personSchema)
    if (process.argv.length === 3 ) {
      Person.find({})
        .then(result => {
          console.log('phonebook:')
          result.forEach(person => {
            console.log(person.name, person.number)
          })
          mongoose.connection.close()
        })

    }else{
      const person = new Person({
        name : process.argv[3],
        number : process.argv[4],
      })

      person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phone book`)
        mongoose.connection.close()
      })
    }
  })
  .catch((error) => {console.log(error.errorResponse.errmsg)})

