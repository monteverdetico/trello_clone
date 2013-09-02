TrelloClone::Application.routes.draw do
  resource :session, :only => [:create, :new, :destroy]
  resources :users, :only => [:create, :destroy, :new, :update]
  root :to => "root#root"
end
