class CrateCategoryable < ActiveRecord::Migration
  def self.up
    create_table :categories, :force => true do |t|
      t.string :name
      t.integer :parent_id
      t.integer :category_type
      t.string   "identifier",  :limit => 20
      t.integer  "lft"
      t.integer  "rgt"
    end
    add_column :tags, :category_id, :integer

    add_column :tags, :relate_tags, :text
    add_column :tags, :taggable_count, :integer
    
  end

  def self.down
    remove_column :tags, :category_id
    drop_table :categories
  end
end
