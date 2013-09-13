# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
ActiveRecord::Base.transaction do
  marcelo = User.create!(username: "Marcelo", 
    password: "password", 
    email: "marceloguindon@gmail.com"
  )
  
  tam = User.create!(username: "Tam",
    password: "password",
    email: "tam@mail.com")
    
  mike = User.create!(username: "Mike",
    password: "password",
    email: "mike@gmail.com")
    
  Joe = User.create!(username: "Joe",
    password: "password",
    email: "joe@mail.com")
    
  bob = User.create!(username: "Bob",
    password: "password",
    email: "bob@mail.com")
    
  
  board1 = marcelo.boards.create!(title: "App Academy")
  
  list1 = board1.lists.create!(title: "To Do", position: 0)
  list2 = board1.lists.create!(title: "Doing", position: 1)
  list3 = board1.lists.create!(title: "Done", position: 2)
end