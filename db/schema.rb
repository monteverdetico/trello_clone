# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130910210807) do

  create_table "board_members", :force => true do |t|
    t.integer  "user_id"
    t.integer  "board_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "boards", :force => true do |t|
    t.string   "title",      :null => false
    t.integer  "user_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "boards", ["user_id"], :name => "index_boards_on_user_id"

  create_table "cards", :force => true do |t|
    t.text     "body",       :null => false
    t.integer  "list_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "position",   :null => false
  end

  add_index "cards", ["list_id"], :name => "index_cards_on_list_id"

  create_table "comments", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "card_id",    :null => false
    t.text     "body",       :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "comments", ["card_id"], :name => "index_comments_on_card_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "lists", :force => true do |t|
    t.string   "title",      :null => false
    t.integer  "board_id",   :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "position",   :null => false
  end

  add_index "lists", ["board_id"], :name => "index_lists_on_board_id"

  create_table "users", :force => true do |t|
    t.string   "username",        :null => false
    t.string   "email",           :null => false
    t.string   "password_digest", :null => false
    t.string   "session_token",   :null => false
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

end
