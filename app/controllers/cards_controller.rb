class CardsController < ApplicationController

  def create
    @card = Card.new(params[:card])
    
    if @card.save
      render :json => @card
    else
      render :json => @card.errors.full_messages
    end
  end
end
