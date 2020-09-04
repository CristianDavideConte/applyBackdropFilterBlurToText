# How do I apply backdrop-filter:blur() to a text element?

As far as i know there's **no way to directly apply the backdrop-filter:blur to a text** element. But we can work on it.<br> 
I have two possible solutions: <br>
## First solution: The Slowest One
1. Create a container
2. Apply a background to it (or to its ::before pseudo-element)
3. Use the filter:blur so that the container's background is blurred
4. Apply a svg mask onto the svg element and then apply the same background to the container (or to its ::before pseudo-element)

This way we have the blurried background on top that gets masked and the non-blurry version under it.<br><br>
**NOTE:** applying the background to the container's ::before pseudo element will allow you to modify the background  without touching the svg mask (usefull if you need to flip the background to create more contrast but you can't modify the original image).<br><br>

## Second solution: The Fastest One
1. Create a container
2. Apply a background to the container
3. Apply the backdrop-filter:blur to the svg element
4. Apply the svg-mask to the svg element

This way we have the effect we would have if the backdrop-filter: blur could be applied to text.<br>
**This one is the one which performs the best** because it's the only method that doesn't require the svg element to duplicate the background (which would have to be repainted at every frame because of the background-attachment:fixed attribute).<br><br>
If you are curious use the call the testSmoothness() method (i suggest to use setTimeout(testSmoothness, 5000)) in the browser console with the browser profiler and see the results ;)<br><br>

## Third solution: The Most Compatible One
#### (requires to have 2 copies of the background, one of which already blurred)
1. Create a container
2. Apply a background to the container
3. Apply the blurry version of the background to the svg element
4. Apply the svg-mask to the svg element

## Great...but the contrast is low :(
### Well...let's add a shadow then ;)
Applying the blur effect alone will result in "text" with a low contrast-ratio which is hard to read. To counter this i applied a shadow to the svg.
And this is how it's done:
1. Create an svg element in the document
2. In the <defs> tag create a filter with the <filter> tag and give it an id
3. In the <filter> tag create a <feGaussianBlur> with a stdDeviation of your choise (4 and 5 are good initial numbers)
4. Below, but still in the <filter> tag, create a <feComposite> with operator of "out" and the "in2" set to "SourceGraphics"
5. To shape our shadow we'll use an <image> tag (close the filter and defs tags before !)
6. Set the filter attribute's url of the image to the same id you gave to the <filter> tag
7. Set the "xlink:href" attribute's path of the image to the same one of your svg's path

This is code for reference if you need it:
```
<svg>
  <defs>
    <filter id = "trans-shadow">
      <feGaussianBlur stdDeviation = "5"/>
      <feComposite operator = "out" in2 = "SourceGraphic"/>
    </filter>
  </defs>
  <image filter = "url(#trans-shadow)" x = "0" y = "0" width = "100%" height = "100%" xlink:href = "./SVG.svg" />
</svg>
```
**If the text still isn't easy to read** remember that with the Method 2 you can still set an rgba(255,255,255,0.xyz) background-color and that with the all the 3 methods you can add a saturate(xyz%) to the filter/backdrop-filter !<br>
### WE'RE DONE ! Now our backdropped text looks cool and it's easy to read !
## Here you have a live demo: <a href = "https://cristiandavideconte.github.io/applyBackdropFilterBlurToText"/>DEMO</a></h2>
