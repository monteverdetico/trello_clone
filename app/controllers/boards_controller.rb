class BoardsController < ApplicationController
  before_filter :require_current_user!
  respond_to :json
  
  def create
    
  end
  
  def destroy
    
  end
  
  def index
    @boards = current_user.boards
    render :json => @boards
  end
  
  def show
    
  end
end
