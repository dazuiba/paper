class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string :name
      t.datetime :created_at
    end
    
    create_table :paper_flows do |t|
      t.string :title
      t.integer :category_id
      t.integer :owner_id
      t.timestamps
    end
    rename_column :papers, :created_by_user_id, :owner_id
    
    change_table :papers do |t|
      t.integer  "category_id"
      t.integer  "flow_id" 
      t.integer  "flow_position"
    end
  end

  def self.down
    drop_table :users
    drop_table :paper_flows
  end
end
