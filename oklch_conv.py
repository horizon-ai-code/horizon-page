import math

def srgb_to_linear(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else math.pow((c + 0.055) / 1.055, 2.4)

def hex_to_oklch(hex_str):
    hex_str = hex_str.lstrip('#')
    r, g, b = tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))
    
    r_l = srgb_to_linear(r)
    g_l = srgb_to_linear(g)
    b_l = srgb_to_linear(b)
    
    # sRGB to LMS
    l = 0.4122214708 * r_l + 0.5363325363 * g_l + 0.0514459929 * b_l
    m = 0.2119034982 * r_l + 0.6806995451 * g_l + 0.1073969566 * b_l
    s = 0.0883024619 * r_l + 0.2817188376 * g_l + 0.6299787005 * b_l
    
    # non-linear LMS
    l_ = math.pow(l, 1/3) if l >= 0 else -math.pow(-l, 1/3)
    m_ = math.pow(m, 1/3) if m >= 0 else -math.pow(-m, 1/3)
    s_ = math.pow(s, 1/3) if s >= 0 else -math.pow(-s, 1/3)
    
    # LMS to OKLab
    L = 0.2104542553*l_ + 0.7936177850*m_ - 0.0040720468*s_
    a = 1.9779984951*l_ - 2.4285922050*m_ + 0.4505937099*s_
    b_ok = 0.0259040371*l_ + 0.7827717662*m_ - 0.8086757660*s_
    
    # OKLab to OKLCH
    C = math.hypot(a, b_ok)
    h = math.atan2(b_ok, a) * 180.0 / math.pi
    if h < 0: h += 360.0
    
    return f"oklch({L:.3f} {C:.3f} {h:.2f})"

colors = {
    'background': '#1e1f22',
    'foreground': '#dfe1e5',
    'accent': '#548af7',
    'card': '#2b2d30',
    'border': '#393b40',
    'muted-foreground': '#6f737a',
    'destructive': '#f93e3e',
    'success': '#61c554',
    'warning': '#f4bf4f'
}

for name, hex_val in colors.items():
    print(f"{name}: {hex_val} -> {hex_to_oklch(hex_val)}")
