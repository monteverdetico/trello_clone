class RootController < ApplicationController
  before_filter :require_current_user!
  
  def root
    @boards = current_user.boards
    membership_boards = current_user.memberships
    @boards += membership_boards
    
    render :root
  end
end
