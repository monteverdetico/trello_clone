class ListsController < ApplicationController
  before_filter :require_current_user!
  respond_to :json
  
  def create
    @list = List.new(params[:list])
    @list.position = set_starting_position(params[:board_id])
    
    if @list.save
      render :json => @list
    else
      render :json => @list.errors.full_messages, :status => 422
    end 
  end
  
  def destroy
    List.destroy(params[:id])
    head :ok
  end
  
  def update
    @list = List.find(params[:id])

    if @list.update_attributes(params[:list])
      render :updated_list
    else
      render :json => @list.errors.full_messages, :status => 422
    end  
  end
  
  # route to update card positions in a list
  def positions
    @list = List.find(params[:id])
    @cards = []
    old_cards = @list.cards
    new_positions = params[:positions] || {}
    
    old_cards.each do |card|
      card.position = new_positions[card.id.to_s]
      
      if card.position
        @cards << card
        card.save!
      end
    end
    
    if params[:card]
      card_id = params[:card]["id"]
      new_card = Card.update(card_id, :list_id => params[:id],
        :position => new_positions[card_id])
        
      @cards << new_card
    end
    
    render :positions    
  end
  
  private
  def set_starting_position(board_id)
    Board.find(board_id).lists.count
  end
end
