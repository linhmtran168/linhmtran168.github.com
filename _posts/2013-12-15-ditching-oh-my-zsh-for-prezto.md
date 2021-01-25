---
layout: post
title: "Ditching Oh-my-zsh for Prezto"
date: 2013-12-15
comments: true
tags: ['zsh', 'prezto']
categories: ['zsh', 'macosx']
---

#### Oh My Zsh, full of features but slow
I'm a long time user of [Oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh). After setting up a new system (OSX or Linux, of course, no Windows), the first thing I often do is changing my default shell to Zsh and installing Oh-my-zsh. It's a brilliant configuration framework for zsh with a lot of themes and plugins that make it a joy to working in the terminal. But it has a major drawback, slow startup time. For me, with a lot of plugins enabled, it often takes several seconds for the terminal in iTerm2 to be fully ready.

#### Enter Prezto
I've heard of [prezto](https://github.com/sorin-ionescu/prezto) before, but at that time, to me, Oh-my-zsh is too good and the thought of having to learn the convention and update my current configuration to that of a new framework made me feel lazy :) But today, after reading a thread in StackOverflow that stated that Prezto is an improvement to Oh-my-zsh and it has no slow startup time issue, I decided to give it a try.

Installing presto is really straight forward, just following the guide in its website (remember to uninstall Oh-my-zsh and backup your configuration).

```sh
# Uninstall oh my zsh
$ uninstall_oh_my_zsh

# Open new shell, open zsh and clone the presto repo
$ git clone --recursive https://github.com/sorin-ionescu/prezto.git "${ZDOTDIR:-$HOME}/.zprezto"

# Get prezto's default configuration
$ setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done

# Change default shell to zsh
$ chsh -s /bin/zsh
```

After that, you are done, prezto is ready at your command. I was really impressed with prezto, even with a lot of modules enabled (git, rails, ruby, python, node...), it's still very fast compared to Oh-my-zsh. Now all that left is to configure prezto to my liking. I did have to convert my shell settings in Oh-my-zsh's ***.zshrc*** to that of Prezto but it only took a small amount of time. To modify and add custom configuration, in my case, you just have to make changes to those 3 files that prezto symlinks in your home folder: ***.zprofile***, ***.zshrc***, ***.zpreztorc***

I added my custom paths to **.zprofile** so that they will be available for even apps outside of the terminal

```sh
...
# GO
export GOPATH=$HOME/SkyDrive/go

# Set the list of directories that Zsh searches for programs.
path=(
  /usr/local/{bin,sbin}
  $GOPATH/bin
  $HOME/.cabal/bin
  /opt/homebrew-cask/Caskroom/postgres/latest/Postgres.app/Contents/MacOS/bin
  /usr/local/heroku/bin
  $path
)
...
```

In **.zshrc** file, I added my aliases and some variables for working with python

```sh
...
# Alias
# OSX
alias fixow='/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -kill -r -domain local -domain user;killall Finder;echo "Open With has been rebuilt, Finder will relaunch"'
# tmux
alias tma='tmux attach -d -t'
alias tmn='tmux new -s $(basename $(pwd))'
alias tml='tmux list-sessions'
# bower
alias bower='noglob bower'

# Python virtualenv configuration
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_VIRTUALENV_ARGS='--no-site-packages'
...
```

And in **.zpreztorc**, I added the modules that I need (git, ruby, python, node...) and configure prezto to use a custom theme that I modified from the default sorin theme.

```sh
...
# prezto modules
zstyle ':prezto:load' pmodule \
  'environment' \
  'terminal' \
  'editor' \
  'history' \
  'history-substring-search' \
  'directory' \
  'spectrum' \
  'utility' \
  'completion' \
  'homebrew' \
  'osx' \
  'ruby' \
  'rails' \
  'git' \
  'node' \
  'python' \
  'haskell' \
  'syntax-highlighting' \
  'tmux' \
  'utility' \
  'prompt'
...
# presto theme
zstyle ':prezto:module:prompt' theme 'superlinh'
```


And tada, this is my final product:


![Prezto Image](/assets/shell_prezto.png)

Generally, I'm pretty pleased with prezto. I think I'm gonna use it in my terminal from now on. You can get all of my configurations and custom theme here on [Github](https://github.com/linhmtran168/mac_dotfiles).
