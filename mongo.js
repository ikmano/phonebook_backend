const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://hitch272:${password}@cluster0.d4aaepd.mongodb.net/phonebook?retryWrites=true&w=majority`;

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 4) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("connected");
      Person.find({}).then((result) => {
        result.forEach((person) => {
          console.log(person);
        });
        return mongoose.connection.close();
      });
    })
    .catch((error) => console.log(error));
} else {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        name: name,
        number: number,
      });

      return person.save();
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
