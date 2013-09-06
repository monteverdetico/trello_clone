collection @lists
attributes :title, :board_id, :id, :position
	
child :cards do
	attributes :body, :list_id, :id, :position
end