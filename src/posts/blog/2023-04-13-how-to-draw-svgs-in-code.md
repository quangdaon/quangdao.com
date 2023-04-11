---
title: How to Draw with SVG Code
description: Ever wished you can draw with nothing but a text editor? I don't know why, but now you can!
tags: [svg, tutorial]
categories: [Technology]
date: '2023-04-13'
socialImage: /images/blog/chicken.svg
---

<script>
	import ChickenCrestStarts from '$lib/components/diagrams/chicken/ChickenCrestStarts.svelte';
	import ChickenCrestBump from '$lib/components/diagrams/chicken/ChickenCrestBump.svelte';
	import QuadraticBezier from '$lib/components/diagrams/QuadraticBezier.svelte';
	import KeyAnimated from '$lib/components/secrets/KeyAnimated.svelte';
	import Quote from '$lib/components/shared/Quote.svelte';
</script>

There are many different kinds of images, from high-resolution photographic JPEGs to flashy, graphical PNGs. Among the ocean of graphic formats resides the humble SVG. You might know of `.svg` as the file format that you can export from Adobe Illustrator so you can use it on the web. You might have even heard the notion that an SVG is a "vector" graphic format that uses math to draw images instead of pixels. What does that really mean? Follow me on this journey as we learn to draw an SVG graphic using nothing but a text editor, and find out exactly what they are along the way.

## What is SVG?

Most image formats, also known as "raster" images, store their graphical data as a set number of pixels. What sets them apart from one another is the compression algorithm they use to reduce the amount of space all those pixels take up. For example, PNG excels at compressing sharp, flat graphics because it utilizes a lossless algorithm, whereas JPEGs are better at compressing the more photographic material the algorithm is designed for.

Scalable Vector Graphics (SVG), on the other hand, is a markup language, much like HTML. In fact, it is also based off XML, just like HTML is, and it's even compatible with modern web standards. But whereas HTML marks up text documents, SVG marks up shapes and paths.

To get a better understanding of what SVG is as a markup language, let's learn to draw one the same way we would write an HTML document. Here's a preview of the final result we'll be drawing:

<svg viewBox="0 0 120 80">
  <g class="frame">
    <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
    <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  </g>
  <g class="chicken">
    <polygon class="beak" points="45,35 35,45 45,55" fill="#f8f600" />
    <circle class="head" cx="60" cy="42" r="20" fill="#fff" />
    <g class="eye">
      <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
      <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
    </g>
    <path class="crest" d="
      M 45.85 27.85
      L 44.44 26.44
      Q 45.55 20.38, 51.58 21.67
      Q 54.92 16.49, 60 20
      Q 65.07 16.49, 68.41 21.67
      Q 74.44 20.38, 75.55 26.44
      L 74.14 27.85
      A 20 20, 0, 0, 0, 45.85 27.85
    " fill="#f00" />
  </g>
</svg>

## A Window to the... Fowl?

Let's start off by defining the bounds of our canvas:

```svg
<svg viewBox="0 0 120 80">
</svg>
```


Much like the `<html>` tag, the `<svg>` tag tells the browser that we are starting a block of SVG code. Already, one of the benefits here is we can either save this as a standalone `.svg` file or embed it directly into an HTML document. The catch is that to use it as a standalone file, you will need to define a namespace be adding `xmlns="http://www.w3.org/2000/svg"` to your `<svg>` tag. Other than that, it will work the same either way.

The `viewBox` attribute defines the bounds of the image that will be visible. The first two numbers represent the coordinates of our origin (aka the top-left corner). Generally, if you're hand-drawing, it's probably going to be at `0,0`, but this could be useful if, for example, you want to crop an existing SVG artwork.

The next two numbers define the width and height. In this case, we are creating an SVG canvas that is 120 units wide and 80 units tall. Because the units are relative, the specific values are kind of arbitrary. A "0 0 120 80" view box is exactly the same as "0 0 3 2" as long as you adjust the value of your elements accordingly. I tend to prefer setting my viewBox as close to 100x100 to make the math a little more manageable.

