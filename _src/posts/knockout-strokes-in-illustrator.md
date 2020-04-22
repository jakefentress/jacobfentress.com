---
title: Knockout Strokes in Illustrator
description: I ran into an interesting problem on a recent project. I was creating a graphic in Adobe Illustrator, but I wanted the strokes of the overlapping shapes to be transparent.
date: 2014-02-03
tags:
  - illustrator
---
I ran into an interesting problem on a recent project. I was creating a graphic in Adobe Illustrator, but I wanted the strokes of the overlapping shapes to be transparent. It's easiest to show an example of how I wanted the final image to work:

<img src="/static/img/posts/knockout-strokes-in-illustrator/brandy-watermark.jpg" alt="Example Image">

One solution would have been to create my shapes so they weren't overlapping. This lacked the flexibility I wanted because it would have been difficult to get the dimensions exact and it would have been difficult to update should I ever want to go back and make adjustments. The best way to do this isn't difficult, so let me show you how to pull it off.

First, don't forget that Google is your friend on problems like this. After a couple of searches, I found [a thread on the Adobe Community](http://forums.adobe.com/thread/1049783) that answered my question. I'm going to record the steps here for posterity.

## Create two overlapping shapes in Illustrator.

<img src="/static/img/posts/knockout-strokes-in-illustrator/screen1.png" alt="Two overlapping shapes.">

## Add the stroke that you want knocked out.

<img src="/static/img/posts/knockout-strokes-in-illustrator/screen2.png" alt="Stroke added.">

## Select the shape with the stroke and go to the appearance panel.

<img src="/static/img/posts/knockout-strokes-in-illustrator/screen3.png" alt="appearance panel">

If you don't see the button shown in the image above, you can open the appearance panel by typing shift+F6 or by clicking on the Window>Appearance menu item.

## Click the arrow next to "Stroke".

<img src="/static/img/posts/knockout-strokes-in-illustrator/screen4.png" alt="stoke options expanded">

## Click "Opacity" and change opacity to 0%.

<img src="/static/img/posts/knockout-strokes-in-illustrator/screen5.png" alt="stoke opacity to 0%">

## Select both shapes and group them.

<img src="/static/img/posts/knockout-strokes-in-illustrator/screen6.png" alt="grouping shapes">

The easiest way to group shapes is to select the shapes, right-click, then choose "Group" from the contextual menu. You can also ungroup in this way if you need to later.

## Knockout group opacity.

<img src="/static/img/posts/knockout-strokes-in-illustrator/screen7.png" alt="knockout opacity">

With the group selected, go back to the appearance panel. Click on "Opacity" and click the box next to "Knockout Group" until it has a checkmark (a hypen will not work).

## Enjoy.

<img src="/static/img/posts/knockout-strokes-in-illustrator/screen8.png" alt="success">

Now the background is showing through all of the shapes where the stroke was – mission accomplished.

## Take it further.

<img src="/static/img/posts/knockout-strokes-in-illustrator/screen9.png" alt="take it further">

This example uses two shapes, but you can do the same thing with more shapes involved. Add a stroke to every shape as necessary before you group the shapes together. Then, follow the other steps as explained above.
