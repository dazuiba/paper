require 'Hpricot'
module Crawler
  module Utils
    def curl(cmd, cmd2=nil)
     cmd = "curl -L #{cmd} 2>/dev/null #{cmd2}"
     logger.debug("\t#{cmd}")
      `#{cmd}`
    end
  end
  
  class ParseError < RuntimeError
    attr_reader :type_code, :url
    def initialize(type_code, url)
      @type_code = type_code
      @url = url
    end

    def message
      "ParseError(#{type_code})"
    end
  end
  
  class SiteBase
    include Utils
    attr_accessor :logger
    ERROR_URL = "ERROR_URL_NOT_VALID"
    ERROR_URL_ARG = "ERROR_URL_ARG"

    def self.create(url, logger=Logger.new(STDOUT))
      host = URI.parse(url).host
      result = if host =~ /alliphonewallpapers/
        AllIP.new(url)
      else
        raise ParseError.new("HOST", url)
      end
      result.logger = logger
      result
    end

    attr_reader :url, :doc

    def initialize(url)
      @url = url
    end
    
    def execute
     @doc = Hpricot curl(@url)
     parse(@doc)
    end
    

  end
  
  
  class ImageFile < ActiveRecord::Base
    set_table_name "papers"
    include Utils
    #title, image, tag, total_views, today_views
    validates_presence_of :title 
    
    acts_as_taggable
    
    def image=(url)
      last_one = self.class.first(:order=>"id desc")
      current_id = last_one ? last_one.id+1 : 1
      path = "#{(current_id/50)%10}"
      self.image_path = "#{path}/#{current_id}.jpg"
      dir = "#{RAILS_ROOT}/public/papers/#{path}"
      FileUtils.mkdir_p(dir)
      
      curl "#{url} -o #{dir}/#{self.image_path}"
    end 
  end
  
  #alliphonewallpapers
  class AllIP < SiteBase
    REG_VIEW_POINTS = /Total views: (\d+) \/ Today views: (\d+).+Category: (.+)/i
    
     def parse(doc)
      image = doc.at("#wallpaper_holder2 img")
      title = doc.at("#content_height h1")
      total_views = doc.at("#description ul")
      total_views.innerText =~ REG_VIEW_POINTS
      paper = ImageFile.new(:image => image[:src], 
                             :title => title.innerText,
                             :from_url => url, 
                             :total_views => $1,
                             :today_views => $2) 
                             
      if tag = $3
        paper.tag_list tag
      end
      paper.save!
     end
     
     def content_valid?(content)
      content.at("#{content_height}").html=~/iphone wallpaper/i
     end
   end 
end