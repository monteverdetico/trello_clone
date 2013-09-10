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
  
  def index
    @boards = current_user.boards
    render :index
  end
  
  def positions
    @board = Board.find(params[:id])
    @lists = @board.lists
    new_positions = params[:positions]

    @lists.each do |list|
      list.position = new_positions[list.id.to_s]
      list.save!
    end
    
    render :positions           
  end
  
  def update
    @board = Board.find(params[:id])
    
    if @board.update_attributes({:title => params[:title]})
      render :updated_board
    else
      render :json => @board.errors.full_messages, :status => 422
    end  
    
  end
end
