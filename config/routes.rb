TrelloClone::Application.routes.draw do
  resources :cards, :only => [:create, :update]
  resources :lists, :only => [:create, :update]
  resource :session, :only => [:create, :new, :destroy]
  resources :users, :only => [:create, :destroy, :new, :update] do
    resources :boards, :only => [:index, :create]
    resources :boards, :only => [:update] do
      put "positions", :on => :member
    end
  end
  
  root :to => "root#root"
end
