---
title: Week 2 with Jekyll - First Impressions
description: Now that I've spent two weeks on Jekyll, here are my impressions of it so far.
category: ['Technology']
tags: ['jekyll']
---

{% raw %}
A little over two weeks ago, [I launched this new site using Jekyll](/2020/05/a-hopefully-temporary-facelift/). My goal was to get something up quick and easily so I can have a platform for blogging while I work on actually rebuilding a website from scratch. In this time, beyond just writing blog posts, I took some time to customize the theme and add a custom [portfolio](/projects) layout. I have yet to fully explore the capabilities of Jekyll, so I'll try not to spend too much time on thing that are likely adjustable or features I have barely touched. In any case, here are my thoughts on Jekyll so far.

## Cons

Just so we can end on a positive note, let's start with the cons. First of all, I am not a fan of the Liquid templating engine. Having worked with various other templating engines and libraries, including [Nunjucks](https://mozilla.github.io/nunjucks/), [Pug (Jade)](https://pugjs.org/api/getting-started.html), and [EJS](https://ejs.co/), I unfortunately would rank Liquid among one of my least favorites. I don't mean to bash on the creators or developers of Liquid. It works, and it might work great for some people. But it likely will not be my first pick for compiling my HTML.

This actually is not my first encounter with Liquid. I got a taste of it while maintaining a client's site on Adobe Business Catalyst before they opted for a redesign and migration to WordPress. I was not sold on it then either. The templating engine just didn't feel as intuitive as many of the others. For one, filters in [Twig](https://twig.symfony.com/) and Nunjucks work in conditions just as well as they do on variables or output tags, whereas Liquid seems to ignore them. Consider this example in Twig and its Liquid equivalent:

**sample.twig**

```liquid
{% set items = [{ name: "A" }, { name: "G" }, { name: "F" }, { name: "C" }] %}

<ul>
{% for item in items | sort('name') %}
    <li>{{ item.name }}</li>
{% endfor %}
</ul>
```

**sample.liquid**

```liquid
<!-- items = [{ name: "A" }, { name: "G" }, { name: "F" }, { name: "C" }] -->

<ul>
{% for item in items | sort: 'name' %}
    <li>{{ item.name }}</li>
{% endfor %}
</ul>
```

Oh yeah, I should mention: You cannot initialize arrays directly in Liquid. But that hasn't been a problem for me, so I won't dwell on that. What is important is that the Liquid version... well, it doesn't work. The output will be in the exact order they were originally in. Here's the "fixed" version:

**fixed_sample.liquid**

```liquid
<!-- items = [{ name: "A" }, { name: "G" }, { name: "F" }, { name: "C" }] -->

<ul>
{% assign sortedItems = items | sort: 'name' %}
{% for item in items %}
    <li>{{ item.name }}</li>
{% endfor %}
</ul>
```

Sure, that isn't terrible. But it's not exactly intuitive either. This could be attributed to my background and the programming languages I have used, but extracting an expression into a variable or vice versa should not change the output. I have even had issues with refactoring simple equality comparisons into variables. By the way, the condition for that `for` loop is not a typo - apparently, `sort` in Liquid mutates the original array, so the output of the above snippet actually compiles into the sorted list. But as far as I know, you can't _just_ sort the list, i.e. do something like `{% items | sort: 'name' %}`, so you have to include it as an expression in something like a variable assignment. Either way, I do tend to use the new variable instead of the mutated source.

That's not all, though. Liquid seems to lack a lot of key features I miss from other templates. As an example, Liquid is missing a clean way of concatenating strings. I have seen workarounds online, featuring the `append` filter or the `capture` tag, but these are workarounds and result in, in my opinion, rather messy code. It also doesn't help that Jekyll seems to either be using an outdated version of Liquid or a tweaked flavor of it, as certain advertised Liquid features straight up did not work. Specifically, trying to use the `{%- -%}` delimiters to strip surrounding whitespace results in an error. However, the biggest absence is the lack of any sort of on-page macro/partial capability. Importing templates is a suitable alternative, but it gets messy, given that all of these partials are all in the same folder. If I'm just trying to use a reusable snippet of code on one page, I'd rather just keep it on that page or at least keep the external file close to where it's being used.

That brings me to the next downside with Jekyll: the folder structure. In my opinion, the default Jekyll project setup is not very organized. All of the pages are stored in the root of the project by default, and all components (partials, collections, assets) are all stored on the same level. I did manage to create a `pages` folder to store all my static pages; however, I couldn't figure out how to move my index or 404 page in there without breaking the functionality. Luckily, moving my scripts and styles weren't too bad. I'm sure this can be configured, so again I won't judge it too harshly for this. Honestly, other than that and Liquid, I don't really have any other issues with Jekyll.

## Pros

Now that I'm done ripping Liquid a new one, let's get to the positives. And I must say - Jekyll really lives up to its name of being simple. A large part of this is thanks to the close integration with GitHub pages. Admittedly, it did take me a little longer than "seconds" to get up and running. A couple hours in fact. But _almost 100%_ of that was spent just looking for a theme. Pretty much the rest of that was just spent migrating posts from my old blog and making small tweaks. But as far as setting up Jekyll itself and deploying it, that really did just take a few seconds. I didn't have to do any of the stuff that made it take longer - it just worked.

Next, I love Markdown. As I mentioned in my initial launch announcement post, a key reason I opted for Jekyll over something like WordPress was the ability to use it. I had built my previous blog to compile Markdown as well, so it was easy to migrate. Although I'm not familiar with all the flavors of Markdown, Jekyll's default choice of Kramdown has been more than enough for my needs so far.

Even more than Markdown, I especially love customization. That's why I gravitated towards Firefox and Android over their competitors. With my front-end experience, Jekyll was easy to customize. At least the theme I chose was. As much as I dislike Liquid, the fact that Jekyll included a templating language out of the box at all was a huge plus. Originally, my plan was to just use Jekyll out of the box, with a simple "about" page and a place to highlight a couple projects. But then I wanted to showcase my professional portfolio in a maintainable way, and that was surprisingly easy to do (minus the struggles with Liquid... okay, I'll stop). Jekyll also came with SCSS support, which was extremely helpful in making style adjustments a breeze. I was hesitant on Yaml at first - having used it with Travis, I found the syntax confusing and hard to follow. But I ended up not using that many complex data structures. And honestly, if I had to write my posts metadata in JSON, I would probably get frustrated pretty quickly.

