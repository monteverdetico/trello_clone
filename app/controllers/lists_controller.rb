class ListsController < ApplicationController
  def create
    @list = List.new(params[:list])
    
    if @list.save
      render :json => @list
    else
      render :json => @list.errors.full_messages, :status => 422
    end 
  end
  
  def update
    if List.update(params[:id], params[:list])
      # TODO: modify json in rabl to parse properly
      render :json => @
    else
      render :json => @list.errors.full_messages, :status => 422
    end  
  end
end
