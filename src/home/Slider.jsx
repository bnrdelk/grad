import { useState } from 'react'
import './Slider.css'
function Slider() {
    const sliderStyle = {
        "--width": "150px",
        "--height": "140px",
        "--quantity": 9,
    };

    return (
        <div>
            <div className="slider" style={sliderStyle}>
                <div className="list">
                    {Array.from({ length: 9 }, (_, index) => (
                        <div
                            key={index + 1}
                            className="item cursor-pointer"
                            style={{ "--position": index + 1 }}
                        >
                            <img src={`/grad/slide_${index + 1}.png`} alt={`Slider ${index + 1}`} />
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Slider
