#### Creating and Posting my Blog
I want to be able to manage blogs from a local host application. The database 
will be separated, running on its own secure server. 

This will give me the ability to backup and manage the existing blog posts 
that have been staticly inserted into my site at every /blog/title
This will require that my server and database are secure. 

Every blog post backup will auto increment for reference to join
tables with UserPosts.
 
What I will need to do:
1. Create a blog management application.
2. Set up a database for my blog post
3. Retrieve those blogs an populate them within the Blog component.

The MVP for the blog management application will contain service for:
- Creating a title
-	Creating blog content
- creating a unique id based on the date and title
- submitting the blog to the database
- save a local copy of each blog

What it should have in the future:
- Retrieve all posts based on given parameters
- Update posts
- Delete posts (should rarely be done)

BlogPost: {
	id: serial pk,
	title: String,
	date: Date,
	images: [urls],
	content: Text 
}