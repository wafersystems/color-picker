export const rgbToHsl = ({r, g, b}) => {
	r = bound01(r, 255);
	g = bound01(g, 255);
	b = bound01(b, 255);

	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	}
	else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
			default:
		}

		h /= 6;
	}
	return {h: h * 360, s, l};
};

export const hslToRgb = ({h, s, l}) => {
	let r, g, b;

	h = bound01(h, 360);
	s = bound01(convertToPercentage(s), 100);
	l = bound01(convertToPercentage(l), 100);

	if (s === 0) {
		r = g = b = l; // achromatic
	}
	else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
};

const convertToPercentage = (n) => {
	if (n <= 1) {
		n = (n * 100) + "%";
	}
	return n;
};

const hue2rgb = (p, q, t) => {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
};

const bound01 = (n, max) => {
	if (typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1) {
		n = '100%';
	}

	const processPercent = typeof n === 'string' && n.indexOf('%') !== -1;
	n = Math.min(max, Math.max(0, parseFloat(n)));

	// Automatically convert percentage into number
	if (processPercent) {
		n = parseInt(n * max, 10) / 100;
	}

	// Handle floating point rounding errors
	if ((Math.abs(n - max) < 0.000001)) {
		return 1;
	}

	// Convert into [0, 1] range if it isn't already
	return (n % max) / parseFloat(max);
};

export const colorPicker = (rgb) => {
	return '#' + (rgb.r < 16 ? '0' : '') + rgb.r.toString(16) +
		(rgb.g < 16 ? '0' : '') + rgb.g.toString(16) +
		(rgb.b < 16 ? '0' : '') + rgb.b.toString(16);
};

export const getPointer = (radius, x, y, rotate) => {
	const R = Math.sqrt((radius - x) * (radius - x) + (radius - y) * (radius - y));
	const cx = (radius - x) * radius / R;
	const cy = (radius - y) * radius / R;
	let a = Math.asin((radius - y) / R) * 180 / Math.PI;
	if (isNaN(a)) a = rotate;
	a = 90 - a;
	a = (x - radius) < 0 ? 360 - a : a;
	return {cx, cy, a};
};
