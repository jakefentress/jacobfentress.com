---
title: An Introduction to PhantomJS
description: The best way to fix the problem would be to visit every product page on their site so the script could run and update its data. My job was to figure out a way to handle this automatically because they had 70,000 pages that needed to be visited.
date: 2014-01-17
tags:
  - js
---
At the end of a recent project, I had a client come to me with an odd request. They were implementing an ecommerce recommended products script on their site and had something go wrong, meaning their recommendations were way off. The vendor said that the best way to fix the problem would be to visit every product page on their site so the script could run and update its data. That's where I came in. They asked if I could figure out a way to handle this automatically because they had 70,000 pages that needed to be visited. I said, "umm... I think so".

So, let's break down what we had at this point:

- 70,000 pages to visit
- they were able to provide a CSV of all the URLs (thankfully)
- the JavaScript had to fully execute on each page (so traditional spidering wouldn't help)
- they wanted this to be as automated as possible

I turned to [PhantomJS](http://phantomjs.org/) to do the heavy lifting. PhantomJS bills itself as "a headless WebKit scriptable with a JavaScript API." That means it runs from the terminal, and does everything a typical browser does – it just doesn't have a browser window to let you see what's going on. Oh, and that "scriptable with a JavaScript API" part means that we can write code to tell it exactly what to do without any manual interaction, which is precisely why PhantomJS is so popular for automated testing.

I'd read a bit about PhantomJS in various tutorials, but had never used it myself. The rest of this article explains how I got everything installed and setup to fulfill the needs of this particular scenario.

## Installation

I'm on Mac OS X, and will deal with my installation for that platform. Windows and Linux users will want to look to the PhantomJS documentation for instructions.

The [download page](http://phantomjs.org/download.html) of the documentation has basic installation instructions. It basically says, "download, unzip, and it's ready to go". That of course is my paraphrase, and I'll lose some geek cred here, but I could never figure it out.

So, I went with the alternate installation method, which uses Homebrew. That means we'll have to install Homebrew if you don't already have it. The instructions are at the very bottom of the [Homebrew site](http://brew.sh/), but here's the command you need to type into a terminal window:

<pre><code class="language-markup">ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"</code></pre>

Once installation completes successfully, it's time to install PhantomJS. Run this command in your terminal window to do that:

<pre><code class="language-markup">brew update && brew install phantomjs</code></pre>

Now, you're ready to use PhantomJS.

## Getting Started

To make sure everything was working properly, I went through the [Quick Start](http://phantomjs.org/quick-start.html) in the PhantomJS documentation.

You'll need to create a JavaScript file – I'm going with hello.js for this – and place it in any folder you want (but make it pretty easy to get to or you'll want to punch yourself in the face later). The contents of that file should be:

<pre><code class="language-javascript">console.log('Hello, world!');
phantom.exit();</code></pre>

Not much there, and this will simply write "Hello, world!" to the terminal when it's run. But, this gets our feet wet.

Now, open the folder where you saved hello.js in the terminal. I recommend dragging the folder to the terminal icon in the dock as an easy way to open a terminal window with the path already set to the desired directory.

<img src="/static/img/posts/introducting-phantomjs/open.gif" alt="opening a folder in terminal">

In your terminal you'll type <code class="language-markup">phantomjs hello.js</code>. The "hello.js" part can be changed to be any JavaScript file that you want PhantomJS to execute. Run that command and you should see your very exciting message printed out.

Fun! But let's get to something real.

## Taking Care of Business

We'll create a new file for this (I'm going to call mine "visit-pages.js", but use whatever you'd like). I'll show you the contents of the file first, then break it down a bit.

<pre><code class="language-javascript">var MyPages = ['http://www.google.com',
'http://www.yahoo.com',
'http://www.bing.com',
'http://www.amazon.com',
'http://www.apple.com'];

function visit(MyPage, callback) {
    var page = require('webpage').create();
    page.open(MyPage, function (status) {
        console.log(status + ': ' + MyPage);
        page.close();
        callback.apply();
    });
}

function process() {
    if (MyPages.length > 0) {
        var MyPage = MyPages[0];
        MyPages.splice(0, 1);
        visit(MyPage, process);
    } else {
        phantom.exit();
    }
}

process();</code></pre>

To break it down, there is an array at the very beginning, named MyPages. This is an array of all the pages I'd like to visit. It wasn't a problem taking the CSV of pages my client provided and performing a couple of find-and-replace operations to format it like an array.

<aside class="note">
<p>An array is easy to create. Just place each item in quotes, and separate them with a comma. Make sure there isn't a comma after the last item. There are brackets – [ ] – around the entire thing.</p>
</aside>

After the array is two functions – visit and process. And, after the functions is a line that fires the process function.

The process function loops through the array we created, grabs the first item from the array, takes the first item out of the array, and fires the visit function – passing the first item from the array and telling it to fire the process function again when it completes. This happens for each item in the array, and when no items are left, it tells PhantomJS to exit.

I won't go through each line of the visit function, but it opens the page we just passed to it, writes the status of the open operation to the terminal, closes the page, then fires the process function again.

In the terminal, from the folder where you saved "visit-pages.js", run <code class="language-markup">phantomjs visit-pages.js</code>. You'll probably see some errors about fonts not loading properly, but you'll also see lines like this:

<pre><code class="language-markup">success: http://www.google.com</code></pre>

This let's us know where we are in the array (helpful when you are loading thousands of pages) and it tells us if a page was successful or if it failed. I had a couple of instances where the script just stopped running after a while, so this was invaluable in letting me be confident that all the pages had been visited. It wouldn't be difficult to extend this to tell you how many pages were successful and how many had failed so you'd have a simple generated report at the end.

Remember, this is just JavaScript, so loops and variables and a host of other things are at your disposal.

## Upping Your Game

There are tons of other things PhantomJS can automate for you. The documentation is pretty thorough and I'll leave next steps as an exercise for the reader. I will mention one other thing before I close, though.

I did some sample runs of this script before unleashing it on the full 70,000 page dataset. Timing those early runs told me that it would take 6 days (or so) to go through all of the pages. So, I broke my array up into several pieces (separate js files) and opened several terminal windows so I could run several scripts simultaneously.

Watch how many instances you have going at once. I ended up pushing my machine, and its fans, pretty hard. The scripts ended up taking about 30 hours total, but every page was visited and the client's script was updated just as they desired.

I'll definitely be coming back to PhantomJS more in the future. It's such a useful program to have in the tool belt.