An empty canvas is hard to visualize, so let's make a little frame to put our drawing in.

## A Frame for Our Masterpiece (Rectangles and Strokes)

```svg
<svg viewBox="0 0 120 80">
  <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
</svg>
```

<svg viewBox="0 0 120 80">
  <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
</svg>

There were a couple ways we could have approached this. Here, we are drawing a rectangle and giving it a gold stroke that is 8 units wide, which is essentially the outline. Another idea would have been to just draw two separate rectangles.

Rectangles are drawn by declaring the position of the top-left corner (that's the `x` and `y` attributes) and defining the width and height. You might have noticed that the rectangle is placed at `4,4` and we had to shift the width and height a little. This is because strokes in SVG are drawn from the _center_. To illustrate that a little better, let's draw that same rectangle again, but with a smaller stroke width.

```svg
<svg viewBox="0 0 120 80">
  <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
  <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
</svg>
```

<svg viewBox="0 0 120 80">
  <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
  <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
</svg>

Notice how we did not change the position or size of the rectangle at all, but the stroke was shed evenly from the inside and outside. The actual boundaries of our rectangle actually starts at the center of the stroke. Another thing to note here is that the new `<rect>` was declared _after_ our original. Similar to HTML, SVG elements are rendered in the order they were defined, so later elements are rendered on a higher "layer". Try switching the two `<rect>` elements and you'll see the darker gold highlight disapppear. But you know what, I rather like the way that new stroke looks, so let's keep it as a little decoration for our frame.

## Birth of a Chicken (Circles and Ellipses)

Let's draw a circle for our chicken's head.

```svg
<svg viewBox="0 0 120 80">
  <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
  <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  <circle cx="60" cy="42" r="20" />
</svg>
```

<svg viewBox="0 0 120 80">
  <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
  <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  <circle cx="60" cy="42" r="20" fill="#fff" />
  <circle cx="60" cy="42" r="20" />
</svg>

Unlike rectangles, circles are drawn relative to their centers. That's the `cx` and `cy` attributes -- center-x and center-y. We are drawing the circle slightly below the exact center of the SVG viewport at a radius (`r`) of 20 units. Let's draw an eye.

```svg
<svg viewBox="0 0 120 80">
  <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
  <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  <circle cx="60" cy="42" r="20" fill="#fff" />
  <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
  <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
</svg>
```

<svg viewBox="0 0 120 80">
  <g class="frame">
    <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
    <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  </g>
  <g class="chicken">
    <circle class="head" cx="60" cy="42" r="20" fill="#fff" />
    <g class="eye">
      <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
      <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
    </g>
  </g>
</svg>

Ellipses are drawn very similarly to circles. The difference is instead of one radius, you have to define an x-radius (`rx`) and a y-radius (`ry`). You can also think of a circle as a ellipse defined as `<ellipse cx="50" cy="50" rx="{r}" ry="{r}" />`. I added a second ellipse to add a little bit of glare to the eye. Notice how the values used for this one are not whole numbers. In SVG, you can get as precise as you want.

Math can come in handy here. It would be nice if the center of the eye can be roughly a quarter of the way in from the top and left side of the head. Remember that we are defining the circle from the center (`60,42`) with a radius of 20. We want the eye to be about half-way between the center and the edges, which would be about `(60 - 10),(42 - 10)`, or `50,32`. With some understanding of design and mathematics and a chicken reference or two, you can be even more precise with placement and proportions, but in this case, I just kind of eyeballed it.

## SVGs Can be Refactored Too (Groups)

At this point, our code is getting a tiny bit unyieldy so I think it might be a good idea to start grouping our shapes.

```svg
<svg viewBox="0 0 120 80">
  <g class="frame">
    <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
    <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  </g>
  <g class="chicken">
    <circle class="head" cx="60" cy="42" r="20" fill="#fff" />
    <g class="eye">
      <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
      <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
    </g>
  </g>
</svg>
```

The `<g>` element in SVG _**g**roups_ a series of other elements. They are similar to `<div>`s in HTML in that they generically group other elements without having any intrinsic meaning on their own. Transformations and certain attributes that are applied to groups will also be inherited by their children. I won't be showing that in this tutorial, but you can see that by adding a stroke to the `.chicken` group. I've added class names to these groups, as well as the head itself, just to make it easier to identify them.

## Peck, Peck, Peck! (Polygons)

The next step is to draw the beak.

```svg
<svg viewBox="0 0 120 80">
  <g class="frame">
    <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
    <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  </g>
  <g class="chicken">
    <polygon class="beak" points="45,35 35,45 45,55" fill="#f8f600" />
    <circle class="head" cx="60" cy="42" r="20" fill="#fff" />
    <g class="eye">
      <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
      <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
    </g>
  </g>
</svg>
```

<svg viewBox="0 0 120 80">
  <g class="frame">
    <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
    <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  </g>
  <g class="chicken">
    <polygon class="beak" points="45,35 35,45 45,55" fill="#f8f600" />
    <circle class="head" cx="60" cy="42" r="20" fill="#fff" />
    <g class="eye">
      <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
      <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
    </g>
  </g>
</svg>

You might be catching on to how SVG elements work by now. Here, we are declaring a `<polygon>` to draw a triangle. Unlike the elements we've seen so far, polygons do not have individual attributes for each coordinate. Instead, polygons are drawn as a series of points that are connected to form a solid shape. The `points` attribute takes any number of coordinates in the format of `x,y`, which themselves are then separated by spaces. Technically, commas don't really matter, but they are useful for separating pairs of coordinates. As far as the broswer is concerned, `points="45 35 35 45 45 55"` or `points="45,35,35,45,45,55"` are just as valid, as long as you have an even set of coordinates.

One important thing to notice is that I am drawing the polygon "behind" the head, so that I can use the circle to mask the parts of the triangle that I don't want to be visible. If you're good at math, you can be more thoughtful and precise with the placement, but for this beak, I'm just estimating again.

## Warning: Math Ahead (Paths: Lines and Curves)

I have mentioned several times that mathematics is a vital tool to draw with SVG, but I constantly seem to be avoiding it. Well, that's because I'm about to introduce you to what I would consider to be the most powerful SVG element: `<path>`. There is going to be a _lot_ of math coming up, but if you're not interested in how I arrived at the values I used, the math sections will have a "Skip to Code" link to skip to the next code section.

We are about to draw the crest.

### Identifying Our Starting Points

[(Skip to Code)](#basics-of-the-path-element)

The first step to drawing this crest is identifying the start and end points. I'm drawing this crest at kind of a 90° slice from the top of the head, extending out two units to serve as the base. Here's a visual of the points we care about for this step:

<div class="diagram"><ChickenCrestStarts /></div>

I have called out three known points here, as well as our angle of rotation. `o` is the center of our chicken's head (`60,42`). We will be using points `a` and `b` as our points of reference, since we can easily determine what they are. `b` is the very top of our circle. Since our circle has a radius of 20 units, we just need to subtract 20 from our center's y-coordinate to find the coordinates for `b`. Similarly, since we want the base of the crest to extend two units from the head, we can subtract an additional 2 units from `b`'s y-coordinate to get the location of `a`.

The "north" 90° slice of our chicken's head is the slice from point `b'` to point `b"`. Since we don't have those coordinates offhand, we can calculate them by rotating `b`. We can do that with a little bit of trigonometry, using these functions to calculate the new x and y coordinates:

<center>
x' = x * cosθ - y sinθ

y' = x * sinθ + y cosθ
</center>


This assumes that the point of rotation is `0,0`. To rotate around `60,42` or any other point, we would need adjust our input coordinates to be relative to `0,0`, and then readjust it to the intended point of origin after calculating the rotation. Since this was supposed to be an SVG tutorial and not a trigonometry lesson, here are a couple JavaScript functions to perform these calculations for you:

```javascript
const rotateAngle = (
  [x, y],
  theta
) => {
  return [
    x * Math.cos(theta) - y * Math.sin(theta),
    x * Math.sin(theta) + y * Math.cos(theta),
  ];
};

const rotateAngleAroundOrigin = (
  [x,y],
  [originX, originY],
  theta
) => {
  const [newX, newY] = rotateAngle([x - originX, y - originY], theta);
  return [newX + originX, newY + originY];
}
```

Let's start with `b"`, which is `b`, rotated 45° clockwise. Since we are working in a cartesian plane rather than a polar one, we need to convert our degree to radians. All you need to know for this is that π is equal to 180° and we just need to calculate the proportions thereof. 45° is 1/4 of 180°, so our angle in radians is π * 1/4, or π/4. Now that we have all of our parameters, let's plop them into our rotation function:

```js
rotateAngleAroundOrigin([60, 22], [60, 42], Math.PI / 4); // [74.14213562373095, 27.85786437626905]
```

That's actually way more precision than we need, so we will just be using the first two decimal places of all of our results going forward.

### Basics of the Path Element

Here are the calculated values for all of our starting points:

| Point | Reference Point | Rotation Angle | New Coordinates |
| ----- | --------------- | -------------- | --------------- |
| a'    | (60, 20)        | -45° (-PI / 4) | (44.44, 26.44)  |
| b'    | (60, 22)        | -45° (-PI / 4) | (45.85, 27.85)  |
| a"    | (60, 20)        | 45° (PI / 4)   | (75.55, 26.44)  |
| b"    | (60, 22)        | 45° (PI / 4)   | (74.14, 27.85)  |

With the points we need now in hand, let's actually talk about the `<path>` element. Here is what our points look like when plotted into a path:

```svg
<svg viewBox="0 0 120 80">
  <g class="frame">
    <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
    <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  </g>
  <g class="chicken">
    <polygon class="beak" points="45,35 35,45 45,55" fill="#f8f600" />
    <circle class="head" cx="60" cy="42" r="20" fill="#fff" />
    <g class="eye">
      <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
      <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
    </g>
    <path class="crest" d="
      M 45.85 27.85
      L 44.44 26.44
      L 75.55 26.44
      L 74.14 27.85
      Z
    " fill="#f00" />
  </g>
</svg>
```

<svg viewBox="0 0 120 80">
  <g class="frame">
    <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
    <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  </g>
  <g class="chicken">
    <polygon class="beak" points="45,35 35,45 45,55" fill="#f8f600" />
    <circle class="head" cx="60" cy="42" r="20" fill="#fff" />
    <g class="eye">
      <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
      <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
    </g>
    <path class="crest" d="
      M 45.85 27.85
      L 44.44 26.44
      L 75.55 26.44
      L 74.14 27.85
      Z
    " fill="#f00" />
  </g>
</svg>

We gave our chicken a cute little headband! While this is not necessarily what we want, it is certainly a start. Let's talk about what's going on here. At face value, the `<path>` looks almost like a `<polygon>` with extra steps, and in a way, it is. The `d` attribute in a path is almost like its own programming language -- it is a list of instructions on how to draw the path. Think of it as if you are holding a pen, and feeding it a series of commands.

The first command, `M`, means to "move to" a specific point without drawing anything. This is usually the first command in a path, since it defines our starting point. In our case we want to move the point we've identified as `b'`. The `M` command takes an `x` and a `y` argument, which correlates to the coordinates in our point.

Next is `L`, which draws a line. All commands in SVG paths come in two varieties - a capital command (e.g. `L`) accept absolute points as arguments, while the lowercase alternative (e.g. `l`) takes arguments that are relative to the point we landed on in the previous command. For example, if we wanted to draw a line that's exactly one unit to the left and one unit up from our starting point, we can use `l -1 -1`. Since we know the exact coordinates we want to draw to, we can use `L` to draw lines to `a'`, `a"`, and `b"`.

The final command is `Z`, which connects our last point to our very first point to close the gap. Since we are not drawing a stroke for this particular shape, the `Z` here doesn't actually make a difference, but you can add `stroke="#000" stroke-width="0.1"` and remove or add the `Z` to see the difference. We will be omitted this going forward, but I just wanted to call it out as it's useful when drawing outlined shapes.

Now that we have established the basics of `<path>`, let's use more lines to divide our crest up into four "bases". I'm just going to use the same calculations from before to rotate our original point `a` half way between `a'` and again between `a"` to fill in the remaining points.


```svg
<path class="crest" d="
  M 45.85 27.85
  L 44.44 26.44
  L 51.58 21.67
  L 60 20
  L 68.41 21.67
  L 75.55 26.44
  L 74.14 27.85
" fill="#f00" />
```

<svg viewBox="0 0 120 80">
  <g class="frame">
    <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
    <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  </g>
  <g class="chicken">
    <polygon class="beak" points="45,35 35,45 45,55" fill="#f8f600" />
    <circle class="head" cx="60" cy="42" r="20" fill="#fff" />
    <g class="eye">
      <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
      <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
    </g>
    <path class="crest" d="
      M 45.85 27.85
      L 44.44 26.44
      L 51.58 21.67
      L 60 20
      L 68.41 21.67
      L 75.55 26.44
      L 74.14 27.85
    " fill="#f00" />
  </g>
</svg>

### To Be the Best, You Have to Beat the Bézier

([Skip to Code](#curvin-out-a-path))

At this point, we haven't done anything with `<path>` that couldn't have been done with a `<polygon>`. But we want our chicken's crest to be a little bumpier than what we have now, and this is where path comes in handy. In order to draw uniform bumps on our chicken's crest, we first need to understand Bézier curves.

Bézier (beh•zee•ay) curves are curves between two points that are drawn with the aide of one or more hidden control points. In the case of a quadratic Bézier curve, which is what we'll be using, there is a single control point. Two lines are calculated, one between the start point and the control point, and another between the control and the end. Then, each point _t_, which represents a proportion, or "time," from the start and end of each line, is connected to determine the equivalent proportion of our curve.

<div class="diagram"><QuadraticBezier /></div>

Higher order curves are created using more control points, which are connected using the same technique. The points generated from them are then used as anchor points for the next level down. For example, the lines drawn from a cubic curve are connected to establish the step, end, and control points for a quadratic curve. In essence, a cubic Bézier curve is a quadratic Bézier curve with moving anchor points. Likewise, a fourth-order curve generates a cubic curve with moving points. I know that made absolutely no sense, so check out [Wikipedia](https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Constructing_B%C3%A9zier_curves) for a set of animated examples to visualize these algorithms.

Going back to our chicken, the reason we want to use Bézier curves for the bumps isn't necessarily because there's a specific arc we want to draw. Rather, what using one allows us to do is identify some point _n_ that can be computed relative to each of our sets of connecting points so that each bump is drawn using the exact same curve. For a symmetrical curve, we'll want to identify some point that is halfway between our start and end points for each segment of our crest, offset by some additional distance from the tip of our crest.

<div class="diagram"><ChickenCrestBump /></div>

The offset we'll be using for our chicken is four units. From here, we can use the same calculation from [Identifying Our Starting Points](#identifying-our-starting-points) to figure out our four control points. If you are feeling ambitious, you can try to calculate four units out from the point `a'` we already calculated. But I am a little worn out from all these curve calculations, so I am just going to go off our original point `a` instead because the numbers are a little cleaner. Four units out from point `a` is just straight up to `60,16`.

The angle between the segments we have already defined for our crest is 22.5°, or 1/8π in radians. Since we're looking for the midpoint between the edges of each segment, we will want to offset our control points by 1/16π. So to find our control points we need to rotate our new point by -3/16π, -1/16π, 1/16π, and 3/16π.

### Curvin' Out a Path

Here are the control points we'll be using for the bumps on our crest:

| Segment # | Rotation Angle      | Control Point |
| --------- | ------------------- | ------------- |
| 1         | -33.75° (π * -3/16) | 45.55, 20.38  |
| 2         | -11.25° (π * -1/16) | 54.92, 16.49  |
| 3         | 11.25° (π * 1/16)   | 65.07, 16.49  |
| 4         | 33.75° (π * 3/16)   | 74.44, 20.38  |

Let's apply these new points to our path.

```svg
<path class="crest" d="
  M 45.85 27.85
  L 44.44 26.44
  Q 45.55 20.38, 51.58 21.67
  Q 54.92 16.49, 60 20
  Q 65.07 16.49, 68.41 21.67
  Q 74.44 20.38, 75.55 26.44
  L 74.14 27.85
" fill="#f00" />
```

<svg viewBox="0 0 120 80">
  <g class="frame">
    <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
    <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  </g>
  <g class="chicken">
    <polygon class="beak" points="45,35 35,45 45,55" fill="#f8f600" />
    <circle class="head" cx="60" cy="42" r="20" fill="#fff" />
    <g class="eye">
      <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
      <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
    </g>
    <path class="crest" d="
      M 45.85 27.85
      L 44.44 26.44
      Q 45.55 20.38, 51.58 21.67
      Q 54.92 16.49, 60 20
      Q 65.07 16.49, 68.41 21.67
      Q 74.44 20.38, 75.55 26.44
      L 74.14 27.85
    " fill="#f00" />
  </g>
</svg>

It may be difficult to notice at first because there are a lot of numbers, but we haven't actually _removed_ any lines of code. Take the command that drew a line to our second point for example. Previously, it was `L 51.58 21.67`. That line was changed to `Q 45.55 20.38, 51.58 21.67`. The original `51.58 21.67` coordinates are still there at the end, and the new `45.55 20.38` is the control point that we identified for our first segment. That should give us a hint as to what's going on with the `Q` command.

The `Q` command accepts the paramters `cx`, `cy`, `dx`, and `dy` and draws a quadratic Bézier curve from the previous point to `(dx,dy)`, using `(cx,cy)` as our control point. Like other path commands, there is also a `q` command the does the same thing, but with parameters that are relative to the previous point.

### Finishing Touch

The final step for our crest is to crop out the shape of the head. We can easily accomplish this by moving the path for the crest up so that it's rendered before the head, just like we did for the beak. But since you were able to follow along up to this point, I think you totally earned the right to flex. So let's just cap off this crest with a proper, totally unnecessary curve around the chicken's head.

```svg
<path class="crest" d="
  M 45.85 27.85
  L 44.44 26.44
  Q 45.55 20.38, 51.58 21.67
  Q 54.92 16.49, 60 20
  Q 65.07 16.49, 68.41 21.67
  Q 74.44 20.38, 75.55 26.44
  L 74.14 27.85
  A 20 20, 0, 0, 0, 45.85 27.85
" fill="#f00" />
```

<svg viewBox="0 0 120 80">
  <g class="frame">
    <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
    <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  </g>
  <g class="chicken">
    <polygon class="beak" points="45,35 35,45 45,55" fill="#f8f600" />
    <circle class="head" cx="60" cy="42" r="20" fill="#fff" />
    <g class="eye">
      <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
      <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
    </g>
    <path class="crest" d="
      M 45.85 27.85
      L 44.44 26.44
      Q 45.55 20.38, 51.58 21.67
      Q 54.92 16.49, 60 20
      Q 65.07 16.49, 68.41 21.67
      Q 74.44 20.38, 75.55 26.44
      L 74.14 27.85
      A 20 20, 0, 0, 0, 45.85 27.85
    " fill="#f00" />
  </g>
</svg>

We are using a different kind of curve for this one. Since there's a specific ellipse (which happens to be a circle in our case) we want to trace around, we can use the `A`, or arc, command. This command takes in these parameters: `rx`, `ry`, `rotation`, `large-arc-flag`, `sweep-flag`, `x` and `y`. `rx` and `ry` define the size of the ellipse we want to trace our arc around. In our case, we are tracing around a circle with a radius of 20, so we will use 20 for both parameters. `rotation` becomes much more useful when you're tracing around an oblong ellipse. With a circle, we can rotate it as much as we want and it wouldn't make a difference, so we can keep this at zero. As usual, the last two `x` and `y` parameters define our destination point.

The two remaining `flag` parameters are a little difficult to explain, but imagine you have two overlapping ellipses. The two points where they intersect are our previous point and the new point defined by the `x` and `y` parameters. There are four arcs you can trace along the circles between the two points, and these flags determine which of the arcs you would follow. For a more detailed explanation, check out [MDN's Tutorial on SVG Arcs](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs).

With the arc in place, we have officially completed our chicken! Here's the complete final SVG code:

```svg
<svg viewBox="0 0 120 80">
  <g class="frame">
    <rect x="4" y="4" width="112" height="72" stroke-width="8" stroke="#e2af48" fill="#e6e6e6" />
    <rect x="4" y="4" width="112" height="72" stroke-width="1" stroke="#674f1e" fill="none" />
  </g>
  <g class="chicken">
    <polygon class="beak" points="45,35 35,45 45,55" fill="#f8f600" />
    <circle class="head" cx="60" cy="42" r="20" fill="#fff" />
    <g class="eye">
      <ellipse cx="51" cy="36" rx="2" ry="4" fill="#000" />
      <ellipse cx="51.5" cy="34.5" rx="0.5" ry="1.2" fill="#fff" />
    </g>
    <path class="crest" d="
      M 45.85 27.85
      L 44.44 26.44
      Q 45.55 20.38, 51.58 21.67
      Q 54.92 16.49, 60 20
      Q 65.07 16.49, 68.41 21.67
      Q 74.44 20.38, 75.55 26.44
      L 74.14 27.85
      A 20 20, 0, 0, 0, 45.85 27.85
    " fill="#f00" />
  </g>
</svg>
```

## Conclusion

Realistically, unless you're really, _really_ bad at using vector graphic editors like Adobe Illustrator or Inkscape, those tools are probably going to be quicker and easier than drawing the graphics in code. However, it is still a useful skill to understand how SVGs work. Where understanding SVG code really becomes useful is when you need to programmatically manipulate one, such as in animation or procedurally generated graphics.

For instance, the interactive diagrams in this post are all built using SVG. Additionally, if you have found the lock and key on my homepage, you may have noticed that the key changes shape as you change the combination. I'm using SVG in conjunction with Svelte to achieve this effect. You can check out [the source code in my git repository](https://github.com/quangdaon/quangdao.com/blob/main/src/lib/components/secrets/Key.svelte).

<KeyAnimated />

I have been an advocate for SVG for a long time, and it is not only because of all the cool things you can do like this. Because SVG files are ultimately a series of mathematical instructions rather than a collection of pixels, they tend to be much smaller in file size than their traditional counterparts like PNGs, especially at higher resolutions. In other words, not only are SVGs capable of these amazing effects, you are also saving your users in data costs by using them. So I encourage you to take what you learned today and continue exploring SVGs further.

<Quote by="Walt Whitman">Now, Voyager, sail thou forth, to seek and find.</Quote>

<style>
  svg, .diagram {
    display: block;
    margin: 2em auto;
    max-width: 600px;
    overflow: hidden;
  }
</style>