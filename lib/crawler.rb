require 'Hpricot'
module Crawler
  
  def self.empty_table
    Paper.destroy_all
    Tag.destroy_all
  end
  
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
     
    
    def doc
       @doc ||= Hpricot curl(@url)
    end

  end
   
  
  #alliphonewallpapers
  class AllIP < SiteBase
    REG_VIEW_POINTS = /Total views: ([\d,\,]+) \/ Today views: ([\d,\,]+).+Category: (.+)/i
      
    def parse
      image = doc.at("#wallpaper_holder2 img")
      title = doc.at("#content_height h1")
      total_views = doc.at("#description ul")
      return false unless image&&title&&total_views
      total_views = total_views.innerText.gsub("\n","")
      if (total_views=~ REG_VIEW_POINTS) && (total_points = $1) && (today_points = $2)
        tag = $3
        total_points = Integer(total_points.gsub(",",""))
        today_points = Integer(today_points.gsub(",",""))

        paper = Paper.find_or_initialize_by_from_url(url)
        paper.attributes = {:image => image[:src], 
                             :title => title.innerText,
                             :total_views => total_points,
                             :today_views => today_points}

        if tag
          paper.tag_list = [tag]
        end
        paper
      else
        raise "REG_VIEW_POINTS cannot appy for #{total_views}" 
      end
    end
      
    def parse_and_save
     paper = parse
     paper&&paper.save!      
    end
     
     def content_valid?(content)
      content.at("#{content_height}").html=~/iphone wallpaper/i
     end
   end 
end