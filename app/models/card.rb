class Card < ActiveRecord::Base
  attr_accessible :body, :list_id, :position
  validates :body, :list_id, :presence => true
  
  belongs_to :list
  has_many :card_assignments  
  has_many :assigned_members,
           :through => :card_assignments,
           :source => :user
  has_many :comments,
           :dependent => :destroy
end
