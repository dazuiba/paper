module UsersHelper
  def link_to_user(user)
    link_to(user.name, "/users/#{user.id}") if user
  end
end
