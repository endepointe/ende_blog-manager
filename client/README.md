# Creating and Posting my Blog
I want to be able to manage blogs from a local host application. the database 
will be separated, running on its own secure server.

This will give me the ability to backup and manage the existing blog posts 
that have been staticly inserted into my site at every /blog/title

This will require that my server and database are secure. 
every blog post backup will auto increment for reference to join
tables with userposts.

### what i will need to do:
1. create a blog management application.
2. set up a database for my blog post
3. retrieve those blogs an populate them within the blog component.

### the mvp for the blog management application will contain service for:
- creating a title
-	creating blog content
- creating a unique id based on the date and title
- submitting the blog to the database
- save a local copy of each blog

### what it should have in the future:
- retrieve all posts based on given parameters
- update posts
- delete posts (should rarely be done)

```
blogpost: {
	id: serial pk,
	title: string,
	date: date,
	content: text 
}
```

[google](http://google.com)

test
things