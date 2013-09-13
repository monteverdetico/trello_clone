object @board
attributes :title, :user_id, :id, :created_at, :updated_at

child :lists do
	attributes :title, :board_id, :id
	
	child :cards do
		attributes :body, :list_id, :id, :position
		
		child :comments do
			attributes :user_id, :card_id, :body, :created_at
		end
	end
end

child :members => :members do
	attributes :id, :username
end

