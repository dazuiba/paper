class Paper < ActiveRecord::Base 
    include PapersHelper::Model
    include Crawler::Utils
    attr_accessor :image
    #title, image, tag, total_views, today_views
    validates_presence_of :title 
    
    acts_as_taggable
    after_destroy do |record|
      record.image_path
    end
    
    after_save :dealwith_image
    
    def dealwith_image
      if url = self.image
        FileUtils.mkdir_p(File.dirname real_image_path)
        self.image_path = relative_image_path
        curl "#{url} -o #{real_image_path}"
        mk_thumb("s")
      end
    end
    
    def mk_thumb(size)
      size = size.to_s
      require 'image_science'
      save_as = real_image_path(size)
      FileUtils.mkdir_p  File.dirname(save_as)
      ImageScience.with_image(real_image_path){|img|img.thumbnail(THUMB_SIZE[size]){|t|t.save save_as}}
  
    end
    
    def prev(cond = nil)
      Paper.first(:conditions=>["id < ?", self.id], :order=>"id desc")
    end
    
    def next(cond = nil)
      Paper.first(:conditions=>["id > ?", self.id], :order => "id")
    end 
    
    def self.thumb_all
      
    end
     
end
