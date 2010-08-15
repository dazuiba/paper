require "open-uri"
require "hpricot"
require "string"
class BatchImageParser
  def initialize(url_pattern, key, value_range, options={})
    @url_pattern =  url_pattern
    @key = key
    @value_range = parse_values(value_range)
    @css_path = options[:css_path]
  end
  
  def images 
    image_parsers.map{|e|e.images}.flatten
  end
  
  def parse_values(value)
    return nil if value.blank?
    value.split(",").map{|e|
      if (e.split("~").size>1)
        start , endd = e.split("~")
        if start=~/^\d+$/
          start = Integer(start)
          endd  = Integer(endd)
        end
        Range.new(start, endd).to_a
      else
        e
      end
    }.flatten
  end
  
  def title
    image_parsers.first.title.to_utf8
  end
  
  def image_parsers
    @image_parsers ||= urls.map{|e|ImageParser.new(e, :css_path => @css_path)}
  end
  
  private
  def urls
    @urls||=begin
      @value_range.nil? ? [@url_pattern] :  @value_range.map{|e| apply_url_pattern(e) }
    end
  end
  
  def apply_url_pattern(value)
    @url_pattern.gsub(/\{\w+\}/,value.to_s)
  end
  
end

class ImageParser
  attr_reader :doc, :url
  def initialize(url, options={})
    @url = url
    @doc = Hpricot(get_url(url))
    @css_path = options[:css_path]||"img"
  end
  
  def title
    @doc.at("title").inner_text
  end
  
  
  def images
    @images||=@doc.search(@css_path).map{|e|ImageElement.new(e,:host=>host)}.sort
  end
  
  def host
    uri = URI.parse(url)
    port = ""
    if uri.port && uri.port!=80
      port = ":#{uri.port}"
    end
    "#{uri.scheme}://#{uri.host}#{port}"
  end
  
  def get_url(url)
    begin
      open(url)
    rescue Exception => e
      raise "Error when parsing #{url}, #{e.message}"
    end
  end
  
end

class ImageElement
  attr_reader :host
  def initialize(ele, options={})
    @ele = ele
    @host = options[:host]
  end
  
  def <=>(other)
    self.size_factor <=> other.size_factor
  end
  
  def src
    s = self[:src]
    if s=~/^http/
      s
    else
      host+s
    end
  end
  
  def [](key)
    @ele[key]
  end
  
  def size_factor
    self[:width].to_i+self[:height].to_i
  end
end