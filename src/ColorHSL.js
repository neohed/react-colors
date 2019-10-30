import ColorRGB from "./ColorRGB";

class ColorHSL {
    constructor(hue, saturation, lightness) {
        this.h = hue;
        this.s = saturation;
        this.l = lightness;
    }

    toRGB = () => {
        function h2Rgb(v1, v2, vH) {
            if (vH < 0) {
                vH += 1
            }

            if (vH > 1) {
                vH -= 1
            }

            if (6 * vH < 1) {
                return (v1 + (v2 - v1) * 6 * vH)
            }

            if (2 * vH < 1) {
                return v2
            }

            if (3 * vH < 2) {
                return (v1 + (v2 - v1) * (2 / 3 - vH) * 6)
            }

            return v1;
        }

        const {h, s, l} = this;
        let red, green, blue;

        if (this.s === 0) {
            red = l * 255;
            green = l * 255;
            blue = l * 255;
        } else {
            let var_1, var_2;

            if (l < .5) {
                var_2 = l * (1 + s)
            } else {
                var_2 = l + s - s * l
            }

            var_1 = 2 * l - var_2;

            red = 255 * h2Rgb(var_1, var_2, h + 1 / 3);
            green = 255 * h2Rgb(var_1, var_2, h);
            blue = 255 * h2Rgb(var_1, var_2, h - 1 / 3);
        }

        return new ColorRGB(Math.round(red), Math.round(green), Math.round(blue));
    };

    harmony = (n) => [
        new ColorHSL((this.h - n + 360) % 360, this.s, this.l),
        new ColorHSL(this.h, this.s, this.l),
        new ColorHSL((this.h + n) % 360, this.s, this.l)
    ];

    toAnalogous = () => this.harmony(30);

    toTriadic = () => this.harmony(120);

    toSplitComplements = () => this.harmony(150);

    toComplement = () => new ColorHSL((this.h + 180) % 360, this.s, this.l);

    interpolate = (endColour, steps) => {
        const {h, s, l} = this;
        const startColour = new ColorHSL(h, s, l),
            colours = [startColour],
            step = (endColour.l - startColour.l) / steps;

        for (let i = 1; i < steps; ++i) {
            colours.push(new ColorHSL(
                h,
                s,
                l + i * step)
            );
        }

        colours.push(endColour);

        return colours;
    }
}

export default ColorHSL;
