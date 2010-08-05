class CreatePapers < ActiveRecord::Migration
  def self.up
    create_table :papers do |t|
      t.string :uid
      t.string :image_path
      t.string :title
      t.string :title
      t.integer :total_views
      t.integer :today_views
      t.integer :created_by_user_id
      t.text :description
      t.string :from_url
      t.timestamps
    end
  end

  def self.down
    drop_table :papers
  end
end
