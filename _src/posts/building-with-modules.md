---
title: Building with Modules
description: A pretty common design pattern we run into frequently is the concept of modular pages. This is how we approach the application logic to render modular pages in an organized fashion.
date: 2020-01-29
tags:
  - contentful
  - jinja
  - nunjucks
layout: layouts/post.html
---
{% raw %}
A pretty common design pattern we run into frequently is the concept of modular pages. Think of a modular page as something like a portfolio entry, and within it you could have a full-width image, a three-up widget, a slideshow, a video, a text module, etc. — all in any order (and have as many of each) as you would like.

There's been quite a bit of writing around how to structure styles and scripts for modules... and there's still a lot that can be discussed there, but I want to talk through how we approach the application logic to render pages like this in an organized fashion.

At Fictive Kin, we've long used the Jinja templating language in Flask and have recently started using Nunjucks in Eleventy. Nunjucks is a javascript port of Jinja, so our workflow and methodologies can remain remarkably similar — which is a boost for our UX engineers as they move from project to project.

[Macros](https://jinja.palletsprojects.com/en/2.11.x/templates/#macros) are our friends in Jinja (Nunjucks) because they allow us to easily pass data around. For the following examples, there are a couple of files we'll be using: a template file (template.html) and a macro file (macros/modules.html).

At the top of template.html, we'll import the macro:

```
{% from 'macros/modular.html' import moduleList %}
```

Within the body of the template, we'll call the macro and pass it the appropriate data:

```
<div class="grid">
    {{ moduleList(project.modules) }}
</div>
```

The surrounding HTML is arbitrary and can be anything you need to wrap the modules. `project.modules` is an object that is already available within the template. Getting this data to the template will happen differently depending on the system you're using, and we'll leave that as an exercise for the reader. In our case, `modules` is a relationship for the `project` content type in Contentful. It will return all the various modules that have been added to this page in the CMS.

Let's take a look at the moduleList in the macro file:

```
{% macro moduleList(modules) %}
    {% for module in modules %}
        {% if module.sys.content_type.id == 'projectImageModule' %}
            {{ projectImgItem(
                module.image,
                size=module.size,
                link=module.url,)
            }}
        {% elif module.sys.content_type.id == 'projectVideoModule' %}
            {{ projectVidItem(
                id=module.vimeo_id,
                options=module.player_options,)
            }}
        {% endif %}
    {% endfor %}
{% endmacro %}
```

On the second line, we start looping through the modules that were passed in with `{% for module in modules %}`. Then, we look at the `content_type.id` of each module to determine which macro should be used to render that module. `content_type.id` is passed in from Contentful in this example and could look differently depending on you data source and data setup.

You'll see that we currently have two module types we're handling — `projectImageModule` and `projectVideoModule`. Both the `projectImgItem` and `projectVidItem` macros are declared within this same macro file.

Depending on the module type, we pass different data to the respective macros. In this case, we pass the image object, size field, and url field to the `projectImgItem` macro (size and url and tied to the `size` and `link` variables). The Vimeo ID field and player options fields are passed to the `projectVidItem` macro (as `id` and `options`).

Now let's take a look at those two macros:

```
{% macro projectImgItem(asset, size=false, link=false) -%}

{% if link -%}
<a href="{{ link }}">
{%- endif %}
    <img src="{{ asset.file.url }}" alt="" class="project__img {% if size %}project__img--{{ size }}{% endif %}">
{% if link -%}
</a>
{%- endif %}

{%- endmacro %}
```

and

```
{% macro projectVidItem(id=false, options='default' -%}

{% if id %}
    {% set videoParameters -%}
        {%- if options == 'background' -%}
            ?background=true&transparent=false&autopause=false
        {%- elif options == 'autoplay with chrome' -%}
            ?autoplay=true&byline=false&color=ffffff&loop=true&muted=true&portrait=false&title=false&transparent=false&autopause=false
        {%- else -%}
            ?byline=false&color=ffffff&loop=true&portrait=false&title=false&transparent=false&autopause=false
        {%- endif -%}
    {%- endset %}

    <div class="project__vid">
        <div class="multimedia">
            <iframe src="https://player.vimeo.com/video/{{ id }}{{ videoParameters }}" width="640" height="459" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        </div>
    </div>

    </div>
{% endif %}

{%- endmacro %}
```

Now, we're returning the proper html, populated with the correct data, to the template file. Our modular page is rendering as desired, with any order and combination of modules (without needlessly repeating code). Job done.

This concept can be extended to include more module types and to handle more passed data (I could imagine wanting to pass some text to the image module to populate the `alt` attribute). Happy experimenting.
{% endraw %}
