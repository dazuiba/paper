class HomeController < ApplicationController
  def index
    respond_to do |format|
      format.iphone{
        @tags = Tag.all
      }
    end
  end
end