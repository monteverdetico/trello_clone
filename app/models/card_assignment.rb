class CardAssignment < ActiveRecord::Base
  attr_accessible :card_id, :user_id
  validates :card_id, :user_id, :presence => true
  
  belongs_to :user
  belongs_to :card
end
