---
title: Custom Social Sharing Buttons
description: This post documents how to create our own custom sharing buttons for the major social networks.
date: 2013-12-11
tags:
  - html
---
There comes a time in every web developer's life when he has to put social sharing buttons on a page. You've seen these, because they are on every site on the web; Facebook, Twitter, Pinterest, and Google + varieties being the most common. Every social network provides their own take on these buttons, [and they are evil](http://zurb.com/article/883/small-painful-buttons-why-social-media-bu). Also, you'll frequently have a site design that doesn't make use of the stock button styles. This post documents how to create our own custom sharing buttons for the major social networks.

Here's the design from a recent project:

<img src="/static/img/posts/social-sharing/share-design.png" alt="sharing button design">

The intent here is for the icons to link to the posting page of the specified social network and pre-fill the form with the desired message. Easy enough, right? Well, not always. Each social network uses a unique link format – many of those formats changing over time. So, read on for the current way to create each of these links.

A couple of notes before we get to the good stuff:

1. Since we're working with URLs here, our pre-filled text and page URLs will need to be URL encoded. I'd recommend you find [a good online tool](http://meyerweb.com/eric/tools/dencoder/) or Sublime Text package to do this for you.
2. This doesn't work like Facebook's "Like" button, and it won't add fans to your page. It also won't have the impact on search that the default Google "+1" button does.

## Twitter

Like its API, Twitter has changed the pattern of its share links a few times. Currently, it's best to use the [web intents](https://dev.twitter.com/docs/intents) format. Note: I do not make use of the widgets.js file as discussed on that page.

There are several types of web intents, but the [tweet intent](https://dev.twitter.com/docs/intents#tweet-intent) is the most applicable here. There are several variables in that documentation that may be very helpful for different situations.

A "Tweet This" link would be formatted something like:

<pre><code class="language-markup">&lt;a href=&quot;http://twitter.com/intent/tweet?url={url_encoded_url}&amp;amp;text={url_encoded_text}&amp;amp;hashtags={url_encoded_hashtags}&quot;&gt;Tweet This&lt;/a&gt;</code></pre>

So, there are variables added to the URL that determine what populates the status box on twitter. In my example we have:

<pre><code class="language-markup">url={url_encoded_url}</code></pre>

<pre><code class="language-markup">text={url_encoded_text}</code></pre>

<pre><code class="language-markup">hashtags={url_encoded_hashtags}</code></pre>

Do not put the curly brackets in your final link, and make sure you URL encode those values. Also, none of these variables are required, so only use the ones you need.

The html for a working example would be:

<pre><code class="language-markup">&lt;a href=&quot;http://twitter.com/intent/tweet?url=http%3A//guerillalabs.co/blog/social-sharing.html&amp;amp;text=I%20love%20Guerilla%20Labs%21&amp;amp;hashtags=AwesomeWebDesign&quot;&gt;Tweet This&lt;/a&gt;</code></pre>


And it would render like this: <a href="http://twitter.com/intent/tweet?url=http%3A//guerillalabs.co/blog/social-sharing.html&amp;text=I%20love%20Guerilla%20Labs%21&amp;hashtags=AwesomeWebDesign">Tweet This</a>.

You'll see a couple of other twitter link formats out there, <code class="language-markup">http://twitter.com/share</code> and <code class="language-markup">http://twitter.com/?status=</code>. I'd recommend you stick with the web intents format as it provides a lot more control.

## Tumblr

Because Tumblr has multiple post types, there are several ways to format your sharing link. Usually, we want people to share our pages as a "Link" post type, so I'll focus on that pattern. Here's the example:

<pre><code class="language-markup">&lt;a href=&quot;http://www.tumblr.com/share/link?url={url_encoded_url}&amp;amp;name={url_encoded_post_title}&amp;amp;description={url_encoded_post_text}&quot;&gt;Share on Tumblr&lt;/a&gt;</code></pre>

Once again, there are a few variables at your disposal.

<pre><code class="language-markup">url={url_encoded_url}</code></pre>

<pre><code class="language-markup">name={url_encoded_post_title}</code></pre>

<pre><code class="language-markup">description={url_encoded_post_text}</code></pre>

As before, do not put the curly brackets in your final link, and URL encode the values.

Here's a working example:

<pre><code class="language-markup">&lt;a href=&quot;http://www.tumblr.com/share/link?url=http%3A%2F%2Fguerillalabs.co/blog/social-sharing.html&amp;amp;name=I%20love%20Guerilla%20Labs%21&amp;amp;description=Guerilla%20Labs%20does%20amazing%20work%20and%20you%20should%20check%20them%20out.&quot;&gt;Share on Tumblr&lt;/a&gt;</code></pre>

Which will become: <a href="http://www.tumblr.com/share/link?url=http%3A%2F%2Fguerillalabs.co/blog/social-sharing.html&amp;name=I%20love%20Guerilla%20Labs%21&amp;description=Guerilla%20Labs%20does%20amazing%20work%20and%20you%20should%20check%20them%20out.">Share on Tumblr</a>.

## Reddit

Reddit uses this format:

<pre><code class="language-markup">&lt;a href=&quot;http://www.reddit.com/submit?url={url_encoded_url}&amp;amp;title={url_encoded_title}&quot;&gt;Share on Reddit&lt;/a&gt;</code></pre>

Change <code class="language-markup">{url_encoded_url}</code> and <code class="language-markup">{url_encoded_title}</code> to fit your needs. A final link would be formatted like:

<pre><code class="language-markup">&lt;a href=&quot;http://www.reddit.com/submit?url=http%3A%2F%2Fguerillalabs.co/blog/social-sharing.html&amp;amp;title=I%20Love%20Guerilla%20Labs%21&quot;&gt;Share on Reddit&lt;/a&gt;</code></pre>

And it will look like, <a href="http://www.reddit.com/submit?url=http%3A%2F%2Fguerillalabs.co/blog/social-sharing.html&amp;title=I%20Love%20Guerilla%20Labs%21">Share on Reddit</a>, on your page.

## LinkedIn

For LinkedIn, you'll need this:

<pre><code class="language-markup">&lt;a href=&quot;http://www.linkedin.com/shareArticle?mini=true&amp;url={url_encoded_url}&amp;title={url_encoded_title}&quot;&gt;Share on LinkedIn&lt;/a&gt;</code></pre>

Change <code class="language-markup">{url_encoded_url}</code> and <code class="language-markup">{url_encoded_title}</code> to fit your needs. A final link would be formatted like:

<pre><code class="language-markup">&lt;a href=&quot;http://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fguerillalabs.co/blog/social-sharing.html&amp;title=I%20Love%20Guerilla%20Labs%21&quot;&gt;Share on LinkedIn&lt;/a&gt;</code></pre>

And it will look like, <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fguerillalabs.co/blog/social-sharing.html&amp;title=I%20Love%20Guerilla%20Labs%21">Share on LinkedIn</a>, on your page.

There are a couple of other parameters you can use for LinkedIn share links – source and summary – which you can read about [in their documentation](https://developer.linkedin.com/documents/share-linkedin).

## Pinterest

Since Pinterest requires an image to share, these links are slightly more involved.  You can get a lot more information about the specific requirements, like recommended image dimensions, from their [developer site](http://developers.pinterest.com/pin_it/). You can go very deep with what is possible on Pinterest, but a simple sharing link looks like:

<pre><code class="language-markup">&lt;a href=&quot;http://www.pinterest.com/pin/create/button/?url={url_encoded_url}&amp;amp;media={url_encoded_image_url}&amp;amp;description={url_encoded_description}&quot;&gt;Pin It&lt;/a&gt;</code></pre>

You have <code class="language-markup">{url_encoded_url}</code> and <code class="language-markup">{url_encoded_description}</code>, which should be self explanatory if you read the rest of this post, but <code class="language-markup">{url_encoded_image_url}</code> is new. Simply put in the URL of the image you'd like to share.

Here's a working example:

<pre><code class="language-markup">&lt;a href=&quot;http://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fguerillalabs.co/blog/social-sharing.html&amp;amp;media=http%3A%2F%2Fguerillalabs.co%2Fimg%2Fposts%2Fsocial-sharing%2Fshare-design.png&amp;amp;description=Guerilla%20Labs%27%20Social%20Sharing%20Buttons&quot;&gt;Pin It&lt;/a&gt;</code></pre>

You'll end up with this on your page: <a href="http://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fguerillalabs.co/blog/social-sharing.html&amp;media=http%3A%2F%2Fguerillalabs.co%2Fimg%2Fposts%2Fsocial-sharing%2Fshare-design.png&amp;description=Guerilla%20Labs%27%20Social%20Sharing%20Buttons">Pin It</a>.


## Facebook and Google +

Facebook and Google have to be difficult. There is no way to designate the content of the share in the URL for these networks. But, they have provided methods of extracting this information from the page, which is a lot more powerful in many ways, but comes with a more prolonged development effort.

Facebook uses Open Graph tags to determine the content of the share. You can read a lot more about [The Open Graph Protocol](http://ogp.me) from the website.

Google can use several methods to determine the content of the share ([read more about it in their documentation](https://developers.google.com/+/web/snippet/)). One of those methods is Open Graph tags, so let's just kill two birds with one stone by putting the appropriate tags for both Facebook and Google + on our site.

The Open Graph tags go in the <code class="language-markup">&lt;head&gt;</code> element of your page. These are the tags that I recommend:

<pre><code class="language-markup">&lt;meta property=&quot;og:title&quot; content=&quot;{title}&quot;&gt;
&lt;meta property=&quot;og:image&quot; content=&quot;{image_url}&quot;&gt;
&lt;meta property=&quot;og:description&quot; content=&quot;{description}&quot;&gt;
&lt;meta property=&quot;og:site_name&quot; content=&quot;{site_name}&quot;&gt;</code></pre>

If you've followed along this far, you'll be able to make sense of the <code class="language-markup">content=</code> portion of each of those four tags. Note that this is the one scenario where we do not need to use URL encoding (because these values are on our page and not in a URL).

Once that is in place, the actual share links are pretty simple. For Facebook:

<pre><code class="language-markup">&lt;a href=&quot;https://www.facebook.com/sharer/sharer.php?u={url_encoded_url}&quot;&gt;Share on Facebook&lt;/a&gt;</code></pre>

And for Google:

<pre><code class="language-markup">&lt;a href=&quot;https://plus.google.com/share?url={url_encoded_url}&quot;&gt;Share on Google +&lt;/a&gt;</code></pre>

I do not have Open Graph tags on this site, but let's go ahead and see how real versions of these links would render on the site: <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fguerillalabs.co/blog/social-sharing.html">Share on Facebook</a> or  <a href="https://plus.google.com/share?url=http%3A%2F%2Fguerillalabs.co/blog/social-sharing.html">Share on Google +</a>.

## Email

While not a social network, email is still one of the most popular social communication tools around. Here how you'd create a link that kicks off an email containing your message:

<pre><code class="language-markup">&lt;a href=&quot;mailto:?Subject={url_encoded_subject}&amp;amp;body={url_encoded_message}&quot;&gt;Mail This&lt;/a&gt;</code></pre>

Tailor <code class="language-markup">{url_encoded_subject}</code> and <code class="language-markup">{url_encoded_message}</code> to fit your needs. A final link would be formatted like:

<pre><code class="language-markup">&lt;a href=&quot;mailto:?Subject=I%20love%20Guerilla%20Labs&amp;amp;body=Guerilla%20Labs%20does%20amazing%20work%21%20You%20should%20check%20them%20out.%20http%3A%2F%2Fguerillalabs.co&quot;&gt;Mail This&lt;/a&gt;</code></pre>

And it would render like: <a href="mailto:?Subject=I%20love%20Guerilla%20Labs&amp;body=Guerilla%20Labs%20does%20amazing%20work%21%20You%20should%20check%20them%20out%20at%20http%3A%2F%2Fguerillalabs.co">Mail This</a>.

A big caveat here is that this will work on iPhones, iPads, other mobile devices, and desktop computers using a native email application, but it will not work for people who use the web interface of email providers, like Gmail.

## The Next Level

There are a few more things you can do here, each of which I will leave as an exercise for the reader.

- Opening the links in a new window/tab with <code class="language-markup">target="_blank"</code>
- Using JavaScript to automatically grab the current page URL and insert it into your social sharing links without needing to customize them for each page.
