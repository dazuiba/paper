class PaperFlow < ActiveRecord::Base
  has_many :papers, :order=>"flow_position"
  belongs_to :category
  belongs_to :owner, :class_name => "User"
  acts_as_taggable
end
