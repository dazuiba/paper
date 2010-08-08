# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_handtu_session',
  :secret      => 'af72336977ab4765b17eb2f6ed3d08ef7c5848ec611f571cde2cf04b4496bf4eae00bd02c35747c87388726b143713a9e2c924c3d5b07d7c967db3b59b63f0b7'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
