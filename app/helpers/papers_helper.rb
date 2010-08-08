module PapersHelper
  def paper_image_url(paper, size=nil)
    hash = {nil=>"",:s => "thumb/s/"}
    "#{ENV['resource_url']}/papers/#{hash[size]}#{paper.image_path}"
  end
  
  def paper_image_tag(paper, options={})
    options.reverse_merge!(:alt=>paper.title)
    image_tag(paper_image_url(paper, options[:_size]), options)
  end
  
  def link_to_paper(paper, size)
     %[ <div class="cover">
   				<a href="#{paper_path(paper)}">
   					<img src="#{paper_image_url(paper, :s)}"></a>
   		 </div>]
  end
end
