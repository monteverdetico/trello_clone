class AddAvatarUrl < ActiveRecord::Migration
  def change
    add_column :users, :avatar_url, :string, :null => false
  end
end
