import React from 'react';

const Background = ({ area }) => {


    const showImage = (imageID) => {
        document.getElementById(imageID).setAttribute("visibility", "visible");
    };
    
    const hideImage = (imageID) => {
        document.getElementById(imageID).setAttribute("visibility", "hidden");
    };
    
    const renderTables = () => {
        switch (area) {
            case 'C':
                // Define SVG shapes for Zone 1
                return (
                <>
                    <rect x="125" y="442" width="170" height="80" fill="slategray" />
                    <circle cx="125" cy="260" r="30" fill="slategray" />
                    <circle cx="220" cy="260" r="30" fill="slategray" />
                    <circle cx="125" cy="355" r="30" fill="slategray" />
                    <circle cx="310" cy="650" r="50" fill="slategray" />
                    <circle cx="125" cy="482" r="40" fill="slategray" />
                    <circle cx="295" cy="482" r="40" fill="slategray" />
                    <circle cx="125" cy="680" r="30" fill="slategray" />
                    <circle cx="220" cy="775" r="30" fill="slategray" />
                    <circle cx="125" cy="775" r="30" fill="slategray" />
                    <rect x="163" y="215" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="85" y="298" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="130" y="472" width="150" height="20" fill="gold" stroke="maroon"/>
                    <rect x="280" y="640" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="300" y="620" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="320" y="640" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="300" y="660" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="85" y="718" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="163" y="800" width="20" height="20" fill="gold" stroke="maroon"/>

                    <polygon points="185,320 220,320 185,355" fill="mediumpurple"
                        onMouseOver={() => showImage('top')} onMouseOut={() => hideImage('top')} />
                    <image id="top" xlinkHref="/c-top.jpg" x="400" y="100" width="600" height="700" visibility="hidden" zIndex="2"/>
                    <polygon points="0,460 30,482 0,504" fill="mediumpurple"
                        onMouseOver={() => showImage('long')} onMouseOut={() => hideImage('long')} />
                    <image id="long" xlinkHref="/c-long.jpg" x="400" y="100" width="600" height="700" visibility="hidden" zIndex="2"/>
                    <polygon points="360,545 360,580 395,580" fill="mediumpurple"
                        onMouseOver={() => showImage('round')} onMouseOut={() => hideImage('round')} />
                    <image id="round" xlinkHref="/c-round.jpg" x="400" y="100" width="600" height="700" visibility="hidden" zIndex="2"/>
                    <polygon points="220,678 190,700 220,722" fill="mediumpurple"
                        onMouseOver={() => showImage('bottom')} onMouseOut={() => hideImage('bottom')} />
                    <image id="bottom" xlinkHref="/c-bottom.jpg" x="400" y="100" width="600" height="700" visibility="hidden" zIndex="2"/>
                </>
                );
            case 'D':
                // Define SVG shapes for Area2
                return (
                <>
                    <rect x="95" y="230" width="100" height="36" fill="slategray" />
                    <rect x="95" y="230" width="36" height="100" fill="slategray" />
                    <rect x="205" y="190" width="280" height="40" fill="slategray" />
                    <rect x="55" y="340" width="40" height="388" fill="slategray" />
                    <rect x="95" y="736" width="36" height="70" fill="slategray" />

                    <rect x="125" y="230" width="10" height="10" fill="gold" stroke="maroon"/>
                    <rect x="165" y="230" width="10" height="10" fill="gold" stroke="maroon"/>
                    <rect x="215" y="190" width="260" height="10" fill="gold" stroke="maroon"/>
                    <rect x="95" y="260" width="10" height="10" fill="gold" stroke="maroon"/>
                    <rect x="95" y="300" width="10" height="10" fill="gold" stroke="maroon"/>
                    <rect x="55" y="350" width="10" height="368" fill="gold" stroke="maroon"/>
                    <rect x="95" y="766" width="10" height="10" fill="gold" stroke="maroon"/>

                    <polygon points="195,278 166,300 195,322, 190,300" fill="mediumpurple"
                        onMouseOver={() => showImage('corner')} onMouseOut={() => hideImage('corner')} />
                    <image id="corner" xlinkHref="/d-corner.jpg" x="300" y="200" width="600" height="700" visibility="hidden" zIndex="2"/>
                    <polygon points="200,278 229,300 200,322 205,300" fill="mediumpurple"
                        onMouseOver={() => showImage('short')} onMouseOut={() => hideImage('short')} />
                    <image id="short" xlinkHref="/d-short.jpg" x="400" y="275" width="600" height="600" visibility="hidden" zIndex="2"/>
                    <polygon points="160,530 182,501 204,530 182,525" fill="mediumpurple"
                        onMouseOver={() => showImage('midup')} onMouseOut={() => hideImage('midup')} />
                    <image id="midup" xlinkHref="/d-midup.jpg" x="400" y="275" width="600" height="600" visibility="hidden" zIndex="2"/>
                    <polygon points="160,535 182,564 204,535 182,540" fill="mediumpurple"
                        onMouseOver={() => showImage('middown')} onMouseOut={() => hideImage('middown')} />
                    <image id="middown" xlinkHref="/d-middown.jpg" x="375" y="275" width="600" height="600" visibility="hidden" zIndex="2"/>
                    <polygon points="160,806 182,775 204,806 182,801" fill="mediumpurple"
                        onMouseOver={() => showImage('bottom')} onMouseOut={() => hideImage('bottom')} />
                    <image id="bottom" xlinkHref="/d-bottom.jpg" x="400" y="275" width="600" height="600" visibility="hidden" zIndex="2"/>
                </>
                );
            case 'E':
                // Define SVG shapes for Area2
                return (
                <>
                    <rect x="125" y="442" width="170" height="80" fill="slategray" />
                    <circle cx="125" cy="260" r="30" fill="slategray" />
                    <circle cx="220" cy="260" r="30" fill="slategray" />
                    <circle cx="125" cy="355" r="30" fill="slategray" />
                    <circle cx="310" cy="650" r="50" fill="slategray" />
                    <circle cx="125" cy="482" r="40" fill="slategray" />
                    <circle cx="295" cy="482" r="40" fill="slategray" />
                    <circle cx="125" cy="680" r="30" fill="slategray" />
                    <circle cx="220" cy="775" r="30" fill="slategray" />
                    <circle cx="125" cy="775" r="30" fill="slategray" />
                    <rect x="163" y="215" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="85" y="298" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="130" y="472" width="150" height="20" fill="gold" stroke="maroon"/>
                    <rect x="280" y="640" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="300" y="620" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="320" y="640" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="300" y="660" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="85" y="718" width="20" height="20" fill="gold" stroke="maroon"/>
                    <rect x="163" y="800" width="20" height="20" fill="gold" stroke="maroon"/>

                    <polygon points="185,320 220,320 185,355" fill="mediumpurple"
                        onMouseOver={() => showImage('top')} onMouseOut={() => hideImage('top')} />
                    <image id="top" xlinkHref="/c-top.jpg" x="400" y="100" width="600" height="700" visibility="hidden" zIndex="2"/>
                    <polygon points="0,460 30,482 0,504" fill="mediumpurple"
                        onMouseOver={() => showImage('long')} onMouseOut={() => hideImage('long')} />
                    <image id="long" xlinkHref="/c-long.jpg" x="400" y="100" width="600" height="700" visibility="hidden" zIndex="2"/>
                    <polygon points="360,545 360,580 395,580" fill="mediumpurple"
                        onMouseOver={() => showImage('round')} onMouseOut={() => hideImage('round')} />
                    <image id="round" xlinkHref="/c-round.jpg" x="400" y="100" width="600" height="700" visibility="hidden" zIndex="2"/>
                    <polygon points="220,678 190,700 220,722" fill="mediumpurple"
                        onMouseOver={() => showImage('bottom')} onMouseOut={() => hideImage('bottom')} />
                    <image id="bottom" xlinkHref="/c-bottom.jpg" x="400" y="100" width="600" height="700" visibility="hidden" zIndex="2"/>
                </>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ position: 'relative', backgroundColor: 'transparent',  overflow: 'visible' }}>
            <svg viewBox="0 0 1000 1000" style={{ position: 'absolute', top: 0, left: 0, zIndex: -1}}>

                {/* Legend for colors */}
                <rect x="490" y="470" width="300" height="270" fill="lavender" stroke="black" />
                <text x="520" y="520" font-family="Arial" font-size="40" fill="black">Legend:</text>
                <rect x="520" y="540" width="20" height="20" fill="lime" />
                <text x="550" y="558" font-family="Arial" font-size="25" fill="black">Available Seat</text>
                <rect x="520" y="570" width="20" height="20" fill="red" />
                <text x="550" y="588" font-family="Arial" font-size="25" fill="black">Unavailable Seat</text>
                <rect x="520" y="600" width="20" height="20" fill="royalblue" />
                <text x="550" y="618" font-family="Arial" font-size="25" fill="black">Selected Seat</text>
                <rect x="520" y="630" width="20" height="20" fill="slategray" />
                <text x="550" y="648" font-family="Arial" font-size="25" fill="black">Table</text>
                <rect x="520" y="660" width="20" height="20" fill="gold" stroke="maroon" />
                <text x="550" y="678" font-family="Arial" font-size="25" fill="black">Electical Outlet</text>
                <rect x="520" y="690" width="20" height="20" fill="mediumpurple" />
                <text x="550" y="708" font-family="Arial" font-size="25" fill="black">Hover to View</text>
                
                {renderTables()}
            </svg>
        </div>
    );
};

export default Background;
