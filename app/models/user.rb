class User < ActiveRecord::Base
  has_many :papers
  has_many :paper_flows
end
