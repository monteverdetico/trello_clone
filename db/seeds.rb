# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
ActiveRecord::Base.transaction do
  marcelo = User.create!(username: "Mr. Demo", 
    password: "password", 
    email: "demo@mail.com"
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
    
  kate = User.create!(username: "Kate",
    password: "password",
    email: "kate@mail.com")
    
  sally = User.create!(username: "Sally",
    password: "password",
    email: "sally@mail.com")
    
  adrian = User.create!(username: "Adrian",
    password: "password",
    email: "Adrian@mail.com")  
    
  
  board1 = marcelo.boards.create!(title: "Demo")
  
  list1 = board1.lists.create!(title: "To Do", position: 0)
  list2 = board1.lists.create!(title: "Doing", position: 1)
  list3 = board1.lists.create!(title: "Done", position: 2)
  list4 = board1.lists.create!(title: "Delete Me!", position: 3)
  
  card1 = list1.cards.create!(body: "drag me to another board", position: 0)
  card2 = list1.cards.create!(body: "drag me up or down", position: 1)
  card3 = list1.cards.create!(body: "click on me to add comments", position: 2)
  card4 = list3.cards.create!(body: "click on the list title to edit", position: 0)
  card5 = list2.cards.create!(body: "click on the board title to edit board title", position: 0)
  card6 = list3.cards.create!(body: "add a member!", position:1)
  
  comment1 = card3.comments.create!(user_id: 1, body: "this is the first comment")
  comment2 = card6.comments.create!(user_id: 2, body: "search for members under board members")
  comment3 = card6.comments.create!(user_id: 2, body: "demo users to search for: Joe, Bob, Kate, Sally...")
end