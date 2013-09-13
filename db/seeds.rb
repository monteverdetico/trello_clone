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
    email: "marcelo@mail.com"
  )
  
  tam = User.create!(username: "Tam",
    password: "password",
    email: "tam@mail.com")
    
  mike = User.create!(username: "Mike",
    password: "password",
    email: "mike@gmail.com")
    
  joe = User.create!(username: "Joe",
    password: "password",
    email: "joe@mail.com")
    
  bob = User.create!(username: "Bob",
    password: "password",
    email: "bob@mail.com")
    
  
  board1 = marcelo.boards.create!(title: "Demo")
  
  list1 = board1.lists.create!(title: "To Do", position: 0)
  list2 = board1.lists.create!(title: "Doing", position: 1)
  list3 = board1.lists.create!(title: "Done", position: 2)
  
  card1 = list1.cards.create!(body: "drag me to another board", position: 0)
  card2 = list1.cards.create!(body: "drag me up or down", position: 1)
  card3 = list1.cards.create!(body: "click on me to add comments", position: 2)
  
  comment1 = card3.comments.create!(user_id: 1, body: "this is the first comment")
end