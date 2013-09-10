object @board
attributes :title, :user_id, :id

child :lists do
	attributes :title, :board_id, :id, :position
	
	child :cards do
		attributes :body, :list_id, :id, :position
	end
end