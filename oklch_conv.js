const fs = require('fs');

function srgb_to_linear(c) {
    c = c / 255.0;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function hex_to_oklch(hex_str) {
    hex_str = hex_str.replace('#', '');
    let r = parseInt(hex_str.substring(0, 2), 16);
    let g = parseInt(hex_str.substring(2, 4), 16);
    let b = parseInt(hex_str.substring(4, 6), 16);
    
    let r_l = srgb_to_linear(r);
    let g_l = srgb_to_linear(g);
    let b_l = srgb_to_linear(b);
    
    // sRGB to LMS
    let l = 0.4122214708 * r_l + 0.5363325363 * g_l + 0.0514459929 * b_l;
    let m = 0.2119034982 * r_l + 0.6806995451 * g_l + 0.1073969566 * b_l;
    let s = 0.0883024619 * r_l + 0.2817188376 * g_l + 0.6299787005 * b_l;
    
    let cbrt = (x) => x >= 0 ? Math.pow(x, 1/3) : -Math.pow(-x, 1/3);
    
    let l_ = cbrt(l);
    let m_ = cbrt(m);
    let s_ = cbrt(s);
    
    let L = 0.2104542553*l_ + 0.7936177850*m_ - 0.0040720468*s_;
    let a = 1.9779984951*l_ - 2.4285922050*m_ + 0.4505937099*s_;
    let b_ok = 0.0259040371*l_ + 0.7827717662*m_ - 0.8086757660*s_;
    
    let C = Math.hypot(a, b_ok);
    let h = Math.atan2(b_ok, a) * 180.0 / Math.PI;
    if (h < 0) h += 360.0;
    
    return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${h.toFixed(2)})`;
}

const colors = {
    'background': '#1e1f22',
    'foreground': '#dfe1e5',
    'accent': '#548af7',
    'card': '#2b2d30',
    'border': '#393b40',
    'muted-foreground': '#6f737a',
    'destructive': '#f93e3e',
    'success': '#61c554',
    'warning': '#f4bf4f'
};

for (const [name, hex] of Object.entries(colors)) {
    console.log(`${name}: ${hex} -> ${hex_to_oklch(hex)}`);
}
