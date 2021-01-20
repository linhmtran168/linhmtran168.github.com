---
layout: post
title: "Setting Mac OSX 10.9 for RoR development"
date: 2013-12-19
comments: true
categories: ['rails', 'macosx', 'ruby']
---

There are many reasons that I have always wanted to learn Rails. The first is that it's written in Ruby, a language with elegant syntax that can bring joy to developers. Second, Rails is a convention over configuration framework, it forces developers to follow best practice, agile development flow to be able to get the most out of it. Despite all that, I've never been able to be determined enough to learn it fully and use it in my work. But now the chance has come, let's get started with an OSX environment ready for Rails.

First, we downloading and installing some dependencies so that ruby can be compiled in our OSX system. Of course, you can use the system ruby come with OSX, but I can guarantee that it will bring to you in the future. We will need to install the Xcode Command Line Tools. Either download it directly from [Apple website](http://developer.apple.com/downloads), or open Xcode, go to ```Preferences->Downloads```, download it from here or if you are using OSX 10.9 type the following command in the terminal

{% highlight sh %}
$ xcode-select --install
{% endhighlight %}

Now, installing the needed compiler to build ruby from source using Homebrew (In case you don't know what Homebrew is and you are using Mac OSX, I suggest you go immediately to [its website](https://github.com/Homebrew/homebrew) and read the docs to install it)

{% highlight sh %}
$ brew install apple-gcc42
{% endhighlight %}

The second thing we must do is installing a ruby version manager to manage and install ruby.  In Ruby world, [RVM](http://rvm.io), [rbenv](https://github.com/sstephenson/rbenv), [chruby](https://github.com/postmodern/chruby) are the 3 most popular version manager. I used **rvm**, but it's just too heavy so I switch to **rbenv** and have been happy with it so far (I haven't tried **chruby** yet but have heard some good things about it). Installing rbenv is really easy with Homebrew

{% highlight sh %}
$ brew install apple-gcc42
$ brew install rbenv
{% endhighlight %}

In case, brew does not add the rbenv bootstrap command to your ```.bashrc``` or ```.zshrc```, do it yourself

{% highlight sh %}
# .zshrc or .bashrc
…
if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi
{% endhighlight %}

Default, **rbenv** will create a ```.rbenv``` folder in your home folder and use it to hold ruby installations and gems but I prefer to use Homebrew's directories so I do as Homebrew's instruction and add the following to my ```.zprofile``` (.bashrc, .zshrc… in your case)

{% highlight sh %}
export RBENV_ROOT=/usr/local/var/rbenv
{% endhighlight %}

We also must install **ruby-build** so that rbenv can download and install ruby

{% highlight sh %}
$ brew install ruby-build
{% endhighlight %}

Yay, we are ready to install ruby with rbenv

{% highlight sh %}
$ rbenv install 2.0.0.p353 # The latest ruby version
$ rbenv global 2.0.0.p353 # Make it the default ruby version instead of system one
…
$ ruby -v
ruby 2.0.0p353 (2013-11-22 revision 43784) [x86_64-darwin13.0.0]
$ which ruby
/usr/local/var/rbenv/shims/ruby
$ which gem
/usr/local/var/rbenv/shims/gem
{% endhighlight %}


Next is installing some necessary gems (for me)

{% highlight sh %}
$ rbenv install 2.0.0.p353 # The latest ruby version
$ gem install bundler rails pry cocoapods awesome_print
# Rehash so that shim executables are available for newly installed gems
$ rbenv rehash 
{% endhighlight %}

I also installed some useful rbenv plugins using brew (the main reason that I use brew's directories for rbenv: rbenv plugins installed with brew work nicely with brew's directories). 

{% highlight sh %}
# You can google, and find out the functions of each plugin (They are pretty useful)
$ brew install rbenv-binstubs rbenv-default-gems rbenv-gem-rehash rbenv-vars 
{% endhighlight %}

Congratulation, we are all set now. Let create our first rails app.

{% highlight sh %}
$ rails new hello_world
$ cd hello_world
# Want to know what the following command do, go to rbenv docs or I will cover it in a later blog post
$ bundle install —binstub .bundle/bin 
{% endhighlight %}


