---
title: On Frameworks
description: This morning, I was introduced to a new CSS framework based on Google's material design. So, I jumped in to see if there was anything particularly interesting going on. While I found several things I like, I was also reminded why I have a stronger and stronger dislike for modern frameworks.
date: 2015-01-26
tags:
  - css
---

This morning, I was introduced to a new [CSS framework based on Google's material design](http://materializecss.com). So, I jumped in to see if there was anything particularly interesting going on. While I found several things I like, I was also reminded why I have a stronger and stronger dislike for modern frameworks.

**Disclaimer:** The points I'm about to make should in no way take away from the time, effort, or skill employed by the Materialize team. I greatly admire them for compiling their ideas, packaging them attractively, and releasing them to the world. That takes dedication and guts -- things a large chunk of our industry is missing -- and shouldn't be downplayed or disregarded.

Read on for the things that bother me with this approach.

## Bootstrapification

There has been a general cry in the web community over the last couple of years that, "[all sites look the same](https://twitter.com/timcaynes/status/554593526034731008)"! I think some of that comes from just trying to emulate a few popular examples, from designers still struggling with responsive design, from increasingly template driven content management systems, and, yes, from the prolific use of frameworks in the effort to cut costs.

Now, frameworks like Bootstrap and Foundation provide a default styles for their elements and modules. I believe this is done with the best intentions -- to make it extremely fast to start putting blocks together. Which is great for prototyping, but I think it's been used as a crutch by many -- allowing those default styles become the final styles.

So, the styles you find in Bootstrap came directly from the styles in use by the Twitter team. That's great! Having an in-house specific framework that houses the styles used frequently by a site or team can be extremely beneficial -- while retaining uniqueness.

I also had a conversation with a friend this morning who is learning about [Zurb's Foundation framework](http://foundation.zurb.com). His comment was about trying to use Foundation "as is" but being frustrated by trying to figure out what to do with the button styles he needed to use. That's just the wrong perspective to take (sorry, man). I think if you are going to use a framework, you should work to follow the conventions and code used by the framework. You want the benefit of the deeply tested base code that is in place after all. BUT, you should feel free to alter the look of those default components. In fact, I am disappointed if you don't.

This is why I'm such a fan of "un-opinionated" CSS frameworks like [Inuit](http://inuitcss.com), [Skyline](http://skyline.is), and my own fork of Skyline -- [Air-Drop](https://github.com/guerillalabs/air-drop). They provide the architecture, structure, and tested components of the better know frameworks, but they leave the styling up to you.

The only time I'd advocate using a framework like Materialize is if your team has adopted Google's material design as the visual language for whatever project you are working on.

## Code Bloat

Let's take a look at the [color palette](http://materializecss.com/color.html) of the Materialize framework. The documentation certainly looks cool -- a large spectrum of colors to choose from and helper classes to modify the shade of each color.

Well, in a real project, how many of those colors will actually be in use? Ten percent? Less?

There are 536 selectors in the CSS dedicated to text and background colors -- many of which will never be used! That should be a huge red flag. Sure, a developer could delete or comment out the colors they aren't using, but guess what, they never do.

### Commenting Out by Default

And I'm guilty of the same thing -- adding too many "what if", neat modules to my Air-Drop framework. I've become more convinced that most of these things should be commented out by default (in a Sass framework, that is typically done by just commenting out the include line for a particular module in the master CSS file). I certainly have it on my list to have a leaner default state.

The idea is that I'm more likely to include a module when I need it -- for fancy forms, or modals, or a carousel -- than I am to remember to remove it when I don't use it. And, I think you are, too.

But, I think it's great to have those tried-and-true modules available in the framework. That's a big part of the power -- to not have to go searching for code when I need it, to not reinvent the wheel, to save time, and to increase quality. I just don't want those things adding to the file size or CSS complexity needlessly.

## Complexity

Yes, every framework has its own conventions -- a particular nomenclature, a code style, modules that are made available -- but, the idea of needing to "learn" a framework is beginning to drive me nuts. I'm going to pick on Materialize one last time.

Looking at the [mixins](http://materializecss.com/sass.html) available in the framework reveals the "Prefixer" options -- which are functions designed to alleviate the need to write browser specific prefixed styles to different browsers.

This sort of functionality is what drew a lot of people to Sass in the first place, but just allow me to say "[no, no, no, a thousand times no](http://giphy.com/gifs/no-arrested-development-michael-bluth-js3SsYYvMiWLC)".

The problem is that now you really do have a new syntax to learn. You need to remember which styles require a special function and which don't. You have to keep up with browser requirements to adjust the functions to provide the properly prefixed styles. You have to trust the framework authors to nail complex scenarios -- like flexbox.

This type of thing also makes it difficult to pull particular modules out of a framework and to use them elsewhere.

My recommendation is to write real CSS and to use a build system -- such as Grunt or Gulp -- and [Autoprefixer](http://css-tricks.com/autoprefixer/) to take care of all of this stuff for you.

Let conventions, standard CSS syntax, and build systems handle things wherever possible.

## Ownership

And, finally, I feel that a developer should have a deep understanding of the tools they employ. Yes, Bootstrap [may speed things up](https://twitter.com/brad_frost/status/559902179730157568), but do you know what it's doing? If you hit a bug can you fix it?

That's why I'm such a strong advocate for assembling your own framework. Know all of the code intimately -- sure, take good ideas from other places and adopt awesome code, but know what it does and why you included it. Ruthlessly strip out the things that you don't need. A personal framework should be an extension of your own coding style, something to speed you up and make you more efficient, not something you hire to do a job so you don't have to.
