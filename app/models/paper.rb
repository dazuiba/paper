class Paper < ActiveRecord::Base 
    REAL_FOLDER = "#{RAILS_ROOT}/public/papers"
    include Crawler::Utils
    #title, image, tag, total_views, today_views
    validates_presence_of :title 
    
    acts_as_taggable
    after_destroy do |record|
      record.image_path
    end
     
    
    def image=(url)
      current_id = if self.new_record?
        last_one = self.class.first(:order=>"id desc")
        last_one ? last_one.id+1 : 1
      else
        self[:id]
      end
      
      folder = folder_name(current_id)
      name   = file_name(current_id)
      FileUtils.mkdir_p("#{REAL_FOLDER}/#{folder}")
      
      self.image_path = "#{folder}/#{name}"
      curl "#{url} -o #{REAL_FOLDER}/#{self.image_path}"
      mkthumb
    end 
    
    def mkthumb
      create_thumb_file(170,"#{REAL_FOLDER}/thumb/s")
    end
    
    def prev(cond = nil)
      Paper.first(:conditions=>["id < ?", self.id], :order=>"id desc")
    end
    
    def next(cond = nil)
      Paper.first(:conditions=>["id > ?", self.id], :order => "id")
    end
    
    
    def real_file
      File.join(REAL_FOLDER, image_path)
    end
    
    def self.thumb_all
      
    end
    
    private
    
    def create_thumb_file(size, root)
      require 'image_science'
      file = "#{root}/#{image_path}"
      FileUtils.mkdir_p  File.dirname(file)
      ImageScience.with_image(real_file){|img|img.thumbnail(size){|t|t.save file}}
    end
    
    def folder_name(_id=self.id)
      "#{(_id/50)%10}"
    end
    
    def filename(_id=self.id)
      "#{_id}.jpg"
    end
end
