As far as i know there's **no way to directly apply the backdrop-filter:blur to a text** element.<br></br>What we can do is: <br></br><br></br>
<strong>First solution:</strong><br>
<ul>
<li>Create a container with a child</li>
<li>Apply a background to it (or to its ::before pseudoelement)</li>
<li>Use the filter:blur so that the container's background is blurred</li>
<li>Apply a svg mask onto the container's child and then apply the same background to the container's parent element</li>
</ul>
This way we have the blurried background on top that gets masked and the non-blurry version under it.<br><br>
<strong>NOTE:</strong> applying the background to the container's ::before pseudo element will allow you to modify the background  without touching the svg mask (usefull if you need to flip the background to create more contrast but you can't modify the original image).<br><br>
<strong>Second solution:</strong><br>
<ul>
<li>Create a container</li><br>
<li>Apply a background to the container's parent element</li><br>
<li>Apply the backdrop-filter:blur to the container's child</li><br>
<li>Apply the svg-mask to the container's child</li><br><br>
This way we have the effect we would have if the backdrop-filter: blur could be applied to text.<br><br>
