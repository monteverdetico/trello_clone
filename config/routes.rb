TrelloClone::Application.routes.draw do
  resources :boardmembers, :only => [:create]
  resources :cards, :only => [:create, :destroy]
  resources :cardassignments, :only => [:create, :update, :destroy]
  resources :comments, :only => [:create]
  
  resources :lists, :only => [:create, :update, :destroy] do
    put "positions", :on => :member
  end
  
  resource :session, :only => [:create, :new, :destroy]
  
  resources :users, :only => [:create, :destroy, :index, :new, :update] do
    resources :boards, :only => [:index, :create]
    resources :boards, :only => [:update] do
      put "positions", :on => :member
    end
  end
  
  root :to => "root#root"
end
