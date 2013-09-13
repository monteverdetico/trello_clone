class List < ActiveRecord::Base
  attr_accessible :board_id, :title, :position
  validates :board_id, :title, :presence => true
  
  belongs_to :board
  has_many :cards,
           :dependent => :destroy
end
