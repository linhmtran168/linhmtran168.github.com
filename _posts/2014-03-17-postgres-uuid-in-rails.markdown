---
layout: post
title: "Postgres UUID in Rails"
date: 2014-03-17
comments: true
categories: ['postgresql', 'rails']
---

# Intro & Setup
Rails 4 has native support for [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) in PostgreSQL so I decided to give it a try in my test project.

First, you need to enable PostgreSQL extension 'uuid-ossp'. Create a new migration like this:

{% highlight ruby %}
rails generate migration enable_uuid_ossp
{% endhighlight %}

And edit the newly created migration file

{% highlight ruby %}
class EnableUuidOssp < ActiveRecord::Migration
  def change
    enable_extension 'uuid-ossp'
  end
end
{% endhighlight %}

After that, run ```rake db:migrate```. After this, you can use start using ```:uuid``` as your table's primary key in other migrations. For example:

{% highlight ruby %}
rails generate migration create_users
{% endhighlight %}

{% highlight ruby %}
class CreateUsers < ActiveRecord::Migration
  def change
   create_table :users, id: :uuid  do |t|
      t.string :username
      t.string :fullname
      t.string :email
      t.string :encrypted_password
      t.timestamps
    end
  end
end
{% endhighlight %}

You can also use ```:uuid``` not as ID replacement but on a specific column

{% highlight ruby %}
class AddSuperIdToStudents < ActiveRecord::Migration
  def change
    add_column :students, :super_id, :uuid
  end
end
{% endhighlight %}

# Drawbacks
Using UUID as ID replacement will make ```Model.first``` and ```Model.last``` methods not working anymore (UUID is all about randomness after all). Luckily, you can use ```created_at``` attribute and implement ```default_scope``` in your model as following:

{% highlight ruby %}
class User < ActiveRecord::Base
  default_scope -> { order('created_at ASC') }
end
{% endhighlight %}
Or you can define you own scopes using ```created_at```:

{% highlight ruby %}
class User < ActiveRecord::Base
  scope :first, -> { order("created_at").first }
  scope :last, -> { order("created_at DESC").first }
end
{% endhighlight %}

Another problem is that ```t.references``` method in your migrations. If your __users__ table have UUID as ID and you define reference to it in other tables using ```t.references :user```, it will create a ```user_id``` column with ```integer``` as the type in those tables. Of course, it's not going to work. You must specifically define the reference like this:

{% highlight ruby %}
...
t.uuid :user_id
...
{% endhighlight %}
