---
title: Styling Text Elements
description: I like to save my typical text elements and scope them to the element containing the content delivered from a wysiwyg field, since you shouldn't expect editors to enter module classes with a wysiwyg field.
date: 2015-01-13
tags:
  - css
---
In Chris Coyier's [Strategies for Keeping CSS Specificity Low](http://css-tricks.com/strategies-keeping-css-specificity-low/), a strategy that I use -- and that [Chris has written about before](http://css-tricks.com/opt-in-typography/) -- was mentioned. This strategy is around how to style typical text elements -- like <code class="language-css">p</code>, <code class="language-css">ul</code>, <code class="language-css">h2</code>, <code class="language-css">h3</code>, <code class="language-css">blockquote</code>, etc.

This seems like a simple thing to deal with. Traditionally, you'd define these base styles just after you do a CSS reset (or something similar). The problem is that you end up overwriting the base margins and font-sizes every time you create a module that contains one of these elements (very common with lists, paragraphs and headings).

When structuring a site, I like to follow a modular approach and use a BEM style naming convention. This means I end up with classes like <code class="language-css">.callout__title</code> instead of styling things like <code class="language-css">.callout h2</code> -- which is awesome because it lets that title be any element it needs to be for appropriate hierarchy in the page.

The benefit of using the element appropriate for the hierarchy becomes a liability when base text element styles are defined. Take the following base styles as an example:

<pre><code class="language-css">h2 {
    font-weight: normal;
    margin-bottom: 12px;
}

h3 {
    font-weight: bold;
    margin-bottom: 6px;
}</code></pre>

This may seem a bit arbitrary, but it happens more than you might expect. Now, in my module, if I want the <code class="language-css">.callout__title</code> to not be bold and only have a margin of 6px, I'll need to set both styles since I'm not sure which element will be used. The cascade cannot be trusted in this case.

That means I like to save my typical text elements and scope them to the element containing the content delivered from a wysiwyg field, since you shouldn't expect editors to enter module classes with a wysiwyg field. Typically (using Sass) I'll end up with a structure like:

<pre><code class="language-css">.text {
    p {
        ...
    }

    blockquote {
        ...
    }

    h2 {
        ...
    }

    h3 {
        ...
    }
}</code></pre>

This way, I'm not fighting specificity and constantly needing to overwrite styles in my modules. And, I can provide appropriate styles to elements entered through a wysiwyg editor where classes aren't convenient.
