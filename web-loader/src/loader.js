const REACT_BASE_APP = 'http://localhost:90/';
const ASSET_MANIFEST_FILE = 'asset-manifest.json';

const isStylesheet = (file) => file.includes('.css');
const isJavaScript = (file) => file.includes('.js');

const createJavaScript = (file) => {
  const script = document.createElement('script');
  script.src = file;
  script.defer = 'defer';

  document.head.appendChild(script);
}

const createStylesheet = (file) => {
  const link = document.createElement('link');
  link.src = file;
  link.rel = 'stylesheet';

  document.head.appendChild(link);
}

const loadMicroFrontend = ({ entrypoints }) => {
  [...entrypoints].forEach(file => {
    if (isJavaScript(file)) {
      return createJavaScript(file);
    }

    if (isStylesheet(file)) {
      return createStylesheet(file);
    }
  });
}

function main() {
  fetch(`${REACT_BASE_APP}${ASSET_MANIFEST_FILE}`, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => response.json())
    .then(loadMicroFrontend)
    .catch(console.error);
}

main();