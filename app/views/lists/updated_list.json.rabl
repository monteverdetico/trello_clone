object @list
attributes :title, :board_id, :id

child :cards do
	attributes :body, :list_id, :id
	
	child :card_assignments do
		attributes :id, :user_id, :card_id
	end
	
	code :assigned_to do |card|
		member = card.assigned_members.first
		member.try(:username)
	end
	
	child :comments do
		attributes :user_id, :card_id, :body, :created_at
	end
end