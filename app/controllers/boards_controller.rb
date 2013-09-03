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
    
  end
  
  def index
    @boards = current_user.boards
    render :json => @boards
  end
  
  def show
    @board = current_user.boards.where("board_id = ?", params[:board_id])
    render :json => @board
  end
end
