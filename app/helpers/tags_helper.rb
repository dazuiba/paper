module TagsHelper
  def safe_link_to_tag(a, options={})
    return if a.nil?
    %[#{link_to a.name, "/tags/#{a}"}]
  end
  
  alias :link_to_tag :safe_link_to_tag
   
end
