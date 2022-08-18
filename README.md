# apnn-visualization

> library for 3d visualization of associative pulsed neural networks 

[![NPM](https://img.shields.io/npm/v/apnn-visualization.svg)](https://www.npmjs.com/package/apnn-visualization) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save apnn-visualization
```

## Usage

```jsx
import React, { Component } from 'react'

import VisualizationApp from 'apnn-visualization'
import 'apnn-visualization/dist/index.css'

class Example extends Component {
  render() {
    return <VisualizationApp />
  }
}
```
## Optional Attributes

Default values of optional attributes of component
| attribute name             |  default value                                            |
| ----------------- | ------------------------------------------------------------------ |
| connectionAddress |  localhost:8080 |
| bgColor | ![#000E17](https://via.placeholder.com/10/000E17?text=+) #000E17 |
| neuronColor | ![#FFB60A](https://via.placeholder.com/10/FFB60A?text=+) #FFB60A |
| synapsisColor | ![#012C56](https://via.placeholder.com/10/012C56?text=+) #012C56 |
| impulseColor | ![#FF331F](https://via.placeholder.com/10/FF331F?text=+) #FF331F |
| relaxationColor | ![#1798DE](https://via.placeholder.com/10/1798DE?text=+) #1798DE |

## Features

- Light/dark mode toggle
- Live previews
- Cross platform


## License

AGH © [pyszczekk](https://github.com/pyszczekk)
