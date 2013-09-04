class ListsController < ApplicationController
  def create
    @list = List.new(params[:list])
    
    if @list.save
      render :json => @list
    else
      render :json => @list.errors.full_messages, :status => 422
    end 
  end
end
