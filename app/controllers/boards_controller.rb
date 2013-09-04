class BoardsController < ApplicationController
  before_filter :require_current_user!
  respond_to :json
  
  def create
    @board = Board.new(:title => params[:title], :user_id => params[:user_id])

    if @board.save
      render :json => @board
    else
      render :json => @board.errors.full_messages, :status => 422
    end
  end
  
  def destroy
    # TODO: the user that destroys must be the board creator
  end
  
  def index
    @boards = current_user.boards
    render :index
  end
end
