import ColorHSL from './ColorHSL'

class ColorRGB {
    constructor(red, green, blue, opacity) {
        this.r = ~~red;
        this.g = ~~green;
        this.b = ~~blue;
        this.a = opacity || 1  // Alpha channel or Opacity.
    }

    blend = (ratio) => new ColorRGB(
        this.r * ratio,
        this.g * ratio,
        this.b * ratio,
        this.a);

    interpolate = (endColour, steps) => { // Call with steps = 2 to get an array of 3 colours returned where arr[1] is the blended colour.
        const {r, g, b} = this;
        const colours = [new ColorRGB(r, g, b)],
            rStep = (endColour.r - r) / steps,
            gStep = (endColour.g - g) / steps,
            bStep = (endColour.b - b) / steps;

        for (let i = 1; i < steps; ++i) {
            colours.push(new ColorRGB(
                r + i * rStep,
                g + i * gStep,
                b + i * bStep)
            );
        }

        colours.push(endColour);

        return colours
    };

    toHex = () => '#' + ('00000' + (this.b | (this.g << 8) | (this.r << 16)).toString(16)).slice(-6);

    toHSL = () => {
        const fractionR = this.r / 255,
            fractionG = this.g / 255,
            fractionB = this.b / 255,
            minRGB = Math.min(fractionR, fractionG, fractionB),
            maxRGB = Math.max(fractionR, fractionG, fractionB),
            deltaRGB = maxRGB - minRGB,
            L = (maxRGB + minRGB) / 2;

        let H, S;

        if (deltaRGB === 0) { //This is a gray, no chroma...
            H = S = 0;
        } else { //Chromatic data...
            if (L < .5) {
                S = deltaRGB / (maxRGB + minRGB)
            } else {
                S = deltaRGB / (2 - maxRGB - minRGB)
            }

            const deltaR = ((maxRGB - fractionR) / 6 + deltaRGB / 2) / deltaRGB,
                deltaG = ((maxRGB - fractionG) / 6 + deltaRGB / 2) / deltaRGB,
                deltaB = ((maxRGB - fractionB) / 6 + deltaRGB / 2) / deltaRGB;

            if (fractionR === maxRGB) {
                H = deltaB - deltaG;
            } else if (fractionG === maxRGB) {
                H = 1 / 3 + deltaR - deltaB;
            } else if (fractionB === maxRGB) {
                H = 2 / 3 + deltaG - deltaR;
            }

            if (H < 0) {
                H += 1
            }
            if (H > 1) {
                H -= 1
            }
        }

        return new ColorHSL(H, S, L)
    };

    static isHex = (color) => color.substr(0, 1) === '#';

    static fromString = (cssColor) => {
        if (ColorRGB.isHex(cssColor)) {
            return new ColorRGB(
                parseInt(cssColor.substring(1, 3), 16),
                parseInt(cssColor.substring(3, 5), 16),
                parseInt(cssColor.substring(5, 7), 16)
            )
        } else {
            const digits = /(.*?)rgba?\((\d+), (\d+), (\d+)(, ([^)]+))?\)/.exec(cssColor);

            return new ColorRGB(
                +digits[2], // Use plus operator to perform a base 10 parseInt.
                +digits[3],
                +digits[4],
                +(digits[6] || 1)
            )
        }
    }
}

export default ColorRGB;
