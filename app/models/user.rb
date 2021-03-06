require 'bcrypt'
class User < ActiveRecord::Base
  
  attr_accessible :email, :session_token, :username, :password, :avatar_url
  attr_reader :password
  
  validates :password_digest, :presence => { :message => "Password can't be blank" }
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :session_token, :username, :email, :presence => true
  validates :username, :email, :uniqueness => { :case_sensitive => false, 
                                                :allow_blank => true }

  after_initialize :ensure_session_token
  after_initialize :ensure_avatar_url
  
  has_many :boards,
           :dependent => :destroy
  
  has_many :board_memberships,
           :class_name => "BoardMember",
           :primary_key => :id,
           :foreign_key => :user_id
           
  has_many :memberships,
           :through => :board_memberships,
           :source => :board
  
  has_many :comments
  has_many :card_assignments
  has_many :assigned_cards,
           :through => :card_assignments,
           :source => :card
  
  def generate_avatar_url
    if self.email
      gravatar_id = Digest::MD5.hexdigest(self.email.downcase)
      "http://gravatar.com/avatar/#{gravatar_id}.png?s=20&d=identicon&r=pg"
    end
  end
  
  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)

    return nil if user.nil?

    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
  
  def ensure_avatar_url
    self.avatar_url ||= self.generate_avatar_url
  end
end

