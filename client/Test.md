It's very easy to make some words **bold** and other words *italic* with Markdown [link to Google!](http://google.com).

first img link 

[![blog manager](https://img.youtube.com/vi/zhNe0CEmam4/0.jpg)](https://youtu.be/zhNe0CEmam4)

second image link

[![object property](https://img.youtube.com/vi/0htvbjBMtPk/0.jpg)](https://youtu.be/0htvbjBMtPk)

<script src="./test.js">console.log('if run, would return not found')</script>

If you want to embed images, this is how you do it:
![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

links updated

<a href="google.com">
  <img src="https://img.youtube.com/vi/0htvbjBMtPk/0.jpg">
</a>


Sometimes you want numbered lists:

1. One
2. Two
3. Three

Sometimes you want bullet points:

* Start a line with a star
* Profit!

Alternatively,

- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
  - Like this
  - And this

# Structured documents

Sometimes it's useful to have different levels of headings to structure your documents. Start lines with a `#` to create headings. Multiple `##` in a row denote smaller heading sizes.

### This is a third-tier heading

You can use one `#` all the way up to `######` six for different heading sizes.

If you'd like to quote someone, use the > character before the line:

> Coffee. The finest organic suspension ever devised... I beat the Borg with it.
> - Captain Janeway

There are many different ways to style code with GitHub's markdown. If you have inline code blocks, wrap them in backticks: `var example = true`.  If you've got a longer block of code, you can indent with four spaces:

    if (isAwesome){
      return true
    }

GitHub also supports something called code fencing, which allows for multiple lines without indentation:

```
if (isAwesome){
  return true
}
```

And if you'd like to use syntax highlighting, include the language:

```javascript
if (isAwesome){
  return true
}
```

GitHub supports many extras in Markdown that help you reference and link to people. If you ever want to direct a comment at someone, you can prefix their name with an @ symbol: Hey @kneath ??? love your sweater!

But I have to admit, tasks lists are my favorite:

- [x] This is a complete item
- [ ] This is an incomplete item

When you include a task list in the first comment of an Issue, you will see a helpful progress bar in your list of issues. It works in Pull Requests, too!

And, of course emoji!
