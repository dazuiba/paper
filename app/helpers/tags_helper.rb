module TagsHelper
  def safe_link_to_tag(a, options={})
    return if a.nil?
    %[#{link_to a.name, "/tags/#{tag_name(a)}"}]
  end
  
  def tag_name(tag)
    CGI.escape tag.name
  end
end
