class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id, :null => false
      t.integer :card_id, :null => false
      t.text :body, :null => false

      t.timestamps
    end
    
    add_index :comments, :user_id
    add_index :comments, :card_id
  end
end
