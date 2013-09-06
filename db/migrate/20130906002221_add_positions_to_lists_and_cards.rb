class AddPositionsToListsAndCards < ActiveRecord::Migration
  def change
    add_column :lists, :position, :integer, :null => false
    add_column :cards, :position, :integer, :null => false
  end
end
