class HomeController < ApplicationController
  def index
    respond_to do |format|
      format.iphone{}
      format.html{}
    end
  end
end