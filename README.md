<h1>Is there a way to apply backdrop-filter:blur() to a text element?</h1>
<h1>YES!</h1><br>
As far as i know there's <strong>no way to directly apply the backdrop-filter:blur to a text</strong> element. But we can work on it.<br> 
I have two possible solutions: <br>
<strong>First solution:</strong><br>
<ul>
  <li>Create a container</li>
  <li>Apply a background to it (or to its ::before pseudo-element)</li>
  <li>Use the filter:blur so that the container's background is blurred</li>
  <li>Apply a svg mask onto the svg element and then apply the same background to the container (or to its ::before pseudo-element)</li>
</ul>
This way we have the blurried background on top that gets masked and the non-blurry version under it.<br><br>
<strong>NOTE:</strong> applying the background to the container's ::before pseudo element will allow you to modify the background  without touching the svg mask (usefull if you need to flip the background to create more contrast but you can't modify the original image).<br><br>
<strong>Second solution:</strong><br>
<ul>
  <li>Create a container</li>
  <li>Apply a background to the container</li>
  <li>Apply the backdrop-filter:blur to the svg element</li>
  <li>Apply the svg-mask to the svg element</li>
</ul>
This way we have the effect we would have if the backdrop-filter: blur could be applied to text.<br><br>

<strong>Third solution:</strong><br>
<strong>(requires to have 2 copies of the background, one of which already blurred)</strong>
<ul>
  <li>Create a container</li>
  <li>Apply a background to the container</li>
  <li>Apply the blurry version of the background to the svg element</li>
  <li>Apply the svg-mask to the svg element</li>
</ul>
This is the fastest method of all because no blur is done in real-time but is the one with more limitations !<br>
<strong>Here you have a live demo: </strong><a>https://cristiandavideconte.github.io/applyBackdropFilterBlurToText/</a>
