'use client'
let width = window.width;
export let device;
switch (width) {
    case width>=1000:
        
        device = "desktop"
        break;

    case width< 1000 && width >= 700:
        device = "tablet"
        break;
    case width<700:
        device = "mobile";
        break;
}