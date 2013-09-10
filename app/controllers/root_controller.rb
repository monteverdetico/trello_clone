class RootController < ApplicationController
  before_filter :require_current_user!
  
  def root
    @boards = current_user.boards
    render :root
  end
end
