class BoardmembersController < ApplicationController
  def create
    board_id = params[:board_id]
    user_id = User.find_by_username(params[:username]).id
    
    BoardMember.create!(:board_id => board_id, :user_id => user_id)
    
    render :json => {:username => params[:username], :id => user_id}
  end
end
