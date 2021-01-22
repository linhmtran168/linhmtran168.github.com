---
layout: post
title: "Moving from rbenv to chruby and direnv"
date: 2014-02-27
comments: true
categories: ['ruby', 'macosx']
---

I was a happy user of __rbenv__. It does have some drawback such as having to ```rbenv rehash``` everytime after installing new gems or having to manually manage binstubs.But all of them are trivial and can be solved with rbenv's plugins like ```rbenv-binstubs``` , ```rbenv-rehash```. But I wanted to try something new, something minimal and so I moved to __[chruby](https://github.com/postmodern/chruby)__

Install __chruby__ is pretty easy with __homebrew__ (You are using homebrew, right?):


```sh
$ brew install chruby
```

After that, add the following line to your ```~/.zshrc``` or ```~/.bashrc```

```sh
source /usr/local/share/chruby/chruby.sh
```

But as the name say chruby main function is only to __change ruby__ :D. To install ruby you must either install __[ruby-install](https://github.com/postmodern/ruby-install)__ or __[ruby-build](https://github.com/sstephenson/ruby-build)__. 

In case, you are already __ruby-build__ (inevitably, if you are using __rbenv__), you can just use you old ruby installation folder by adding it to the __RUBIES__ variable:

```sh
source /usr/local/share/chruby/chruby.sh

RUBIES+=(~/.rbenv/versions/*)
```

After that, continuing to use __ruby-build__ to manage your ruby installation

In my case, I moved to __ruby-install__. Install it in just one command line:

```sh
$ brew install ruby-install
```

After that, install the latest and greatest Ruby:

```sh
$ ruby-install ruby 2.1.1
```

To make a ruby version default, simply just call chruby after it was initialized in your ```~/.zshrc``` or ```~/.bashrc```

```sh
...
chruby ruby-2.1.1
```

If you want to define a specific ruby version for your project and enable auto-switching to that version when ```cd``` to your project folder (well, you should), add a ```.ruby-version``` file to the root of the folder:

```sh
# ./.ruby-version
ruby-2.1.1
```

And enable the auto-switch function of __chruby__ in your ```~/.bashrc``` or ```~/.zshrc``` file:

```sh
source /usr/local/share/chruby/chruby.sh
source /usr/local/share/chruby/auto.sh
```

Now, you have a working __chruby__ setup. But in your Rails project, you still have to type ```$ bin/'your-god-knows-gem-command'``` each time to use your generated gem binstubs. For some people, it's ok, but not for me :D. Previously, when using __rbenv__, it can be solved with the plugin ```rbenv-binstubs```. With __chruby__, we will use __[direnv](https://github.com/zimbatm/direnv)__ to eliminate this problem once and for all. Install it with __brew__:

```sh
$ brew install direnv
```

To add the ```bin``` folder of your project to the __PATH__, create a ```.envrc``` with the following line in the root of your project folder:

```sh
export PATH=$PWD/bin:$PATH
```

After that, allow __direnv__ to modify your __PATH__ in this folder

```sh
$ cd 'your-project-folder'
$ direnv allow
direnv: loading .envrc
direnv: export ~PATH
```

From now on, in your project folder, forget the additional ```bundle exec``` or ```bin/``` and just type your favorite command.

With __chruby__ and __direnv__ properly setup (you should if you followed my instructions), now we are have a combo of lightweight but effective weapons to adventure with any kind of Ruby project. I wish you all the best :D
