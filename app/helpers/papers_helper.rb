module PapersHelper
  module Model
    SUB_FOLDER = {"s"=>"thumb/s", nil => ""}
    THUMB_SIZE = {"s" => "97"}
    REAL_FOLDER = "#{RAILS_ROOT}/public/papers"
    
    def real_image_path(size = nil)
      "#{REAL_FOLDER}/#{SUB_FOLDER[size.to_s]}/#{relative_image_path}"
    end
    
    def relative_image_path
      "#{folder_name}/#{filename}"
    end
 
    def image_url(size = nil)
      "#{ENV['resource_url']}/papers/#{SUB_FOLDER[size]}#{self.image_path}"
    end
    
    def folder_name(_id=self.id)
      "#{(_id/50)%10}"
    end
    
    def filename(_id=self.id)
      "#{_id}.jpg"
    end
  end
  include Model
  def paper_image_url(paper, size=nils)
    paper.image_url(size)
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
