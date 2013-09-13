class BoardmembersController < ApplicationController
  def create
    board_id = params[:board_id]
    user = User.find_by_username(params[:username])
    avatar_id = user.avatar_url
    
    BoardMember.create!(:board_id => board_id, :user_id => user.id)
    
    render :json => {:username => params[:username], :id => user.id, :avatar_url => user.avatar_url}
  end
end
