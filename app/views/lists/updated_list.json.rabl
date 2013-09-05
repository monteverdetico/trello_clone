object @list
attributes :title, :board_id, :id

child :cards do
	attributes :body, :list_id, :id
end