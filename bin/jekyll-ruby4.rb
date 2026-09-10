class Object
  def tainted?
    false
  end

  def untaint
    self
  end
end

require "bundler/setup"
load Gem.bin_path("jekyll", "jekyll")
