class BoardMember < ActiveRecord::Base
  attr_accessible :board_id, :user_id
  validates :board_id, :user_id, :presence => true
  
  belongs_to :board
  belongs_to :user  
end
