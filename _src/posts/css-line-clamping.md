---
title: CSS Line Clamping
description: A recent project called for multi-line text truncation, but I wasn't happy with any of the current techniques. It turns out that this is a really difficult effect to pull off reliably and effectively across browsers. So, I began to work on a better solution.
date: 2015-04-14
tags:
  - css
---
A recent project called for multi-line text truncation, but I wasn't happy with any [of the current techniques](https://css-tricks.com/line-clampin/). It turns out that this is a really difficult effect to pull off reliably and effectively across browsers. So, I began to work on a better solution. I wanted:

* an ellipsis to indicate the truncation (placed appropriately in relation to the text, if possible)
* a technique that worked responsively
* to avoid JavaScript

For my use, the <code class="language-markup">-webkit-line-clamp</code> method looked the best, but I needed a decent fallback for non-webkit browsers. The "fade out" method seems to be the best bet for those other browsers (outside of [much more complex techniques](http://www.mobify.com/blog/multiline-ellipsis-in-pure-css/)), but I really wanted to avoid the effect if the text wasn't long enough to actually be truncated.

So, why not just use JavaScript? It certainly would have made things easier, but in my situation, I would have up to 50 or so elements on a page that needed potential truncating (a list of titles). I didn't want to have to recalculate dimensions on that many elements every time the window was resized. Admittedly, in real-word use, resizing isn't *that* common of a use case. I just wanted to avoid the potential performance hiccups -- particularly on a page that was already pretty heavy with JavaScript.

## A New Fade

My next step was to develop a new "fade out" fallback method that would overcome the "only truncate when the text is longer than this" problem. (Resize your browser to see the truncation in action below.)

<p data-height="430" data-theme-id="0" data-slug-hash="GgVWry" data-default-tab="result" data-user="jacobfentress" class='codepen'>See the Pen <a href='http://codepen.io/jacobfentress/pen/GgVWry/'>CSS Line Clamping - Fade Out Only</a> by Jacob Fentress (<a href='http://codepen.io/jacobfentress'>@jacobfentress</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

There are a few things worth pointing out here:

1. You're going to need two elements. For my scenario, I already had a link within a heading, but if you don't then you will need to nest a <code class="language-markup">span</code> or <code class="language-markup">div</code>.
2. The <code class="language-markup">max-height</code> of the inner element should be one "line" taller than the outer element. This is what lets us place the ellipsis/gradient on the last line when the text is truncated. Note that I'm using Sass here to make it easy to swap out the number of visible lines and experiment a little more quickly.
3. The <code class="language-markup">:after</code> on our inner element is there to cover all but the final line of text. It has a solid background, which is there so the gradient will be covered up when the text is not truncated. So, know that this will only work over a solid background, but since the gradient technique only works in that scenario, anyway, it is acceptable to me. This <code class="language-markup">:after</code> element pulls its content from a <code class="language-markup">data-text</code> attribute which should contain the exact same text as the element.

The biggest downside to this is the requirement of the <code class="language-markup">data-text</code> attribute. If you're working with a CMS, it shouldn't be difficult to get this in place, but you should ensure that quotes and special characters are encoded or escaped. For longer blocks of text, I do not recommend using this technique. It works well for titles and other shorter items, but longer blocks would be better handled by [other fade out techniques](http://codepen.io/jacobfentress/pen/LnJcH).

The second downside is that the top lines of text do not appear to be selectable (because the real text is beneath our new pseudo element). You can actually select all of the text, you just can't see the highlight. I'd love to find a way around this, but again, the trade-off seemed acceptable.

## Combining Techniques

I now had a fade out technique that avoided my biggest irritations with the original method. But, I still wanted to use the <code class="language-markup">-webkit-line-clamp</code> method where available.

<code class="language-markup">@supports</code> seemed like the obvious choice here to separate the code, but it suffers from poor *[ahem]* support.

One of the greatest things about CSS is being able to insert styles that are simply ignored by browsers that do not understand them. So, the <code class="language-markup">-webkit-line-clamp</code> and fade out techniques can live happily together without too much effort.

<p data-height="430" data-theme-id="0" data-slug-hash="ByXpdW" data-default-tab="result" data-user="jacobfentress" class='codepen'>See the Pen <a href='http://codepen.io/jacobfentress/pen/ByXpdW/'>CSS Line Clamping</a> by Jacob Fentress (<a href='http://codepen.io/jacobfentress'>@jacobfentress</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

If you take a look at the code, you'll see that I still used <code class="language-markup">@supports</code> to clean up the pseudo elements (and make text selection better), but that currently only applies to Chrome.

And there you have it. Happy clamping.
