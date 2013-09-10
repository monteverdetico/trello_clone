collection @boards
attributes :title, :user_id, :id

child :lists do
	attributes :title, :board_id, :id, :position
	
	child :cards do
		attributes :body, :list_id, :id, :position
		
		child :comments do
			attributes :user_id, :card_id, :body
		end
	end
end