// font&font family lists
const fontFamilies = {
  serif: [
    "Playfair+Display:ital,wght@0,400..900;1,400..900", //"Playfair Display", serif;
    "Noto+Serif:ital,wght@0,100..900;1,100..900",
    "EB+Garamond:ital,wght@0,400..800;1,400..800",
    "Cormorant+Infant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700",
  ],
  sansSerif: [
    "Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900", //"Roboto", sans-serif;
    "Open+Sans:ital,wght@0,300..800;1,300..800", //"Open Sans", sans-serif;
    "Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900", //"Lato", sans-serif;
    "Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
    "Montserrat:ital,wght@0,100..900;1,100..900",
    "Ysabeau+Infant:ital,wght@0,1..1000;1,1..1000",
  ],
  cursive: [
    "Pacifico",
    "Dancing+Script:wght@400..700",
    "Nothing+You+Could+Do",
    "Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700",
  ],
  monospace: [
    "Oxygen+Mono", //"Oxygen Mono", monospace;
    "Courier+Prime:ital,wght@0,400;0,700;1,400;1,700",
    "Inconsolata:wght@200..900",
  ],
};

function loadAllFonts() {
  for (const family in fontFamilies) {
    fontFamilies[family].forEach((font) => {
      var link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?family=${font.replace(
        / /g,
        "+"
      )}&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    });
  }
}

//Load Fonts
loadAllFonts();

// Store last selected font
var lastSelectedFonts = {
  h1: null,
  h2: null,
  content: null,
};

function changeFontFamily(divId) {
  // Randomly Pick a Font-Family
  var randomFamilyIndex = Math.floor(
    Math.random() * Object.keys(fontFamilies).length
  );
  var randomFamily = Object.keys(fontFamilies)[randomFamilyIndex];

  // Randomly Pick a font-style form the above font-family
  var randomFontIndex;
  do {
    randomFontIndex = Math.floor(
      Math.random() * fontFamilies[randomFamily].length
    );
  } while (
    fontFamilies[randomFamily][randomFontIndex] === lastSelectedFonts[divId]
  ); // if last selected font is equal to random picked font, then reselect
  var randomFont = fontFamilies[randomFamily][randomFontIndex];

  // update last selected font
  lastSelectedFonts[divId] = randomFont;

  var mytxt = document.querySelectorAll(`[id=${divId}]`);
  console.log(mytxt);

  if (mytxt) {
    var fontParts = randomFont.split(":");
    var fontName = fontParts[0].replace(/\+/g, " ");
    var fontFamily = randomFamily;
    if (randomFamily === "sansSerif") fontFamily = "sans-serif";

    console.log(fontName);
    console.log(fontFamily);
    mytxt.forEach((txt) => {
      txt.style.fontFamily = `${fontName}, ${fontFamily}`;
    });
  }
}

function fontChange() {
  const modal = document.getElementById("fontModal");
  const btn = document.getElementById("select-font-size");
  const spans = document.getElementById("fontModalClose");

  const headingSlider = document.getElementById("heading-slider");
  const headingInput = document.getElementById("heading-size-input");
  const subheadingSlider = document.getElementById("subheading-slider");
  const subheadingInput = document.getElementById("subheading-size-input");
  const paragraphSlider = document.getElementById("paragraph-slider");
  const paragraphInput = document.getElementById("paragraph-size-input");

  // Sync slider and input and update font size
  function syncSliderInput(slider, input, classList) {
    updateFontSize(classList, slider.value);
    updateFontSize(classList, input.value);
    slider.oninput = () => {
      input.value = slider.value;
      updateFontSize(classList, slider.value);
    };
    input.oninput = () => {
      slider.value = input.value;
      updateFontSize(classList, input.value);
    };
  }

  syncSliderInput(headingSlider, headingInput, ".heading");
  syncSliderInput(subheadingSlider, subheadingInput, ".subheading");
  syncSliderInput(paragraphSlider, paragraphInput, ".paragraph");

  btn.onclick = () => {
    modal.style.display = "block";
  };
  spans.onclick = () => {
    modal.style.display = "none";
  };
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  function updateFontSize(classSelector, size) {
    document.querySelectorAll(classSelector).forEach((element) => {
      element.style.fontSize = `${size / 10}em`;
      autoAdjust(element);
    });
  }

  function autoAdjust(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + 2 + "px";
  }

  // Initial adjust for textareas
  document.querySelectorAll(".dynamic-textarea").forEach((textarea) => {
    textarea.addEventListener("input", () => {
      autoAdjust(textarea);
    });
    autoAdjust(textarea);
  });
}

// write a function similar to fontChange() to change font color
function colorChange() {
  const modal = document.getElementById("colorModal");
  const btn = document.getElementById("selectColor");
  const spans = document.getElementById("colorModalClose");

  const headingColor = document.getElementById("heading-color-input");
  const subheadingColor = document.getElementById("subheading-color-input");
  const paragraphColor = document.getElementById("paragraph-color-input");

  btn.onclick = () => {
    modal.style.display = "block";
  };
  spans.onclick = () => {
    modal.style.display = "none";
  };
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  function updateFontColor(classSelector, color) {
    document.querySelectorAll(classSelector).forEach((element) => {
      element.style.color = color;
    });
  }

  function syncColorInput(input, classSelector) {
    updateFontColor(classSelector, input.value);
    input.oninput = () => {
      updateFontColor(classSelector, input.value);
    };
  }

  syncColorInput(headingColor, ".heading");
  syncColorInput(subheadingColor, ".subheading");
  syncColorInput(paragraphColor, ".paragraph");

  headingColor.oninput = () => {
    updateFontColor(".heading", headingColor.value);
  };
  subheadingColor.oninput = () => {
    updateFontColor(".subheading", subheadingColor.value);
  };
  paragraphColor.oninput = () => {
    updateFontColor(".paragraph", paragraphColor.value);
  };
}

document
  .getElementById("select-font-size")
  .addEventListener("click", fontChange());
document.getElementById("selectColor").addEventListener("click", colorChange());

// document.addEventListener("DOMContentLoaded", fontChange());
// document.addEventListener("DOMContentLoaded", colorChange());
