TrelloClone::Application.routes.draw do
  resource :session, :only => [:create, :new, :destroy]
  resources :users, :only => [:create, :destroy, :new, :update] do
    resources :boards, :only => [:index, :show, :create, :destroy]
  end
  root :to => "root#root"
end
