Setting up your database table can be as simple as:
```
create table <your_blog_table> (
	id serial primary key,
	title text,
	content text,
	posted timezonetz,
	modified timezonetz
);
```
But you are free to choose whatever you want to store.

To run the applications:
```
git clone https://github.com/endepointe/ende_blog-manager.git
cd ende_blog-manager/client
npm install
cd ../api && npm install
npm run blog
```

[Overview on YouTube](https://youtu.be/zhNe0CEmam4)

If you have any questions, make a pull request or leave a comment in
the video.