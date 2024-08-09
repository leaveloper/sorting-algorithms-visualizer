const basePath = "./src/components";
const main = document.querySelector("main");

async function load(component, only = []) {
  const componentFilename = `${basePath}/${component}/${component}`;

  if (only.length === 0 || only.includes("html")) {
    await fetch(`${componentFilename}.html`)
      .then((response) => response.text())
      .then((data) => {
        main.innerHTML += data;

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

document.addEventListener("DOMContentLoaded", async function () {
  await load("algorithm-card", ["css"]);
  await load("algorithm-list");
  await load("sorting-visualizer");
});
