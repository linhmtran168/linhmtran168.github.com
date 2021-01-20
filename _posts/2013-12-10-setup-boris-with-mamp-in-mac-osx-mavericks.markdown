---
layout: post
title: "'Setup boris with MAMP in Mac OSX Mavericks'"
date: 2013-12-10
comments: true
categories: ['php', 'macosx']
---

For me who is used to having REPL as an essential tools for development, [Boris](https://github.com/d11wtq/boris) is a must have when developing PHP web app.
But after updating to MAMP 2.0 and PHP 5.5.3, it stopped working. There is no error output, the REPL just doesn't appear.
After several hours of googling, I found out the reason is that MAMP's PHP is built with out **pcntl** and **readline** support, which boris depends on. To get those features, there is no other way then manually compile and add them to MAMP's PHP installation.

First, we need to download the source code for MAMP's PHP. In my case it's PHP 5.5.3

{% highlight sh %}
$ php -v
Copyright (c) 1997-2013 The PHP Group
Zend Engine v2.5.0, Copyright (c) 1998-2013 Zend Technologies
    with Zend OPcache v7.0.3-dev, Copyright (c) 1999-2013, by Zend Technologies

$ wget http://museum.php.net/php5/php-5.5.3.tar.gz
$ tar -xzvf php-5.5.3.tar.gz
{% endhighlight %}

After that change the folder name to ***php*** and move it ***include*** folder in MAMP's PHP 5.5.3 folder

{% highlight sh %}
$ mv php-5.5.3 php
$ mkdir -p /Applications/MAMP/bin/php/php5.5.3/include
$ mv php /Applications/MAMP/bin/php/php5.5.3/include
{% endhighlight %}

Then, use the configure it to prepare all the necessary header files

{% highlight sh %}
$ mv php-5.5.3 php
$ cd /Applications/MAMP/bin/php/php5.5.3/include/php
$ ./configure
{% endhighlight %}

Now, we process to build the **pcntl** and **readline** extension.
But before that, we must set some flags so that they are compiled with dual 32bit and 64bit architecture as MAMP PHP was built this way.

{% highlight sh %}
$ MACOSX_DEPLOYMENT_TARGET=10.9
$ CFLAGS="-arch i386 -arch x86_64 -g -Os -pipe -no-cpp-precomp"
$ CCFLAGS="-arch i386 -arch x86_64 -g -Os -pipe"
$ CXXFLAGS="-arch i386 -arch x86_64 -g -Os -pipe"
$ LDFLAGS="-arch i386 -arch x86_64 -bind_at_load"
$ export CFLAGS CXXFLAGS LDFLAGS CCFLAGS MACOSX_DEPLOYMENT_TARGET
{% endhighlight %}

Now, what left is compiling the extensions, move the compiled ***.so*** files to MAMP's PHP extensions directory:

{% highlight sh %}
$ cd ext/pcntl
$ phpize
$ ./configure
$ make
$ cp modules/pcntl.so /Applications/MAMP/bin/php/php5.5.3/lib/php/extensions/no-debug-non-zts-20121212
$ cd ../readline
$ phpize
$ ./configure
$ make
$ cp modules/readline.so /Applications/MAMP/bin/php/php5.5.3/lib/php/extensions/no-debug-non-zts-20121212
{% endhighlight %}

Finally edit the MAMP's PHP php.ini file to include those extensions

{% highlight sh %}
$ echo "extension=pcntl.so\nextension=readline.so" >> /Applications/MAMP/bin/php/php5.5.3/conf/php.ini
{% endhighlight %}

Now we are done, just install boris if you haven't done so and enjoy playing PHP code in the terminal

{% highlight sh %}
$ brew install boris
$ boris
[1] boris> echo "Hello World!\n";
Hello World!
[2] boris>
{% endhighlight %}
