module TagsHelper
  def safe_link_to_tag(a)
    return if a.nil?
    %[#{link_to a.name, "/tags/#{CGI.escape a.name}"} <b>#{a.taggings.count}</b>]
  end
end