The combined support for HTML and Markdown, both of which allowed Liquid, also started out as a mixed bag (pun totally intended). The idea of mixing languages felt dirty. Markdown certainly has its limitations, so I understood the purpose behind it. But I would have preferred to keep them separate. And so I did. I kept all of my pages, posts, and articles to Markdown, while allowing complex templates to be in HTML. Jekyll doesn't force you to mix HTML and Markdown. It was simple to keep all the structural components in HTML away from the Markdown content files. What made this expecially easy is the implementation of what Jekyll calls "front matter."

In short, front matter was just a block of configurations you can put at the top, or "front," of any view file. It's written in Yaml, and played a factor in convincing me that Yaml was a better choice than JSON, at least in this area. And it's fully customizable. I can put any property here and then pull it from somewhere else, and it just works. There's no need to configure what keys are allowed. The same goes for the root configuration file. Whatever I put in there gets added to the global `site` variable that I can call from anywhere on the site. Where Yaml and front matter is the most handy however, is in Jekyll's "collections" feature.

If you have ever worked with [custom post types in WordPress](https://wordpress.org/support/article/post-types/#custom-post-types), collections are pretty much the same concept. They are like blog posts, except they aren't treated as blog posts and have their own configurations. They are basically like having multiple blogs on one site. To help with organizing my projects, I decided to use collections. It was literally a matter of adding a couple lines in the `_config.yml` telling Jekyll "hey this collection exists," and the rest works exactly the way posts do. Here's what mine looks like, with a portfolio and a projects collection:

```yaml
collections:
  portfolio:
    output: true
  projects:
    output: false
```

After that, I was able to (relatvely) easily create a list template for each one and pull it into my Projects page. While I don't have any content for them yet, I also found it very easy to customize a template for the collection post itself. A huge plus, once again, is that while the templates for these are written in HTML, the content itself can be written in Markdown and there is no additional configuration involved.

## Conclusion

Overall, I am very satisfied with Jekyll. It served my needs and even surpassed my expectations. If I had the option, I would probably switch Liquid for Twig or Nunjucks, but other than that I don't really have any problems with it - just minor annoyances. Eventually, I would like to give Hugo or Gatsby a try to see how they compare, but for now I would definitely recommend [Jekyll](https://jekyllrb.com/) to anyone who's just looking to get a website up quickly.

### TL;DR:

👍: Easy to set up, use, and deploy; customizable; Markdown; collections are awesome

👎: Liquid; default folder structure is messy
{% endraw %}
