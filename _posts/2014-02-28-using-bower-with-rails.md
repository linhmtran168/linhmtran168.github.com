---
layout: post
title: "Using Bower with Rails"
date: 2014-02-28
comments: true
categories: 'rails'
---

Rails got Asset Pipeline and to take full advantage of it, Ruby developers have created gems for almost notable frontend libraries. After all, it's pretty awesome to be able to  live entirely in Ruby world without the need to manually add Javascript, Css files. But not all frontend projects are gemified and even it's the case, there is no guarantee that those gems will be properly maintained. It's the reason for me to start using __[bower](http://bower.io/)__ in my project.

If you haven't heard about __bower__, you must have been living under a rock. It's now the de facto front-end package manager for the web. Almost (if not all) frontend libraries are now created to be compatible with __bower__ (a __bower__ package). Using __bower__, you can search, list, install, uninstall, update and manage dependencies for your projects.

To start using __bower__, you must install __[nodejs](http://nodejs.org/)__ and install __bower__ using __[npm](https://www.npmjs.org/)__. Another dependency, but believe me, it's worth the effort.

```sh
$ brew install node
$ npm install -g bower
```

_(If you want to play more with nodejs, I recommend you to try __[nvm](https://github.com/creationix/nvm)__ and use it to manage your nodejs installations)_

After that, create a ```.bowerrc``` file with the following contents at the root of the project folder to change default location for __bower__'s packages from ```./bower_components``` to ```./vendor/bower_components``` (you can choose another folder if you want):

```json
{
  "directory": "vendor/assets/bower_components"
}
```

Then, use ```bower init``` to generate a ```bower.json``` for your project. Using this file, You can manage your project information and dependencies:

```json
{
  "name": "Your App Name",
  "version": "0.0.1",
  "authors": [
    "Your Email"
  ],
  "description": "Description",
  "keywords": [
  ],
  "license": "MIT",
  "private": true,
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "vendor/assets/bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "jquery": "*"
  }
}
```

Then, you must add the __bower__'s package folder to Rails' Asset Pipeline by editing the ```config/application.rb``` as following:

```ruby
...
class Application < Rails::Application
  ...
  # Include Bower components in compiled assets
  config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')
end
...
```

Now, __bower__ is already at your command. You can search for packages, add them in __dependencies__ section of ```bower.json``` file and ```bower install``` in your project's root folder to install all of them. Alternatively, you can install each package separately as following:

```sh
$ bower search pace
Search results:

    pace git://github.com/HubSpot/pace.git
    suit-utils-space git://github.com/suitcss/utils-space.git
    ....
$ bower install pace --save # --save will save the dependency to bower.json file, use --save-dev for development dependency
```

To use bower packages, just add them to your asset manifest files like any other frontend library. For example:

```javascript
# app/assets/javascripts/application.js
...
//= require pace/pace
...
```
```

```css
# app/assets/stylesheets/application.css
...
*= require pace/themes/pace-theme-minimal.css
...
```

You can also list your installed bower packages, update or remove them

```sh
$ bower list
$ bower update
$ bower remove $package_name
```

In my personal opinion, __bower__ is really a great tool, it helps manage frontend libraries much more easier. Combine with Rails' Asset Pipeline, it makes a powerful tool to conquer any kind of frontend related projects.
