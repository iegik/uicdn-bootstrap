# uicdn-bootstrap
Collection of React/Bootstrap components

## Usage

```
npx uicdn add button --registry https://github.com/iegik/uicdn-bootstrap.git --componentPath "./src/components"
```

```
import { Button } from "./src/components/ui/button"
```

## Use as library

1. Install as dependency

```
npm i "iegik/uicdn-bootstrap"
```

2. Copy js modules into your public directory:

```
"postinstall": "cp -R ./node_modules/uicdn-bootstrap/dist/libs/ ./public/libs/",
```

3. Include into HTML:

```html
<script type="importmap">
  {
    "imports": {
      "scheduler": "libs/scheduler.mjs",
      "react": "libs/react.mjs",
      "react-dom": "libs/react-dom.mjs",
      "react-dom/client": "libs/react-dom-client.mjs",
      "hydrate": "components/hydrate.mjs",
      ...
      "button": "components/ui/button.mjs",
      ...
    }
  }
</script>
<script>window.process = { env: { NODE_ENV:"production" } };</script>
...
<div id="xyz"><button class="btn">Press me</button></div>
<script type="module">
  import { hydrate } from "hydrate";
  import { Button } from "button";
  hydrate(document.getElementById("xyz"), Button, { title: 'Press me' });
</script>
```

