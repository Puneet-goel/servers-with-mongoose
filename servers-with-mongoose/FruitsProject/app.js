const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser: true, useUnifiedTopology: true } );

const fruitSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true, "please check your data entry, no name specified"]
  },
  rating : {
    type : Number,
    min : 1,
    max : 10
  },
  review : String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
  name : 'Apple',
  rating : 10,
  review : "Pretty solid as a fruit"
});

//apple.save();

const peach = new Fruit({
  name : 'Peach',
  rating : 9,
  review : "Tasty fruit"
});

//peach.save();


const personSchema = new mongoose.Schema({
	name : String,
	age : Number,
  favouriteFruit : fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name : 'Pineapple',
  rating : 4,
  review : "Great fruit."
});

//pineapple.save();

const mango = new Fruit({
  name : 'Mango',
  rating : 10,
  review : "king fruit."
});

//mango.save();
const person = new Person({
	name : "Amy",
	age : 12,
  favouriteFruit : pineapple 
});

//person.save();

const kiwi = new Fruit({
  name : 'Kiwi',
  rating : 5,
  review : "Sour"
});
const Orange = new Fruit({
  name : 'Orange',
  rating : 6,
  review : "Best"
});
const banana = new Fruit({
  name : 'Banana',
  rating : 4,
  review : "Weird Texture"
});

// Fruit.insertMany([kiwi,Orange,banana],function(err){
// 	if(err)
// 	{
// 		console.log(err);
// 	}
// 	else
// 	{
// 		console.log("Successfully added all fruits");
// 	}
// });


Fruit.find(function(err, fruits){
  if(err)
    console.lof(err);
  else
  {
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne({_id : "607457896d9a180d6ce9e8d6"},{name : 'Peach'},function(err){
//   if(err)
//     console.log(err);
//   else
//     console.log("Successfully updated details");
// });


// Fruit.deleteOne({ name : "Peach"},function(err){
//   if(err)
//     console.log(err);
//   else
//     console.log("Successfully deleted details");
// });

// Person.deleteMany({name : "John"},function(err){
//   if(err)
//    conole.log(err);
//   else 
//    console.log("Successfully deleted");   
// });

// Person.updateOne({name:"John"},{favouriteFruit : mango },function(err){
//   if(err)
//    conole.log(err);
//   else 
//    console.log("Successfully updated");
// });