object @board
attributes :title, :user_id, :id, :created_at, :updated_at

child :lists do
	attributes :title, :board_id, :id
end