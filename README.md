
# 5 Ways to Properly Position Page Footer

This is just the result of studyng ways to properly place a footer in an HTML page. The techniques used in this material was taken from the article below, using different approaches using CSS. My personal favorite is the one using flexbox, which is very well supported by modern browsers and is very elegant and clean.

[Access the original article](https://css-tricks.com/couple-takes-sticky-footer/)

[Access the final material up and running  in GitHub Pages](https://juliolmuller.github.io/lesson-css-footer-positioning)

The purpose of a sticky footer is that it "sticks" to the bottom of the browser window. But not always, if there is enough content on the page to push the footer lower, it still does that. But if the content on the page is short, a sticky footer will still hang to the bottom of the browser window.

![Sticky Footer](https://css-tricks.com/wp-content/uploads/2016/05/sticky-footer-1.svg)

## There is negative bottom margins on wrappers

There was a wrapping element that held everything except the footer. It had a negative margin equal to the height of the footer. That was the basis of this one.

This one required an extra element inside the content area (the ".push"), to ensure that the negative margin didn't pull the footer up and cover any content. The push was also clever because it very likely didn't have any bottom margin of it's own. If it did, that would have to be factored into the negative margins, and having those two numbers not in sync doesn't look quite as nice.

```html
<body>
    <main class="wrapper">

        Content...

        <div class="push"></div>
    </main>
    <footer></footer>
</body>
```

```css
html, body {
    height: 100%;
    margin: 0;
}
.wrapper {
    min-height: 100%;
    margin-bottom: -80px; /* same of footer height */
}
footer,.push {
    height: 80px;
}
```

[See example](./footer1.html)

## There is negative top margins on footers

This technique did not require a push element, but instead, required an extra wrapping element around the content in which to apply matching bottom padding to. Again to prevent negative margin from lifting the footer above any content

Kind of a wash between this technique and the previous one, as they both require extra otherwise unnecessary HTML elements.

```html
<body>
    <main class="wrapper">
        <main>

            Content...

        </main>
    </div>
    <footer></footer>
</body>
```

```css
html, body {
    height: 100%;
    margin: 0;
}
.wrapper {
    min-height: 100%;
}
main {
    padding-bottom: 80px; /* same of footer height */
}
footer {
    height: 80px;
    margin-top: -80px; /* smae of footer height */
}
```

[See example](./footer2.html)

## There is calc() reduced height wrappers

One way to not need any extra elements is to adjust the wrappers height with calc(). Then there is not any overlapping going on, just two elements stacked on top of each other totaling 100% height.

We're using viewport units here as a little trick to avoid having to set 100% body height before you can set 100% wrapper height.

```html
<body>
    <main>

        Content...

    </main>
    <footer></footer>
</body>
```

```css
main {
    min-height: calc(100vh - 100px); /* subtracts footer height */
}
footer {
  height: 100px;
}
```

[See example](./footer3.html)

## There is flexbox :star: (my favorite)

The big problem with the above three techniques is that they require fixed height footers. Fixed heights are generally a bummer in web design. Content can change. Things are flexible. Fixed heights are usually red flag territory. Using flexbox for a sticky footer not only doesn't require any extra elements, but allows for a variable height footer.

The trick with flexbox is either:

- `flex: 1` on the child you want to grow to fill the space (the content, in our case).
- or, `margin-top: auto` to push the child away as far as it will go from the neighbor (or whichever direction margin is needed).
Remember we have a complete guide for all this flexbox stuff.

```html
<body>
    <main>

        Content...

    </main>
    <footer></footer>
</body>
```

```css
html, body {
    height: 100%;
}
body {
    display: flex;
    flex-direction: column;
}
main {
    flex: 1 0 auto;
}
footer {
  flex-shrink: 0;
}
```

[See example](./footer4.html)

## There is grid

Grid layout is even newer (and less widely supported) than flexbox. We have a complete guide for it too. You can also fairly easily use it for a sticky footer.

```html
<body>
    <main>

        Content...

    </main>
    <footer></footer>
</body>
```

```css
html {
    height: 100%;
}
body {
    min-height: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
}
footer {
    grid-row-start: 2;
    grid-row-end: 3;
}
```

[See example](./footer5.html)

## Additional Comments

These techniques were all implemented with header as well, a bit more challenging but way more applicaple to the real world. The implmentation also includes global styles to the elements and a resource to add text to the content container, so you can see the behavior of the footer when page is fullfilled by more content.

Text Generator: [Bacon Ipsum (JSON API)](https://baconipsum.com/json-api/) :heart:
