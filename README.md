# use-save-svg

`useSaveSVG()` is a _React use hook_ that returns a `React.RefObject<SVGSVGElement>` which you can hook up to an SVG tag. It adds a keypress event listener to the window, and when the user presses `ctrl + shift + S` the hook will convert the SVG image to a PNG image and open a Save File Dialog, optionally using the `id` attribute of the SVG tag as the suggested filename.

## Usage

```
import useSaveSVG from '@dopplerreflect/use-save-svg';

const MyReactSVGImage = () => {
  const svgRef = useSaveSVG();
  const filename = "whatever";
  return (
    <svg ref={svgRef} id={filename} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <...>
    </svg>
  )
}
```

## Installation

Create or edit `~/.npmrc` and add:

```
@dopplerreflect:registry=https://npm.pkg.github.com
```

Then run `npm -i @dopplerreflect/use-save-svg` or `yarn add @dopplerreflect/use-save-svg`
