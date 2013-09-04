class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.text :body, :null => false
      t.integer :list_id, :null => false

      t.timestamps
    end
    
    add_index :cards, :list_id
  end
end
