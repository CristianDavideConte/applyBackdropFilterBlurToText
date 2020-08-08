<h1>Is there a way to apply backdrop-filter:blur() to a text element?</h1>
<h1>YES!</h1><br>
As far as i know there's <strong>no way to directly apply the backdrop-filter:blur to a text</strong> element. But we can work on it.<br> 
I have two possible solutions: <br>
<strong><h2>First solution: The Slowest One</h2></strong>
<ul>
  <li>Create a container</li>
  <li>Apply a background to it (or to its ::before pseudo-element)</li>
  <li>Use the filter:blur so that the container's background is blurred</li>
  <li>Apply a svg mask onto the svg element and then apply the same background to the container (or to its ::before pseudo-element)</li>
</ul>
This way we have the blurried background on top that gets masked and the non-blurry version under it.<br><br>
<strong>NOTE:</strong> applying the background to the container's ::before pseudo element will allow you to modify the background  without touching the svg mask (usefull if you need to flip the background to create more contrast but you can't modify the original image).<br><br>
<strong><h2>Second solution: The Fastest One</h2></strong>
<ul>
  <li>Create a container</li>
  <li>Apply a background to the container</li>
  <li>Apply the backdrop-filter:blur to the svg element</li>
  <li>Apply the svg-mask to the svg element</li>
</ul>
This way we have the effect we would have if the backdrop-filter: blur could be applied to text.<br>
<strong>This one is the one which performs the best</strong> because it's the only method that doesn't require the svg element to duplicate the background (which would have to be repainted at every frame because of the background-attachment:fixed attribute).<br><br>
If you are curious use the call the testSmoothness() method (i suggest to use setTimeout(testSmoothness, 5000)) in the browser console with the browser profiler and see the results ;)<br><br>

<strong><h2>Third solution: The Most Compatible One</h2></strong><strong>(requires to have 2 copies of the background, one of which already blurred)</strong>
<ul>
  <li>Create a container</li>
  <li>Apply a background to the container</li>
  <li>Apply the blurry version of the background to the svg element</li>
  <li>Apply the svg-mask to the svg element</li>
</ul>
<h2>Great...but the contrast is low :(</h2>
<h3>Well...let's add a shadow then ;)</h3>
Applying the blur effect alone will result in "text" with a low contrast-ratio which is hard to read. To counter this i applied a shadow to the svg.
And this is how it's done:
<ul>
  <li>Create an svg element in the document</li>
  <li>In the <defs> tag create a filter with the <filter> tag and give it an id</li>
  <li>In the <filter> tag create a <feGaussianBlur> with a stdDeviation of your choise (4 and 5 are good initial numbers)</li>
  <li>Below, but still in the <filter> tag, create a <feComposite> with operator of "out" and the "in2" set to "SourceGraphics"</li>
  <li>To shape our shadow we'll use an <image> tag (close the filter and defs tags before !)</li>
  <li>Set the filter attribute's url of the image to the same id you gave to the <filter> tag</li>
  <li>Set the "xlink:href" attribute's path of the image to the same one of your svg's path</li>
</ul>
 <br>
This is code for reference if you need it:<br>
  < svg ><br>
    < defs ><br>
      < filter id = "trans-shadow" ><br>
      < feGaussianBlur stdDeviation = "5"/ ><br>
      < feComposite operator = "out" in2 = "SourceGraphic" / ><br>
      < / filter ><br>
    < / defs ><br>
    < image filter = "url(#trans-shadow)" x = "0" y = "0" width = "100%" height = "100%" xlink:href = "./SVG.svg" / ><br>
  < / svg ><br>
<br>
<strong>If the text still isn't easy to read</strong> remember that with the Method 2 you can still set an rgba(255,255,255,0.xyz) background-color and that with the all the 3 methods you can add a saturate(xyz%) to the filter/backdrop-filter !<br>
<h3>WE'RE DONE ! Now our backdropped text looks cool and is easy to read !</h3>
<strong><h2>Here you have a live demo: </strong><a href = "https://cristiandavideconte.github.io/applyBackdropFilterBlurToText"/>DEMO</a></h2>
