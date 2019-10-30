import React from 'react'
import ColorChartFrame from './ColorChartFrame'

const ColorChart1 = ({colors}) => (
    <ColorChartFrame>
        {
            Object.entries(colors).map(([colorName, colorRGB], i) => {
                const backgroundColor = colorRGB.toHex();
                const textColor = colorRGB.toHSL().toComplement().toRGB().toHex();

                return <div
                    key={i}
                    className="box"
                    style={{
                        color: textColor,
                        backgroundColor
                    }}
                >
                    {colorName} {backgroundColor}
                </div>
            })
        }
    </ColorChartFrame>
);

export default ColorChart1;
