class User < ActiveRecord::Base
  attr_accessible :email, :password_digest, :session_token, :username
end
