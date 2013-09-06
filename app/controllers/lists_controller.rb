class ListsController < ApplicationController
  def create
    @list = List.new(params[:list])
    @list.position = set_starting_position(params[:board_id])
    
    if @list.save
      render :json => @list
    else
      render :json => @list.errors.full_messages, :status => 422
    end 
  end
  
  def update
    @list = List.find(params[:id])

    if @list.update_attributes(params[:list])
      render :updated_list
    else
      render :json => @list.errors.full_messages, :status => 422
    end  
  end
  
  private
  def set_starting_position(board_id)
    Board.find(board_id).lists.count
  end
end
