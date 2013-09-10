class Card < ActiveRecord::Base
  attr_accessible :body, :list_id, :position
  validates :body, :list_id, :presence => true
  
  belongs_to :list
  has_many :comments,
           :dependent => :destroy
end
