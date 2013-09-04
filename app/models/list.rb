class List < ActiveRecord::Base
  attr_accessible :board_id, :title
  validates :board_id, :title, :presence => true
  
  belongs_to :board
  has_many :cards 
end
