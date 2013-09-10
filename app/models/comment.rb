class Comment < ActiveRecord::Base
  attr_accessible :body, :card_id, :user_id
  
  belongs_to :card
  belongs_to :user
end
