ActionController::Routing::Routes.draw do |map|
  map.resources :users
  map.resources :paper_flows

  map.resources :papers
  map.resources :tags
  map.connect "", :controller => "home"
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
