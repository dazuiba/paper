module PapersHelper
  def paper_image_url(paper, size=nil)
    hash = {nil=>"",:s => "thumb/s/"}
    "/papers/#{hash[size]}#{paper.image_path}"
  end
  
  def link_to_paper(paper, size)
     %[ <div class="cover">
   				<a href="#{paper_path(paper)}">
   					<img src="#{paper_image_url(paper, :s)}"></a>
   		 </div>]
  end
end
