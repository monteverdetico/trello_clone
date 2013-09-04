class Card < ActiveRecord::Base
  attr_accessible :body, :list_id
  validates :body, :list_id, :presence => true
  
  belongs_to :list
end
