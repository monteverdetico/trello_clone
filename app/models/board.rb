class Board < ActiveRecord::Base
  attr_accessible :title, :user_id
  validates :title, :user_id, :presence => true
  
  belongs_to :user
  
  has_many :lists,
           :dependent => :destroy
  
  has_many :board_members,
           :class_name => "BoardMember",
           :primary_key => :id,
           :foreign_key => :board_id
           
  has_many :members,
           :through => :board_members,
           :source => :user         
end
