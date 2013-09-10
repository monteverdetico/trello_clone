class CardsController < ApplicationController

  def create
    @card = Card.new(params[:card])
    @card.position = set_starting_position(params[:list_id])
    
    if @card.save
      render :json => @card
    else
      render :json => @card.errors.full_messages
    end
  end
  
  def destroy
    # TODO: write me!!
  end
  
  def update
    # TODO: write me!!
  end
  
  private
  def set_starting_position(list_id)
    List.find(list_id).cards.count
  end
end
