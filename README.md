# Color-Ring
    The ring for color picker by svg
# Available Props
|Prop|Default|Type|Description|
|-----|------|-----|-----|
|onChange| `null` | function | return html color, eg: #FF0000|
|arrow   | `<polygon points="25 50 0 0 50 0 25 50"/>`| Object | svg element|
|offset  | `0`| number | arrow's offset|
|radius  | `180`| number | circle's radius|
|image  | `require('./ring.png')`| Object | circle's background image|
|className  | `''`| string | ring component class name|
|changeBackground  | `false`| boolean | background color is changed by onChange event or not.|
|adjustAngle  | `6`| number | correction arrow angle|
|scale  | `1`| number | arrow's scale|

# Available Methods
|Method|Props|Return|Description|
|-----|------|-----|-----|
|hslToRgb|`{h, s, l}`|`{r, g, b}`|convert hst to rgb|
|rgbToHsl|`{r, g, b}`|`{h, s, l}`|convert rgb to hsl|
|colorPicker|`rgb: {r, g, b}`|`#000000`|get html color by rgb|

# License
    MIT License
# color-picker