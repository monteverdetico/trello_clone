object @board
attributes :title, :user_id, :id

child :lists do
	attributes :title, :board_id, :id, :position
	
	child :cards do
		attributes :body, :list_id, :id, :position
		
		child :card_assignments do
			attributes :id, :user_id, :card_id
		end
	
		code :assigned_to do |card|
			member = card.assigned_members.first
			member.try(:username)
		end
		
		code :avatar_url do |card|
			member = card.assigned_members.first
			member.try(:avatar_url)
		end
		
		child :comments do
			attributes :user_id, :card_id, :body, :created_at
		end
	end
end

child :members => :members do
	attributes :id, :username, :avatar_url
end