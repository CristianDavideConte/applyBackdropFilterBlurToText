function init() {
  document.getElementById("method1").addEventListener("click", () => _changeMethod("method1"),{passive:true});
  document.getElementById("method2").addEventListener("click", () => _changeMethod("method2"),{passive:true});
  document.getElementById("method3").addEventListener("click", () => _changeMethod("method3"),{passive:true});

  document.getElementById("hideButtonSectionLeft").addEventListener("click", () => document.getElementById("buttonSectionLeft").classList.toggle("hidden"),{passive:true});
  document.getElementById("hideButtonSectionRight").addEventListener("click", () => document.getElementById("buttonSectionRight").classList.toggle("hidden"),{passive:true});
  document.getElementById("disableShadows").addEventListener("click", () => {
    let name = 	document.getElementById("svgShadow").className.baseVal;
    document.getElementById("svgShadow").className.baseVal = (name == "enabled") ? "disabled" : "enabled";
    document.getElementById("disableShadows").innerHTML = (name == "enabled") ? "Shadows Disabled" : "Shadows Enabled";
    document.getElementById("disableShadows").innerHTML += "<span class='tooltiptext'>Toggle SVG Shadow</span>";
    document.getElementById("disableShadows").style.borderColor = (name == "enabled") ? "rgba(200, 30, 30, 1)" : "rgba(0, 200, 30, 1)";
  },{passive:true});

  document.getElementById("changeBackground").addEventListener("click", () => document.getElementById("changeBackgroundInputField").click(), {passive:true});
  document.getElementById("changeBackgroundInputField").addEventListener("change", event => {
     // getting a hold of the file reference
     let file = event.target.files[0];
     let fileName = event.target.value;

     try {
       //Validation
       var idxDot = fileName.lastIndexOf(".") + 1;
       var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
       if (extFile !== "jpg" && extFile !== "jpeg" && extFile !== "png") {
         throw "No valid image was selected !";
       }

       // setting up the reader
       let reader = new FileReader();
       reader.readAsDataURL(file);

       // here we tell the reader what to do when it's done reading...
       reader.addEventListener("load", readerEvent => {
          let content = readerEvent.target.result; // this is the content!
          document.documentElement.style.setProperty("--backgroundUrl", "url(" + content + ")");
          document.getElementById("method3").disabled = true;
          document.getElementById("method2").click();
       }, {passive:true});
     } catch (exception) {
       alert(exception);
     }
  }, {passive:true});

  let path = getComputedStyle(document.body).getPropertyValue("--svgPath").trim();
  document.getElementById("svgShadowImage").setAttribute("href", path);
}

function _changeMethod(className) {
  let _svgElement = document.getElementById("svg");
  window.requestAnimationFrame(() => {
    _svgElement.className = className;
    document.body.className = className;
    /*
     * The next 2 istructions allows the mask to properly adjust to the changes
     */
    _svgElement.classList.add("reset");
    window.requestAnimationFrame(() => _svgElement.classList.remove("reset"));

    let buttons = document.getElementsByTagName("button");
    for(const button of buttons)
      if(button.id != "disableShadows" && button.id != "changeBackground" && !button.classList.contains("hideButtonSection"))
        button.style.borderColor = (button.id == className) ? "rgba(0, 200, 30, 1)" : "rgba(200, 30, 30, 1)";
  });
}

/*
 * Performs a scrolling test
 */
let _testTimes = 0;
function testSmoothness() {
  if(_testTimes < 50) {
    let _scrollAmmount = (_testTimes % 2 == 0) ? window.scrollY + window.innerHeight : window.scrollY - window.innerHeight;
    window.scroll(0, _scrollAmmount);
    _testTimes++;
    setTimeout(testSmoothness, 800);
  }
}
