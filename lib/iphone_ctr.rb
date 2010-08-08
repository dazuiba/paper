module IphoneCtr
  def self.included(base)
    base.send :before_filter, :adjust_format_for_iphone
    #base.send :before_filter, :iphone_login_required
    base.send :layout, proc{ |controller| 
      if controller.request.xhr? && controller.send(:iphone_request?)
          nil
      else
        "application" 
      end
    }
  end
  protected
    # Set iPhone format if request to iphone.trawlr.com
    def adjust_format_for_iphone
      if iphone_request?
        request.format = :iphone
      end
    end

    # Force all iPhone users to login
    def iphone_login_required
      if iphone_request?
        redirect_to login_path unless logged_in?
      end
    end

    # Return true for requests to iphone.trawlr.com
    def iphone_request?
      return (request.subdomains.first == "m" || params[:format] == "iphone")
    end
  
end