const basePath = "./src/components";

function load(component, only = []) {
  const componentFilename = `${basePath}/${component}/${component}`;

  if (only.length === 0 || only.includes("html")) {
    fetch(`${componentFilename}.html`)
      .then((response) => response.text())
      .then((data) => {
        document.body.innerHTML += data;

        addScriptAndStyle(componentFilename, only);
      });
  } else {
    addScriptAndStyle(componentFilename, only);
  }
}

function addScriptAndStyle(componentFilename, only) {
  if (only.length === 0 || only.includes("js")) {
    const script = document.createElement("script");
    script.src = `${componentFilename}.js`;
    script.type = "module";
    document.body.appendChild(script);
  }

  if (only.length === 0 || only.includes("css")) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${componentFilename}.css`;
    document.head.appendChild(link);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  load("algorithm-card", ["css"]);
  load("algorithm-list");
  load("sorting-visualizer");
});
