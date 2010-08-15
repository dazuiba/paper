class Tag < ActsAsTaggableOn::Tag
  belongs_to :category
end
