# simple-annotate-zsj

A very simple npm react component library that allows people to annotate an image with lines.

A typical usage of this component is to allow doctors to measure hence compare the size of different components of scan images (shown as below).

![X-Ray scan annotation](https://github.com/ShangjieZhou/simple-annotate-zsj/assets/152136763/bdc9ef37-cec4-4c33-99a9-b86390c1beac)



## Features

- Line annotation with **number of pixels** as unit
- Zooming, Scaling, Panning

## How to Interact

- To add a line, click on the **plus** icon at the top
- To remove the most recent added line, click on the **minus** icon at the top
- To move the floating buttons to the other side of the image in case they get in the way, click on **right arrow** or **left arrow** icon at the top

## Example

First install the react component using NPM:

`npm install react-image-annotate`

Then simple replace your `src/App.js` with the following:

```javascript
import { Annotator } from "simple-annotate-zsj";

function App() {
  return (
    <div className="App">
      <Annotator
        themeColor={"#31ebe8"}
        contrastColor={"navy"}
        maxZoomInFactor={15}
        lineWidth={3}
        dotSize={4}
        componentWidth="100vw"
        componentHeight="100vh"
        imgSrc="https://t3.ftcdn.net/jpg/03/23/39/00/360_F_323390028_qAoFjhZKcjFk2qL56nLObetE6sSbtmMa.jpg"
      />
    </div>
  );
}

export default App;

```

## Props

All of the following properties can be defined on the Annotator...

| Prop                     | Type                            | Description                                                                             | Default       |
| ------------------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------- |
| `maxZoomInFactor`        | `number`                                         | Maximum number of times the image can be zoomed in.                                     | `5`           |
| `themeColor`             | `string`                                         | Color of the floating buttons and SVGs.                                                 | `#ff2da4`     |
| `contrastColor`          | `string`                                         | Color of the text next to each annotation line                                          | `#a60050`     |
| `componentWidth`         | `string`                                         | Width of this React component                                                           | `"400px"`     |
| `componentHeight`        | `string`                                         | Allowed tags for entire image.                                                          | `"400px"`     |
| `dotSize`                | `number`                                         | Radius of the dots on both ends of an annotation line                                   | `8`           |
| `lineWidth`              | `number`                                         | Stroke width of the annotation lines                                                    | `3`           |
| `fontSize`               | `string`                                         | Font size of the text next to each annotation line                                      | `"0.8rem"`    |
| `imgSrc`                 | `string`                                         | src of the background image                                                             | `""`    |

