import React from 'react'
import ColorChartFrame from './ColorChartFrame'

const ColorChart1 = ({colors}) => (
    <ColorChartFrame>
        {
            Object.entries(colors).map(([colorName, colorRGB], i) => <div
                key={i}
                className="box"
                style={{
                    backgroundColor: colorRGB.toHex()
                }}
            />)
        }
    </ColorChartFrame>
);

export default ColorChart1;
