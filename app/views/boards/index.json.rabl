collection @boards
attributes :title, :user_id, :id, :created_at, :updated_at

child :lists do
	attributes :title, :board_id, :id
	
	child :cards do
		attributes :body, :list_id, :id
	end
end