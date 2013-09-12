class CardassignmentsController < ApplicationController
  def create
    @card_assignment = CardAssignment.new(params[:cardassignment])
    if @card_assignment.save
      render :json => @card_assignment
    else
      render :json => @card_assignment.errors.full_messages
    end
  end

  def update
    CardAssignment.update(params[:cardassignment][:id],
      :user_id => params[:cardassignment][:user_id])
    
    head :ok
  end

  def destroy
  end
end
