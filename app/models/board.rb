class Board < ActiveRecord::Base
  attr_accessible :title, :user_id
  validates :title, :user_id, :presence => true
  # TODO: add unique :title, :scope => :user_id
  
  belongs_to :user
  
  has_many :lists
  
  has_many :board_members,
           :class_name => "BoardMember",
           :primary_key => :id,
           :foreign_key => :board_id
           
  has_many :members,
           :through => :board_members,
           :source => :user         
end