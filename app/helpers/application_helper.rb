# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  
  def format_date(date)
  	time_ago_in_words(date)+"前"  
  end
end
