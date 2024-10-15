function linear(t) {
    return t;
}

// Ease In (Quadratic)
function easeInQuad(t) {
    return t * t;
}

// Ease Out (Quadratic)
function easeOutQuad(t) {
    return t * (2 - t);
}

// Ease In Out (Quadratic)
function easeInOutQuad(t) {
    t *= 2;
    if (t < 1) return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
}

// Ease In (Cubic)
function easeInCubic(t) {
    return t * t * t;
}

// Ease Out (Cubic)
function easeOutCubic(t) {
    t--;
    return t * t * t + 1;
}

// Ease In Out (Cubic)
function easeInOutCubic(t) {
    t *= 2;
    if (t < 1) return 0.5 * t * t * t;
    t -= 2;
    return 0.5 * (t * t * t + 2);
}

// Ease In (Quartic)
function easeInQuart(t) {
    return t * t * t * t;
}

// Ease Out (Quartic)
function easeOutQuart(t) {
    t--;
    return 1 - t * t * t * t;
}

// Ease In Out (Quartic)
function easeInOutQuart(t) {
    t *= 2;
    if (t < 1) return 0.5 * t * t * t * t;
    t -= 2;
    return -0.5 * (t * t * t * t - 2);
}

// Ease In (Sinusoidal)
function easeInSine(t) {
    return 1 - Math.cos(t * Math.PI / 2);
}

// Ease Out (Sinusoidal)
function easeOutSine(t) {
    return Math.sin(t * Math.PI / 2);
}

// Ease In Out (Sinusoidal)
function easeInOutSine(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
}

// Ease In (Exponential)
function easeInExpo(t) {
    return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
}

// Ease Out (Exponential)
function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Ease In Out (Exponential)
function easeInOutExpo(t) {
    if (t === 0) return 0;
    if (t === 1) return 1;
    t *= 2;
    if (t < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
}

// Ease In (Circular)
function easeInCirc(t) {
    return 1 - Math.sqrt(1 - t * t);
}

// Ease Out (Circular)
function easeOutCirc(t) {
    t--;
    return Math.sqrt(1 - t * t);
}

// Ease In Out (Circular)
function easeInOutCirc(t) {
    t *= 2;
    if (t < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
    t -= 2;
    return 0.5 * (Math.sqrt(1 - t * t) + 1);
}

// Ease In (Elastic)
function easeInElastic(t) {
    let p = 0.3;
    let s = p / 4;
    if (t === 0) return 0;
    if (t === 1) return 1;
    t--;
    return -Math.pow(2, 10 * t) * Math.sin((t - s) * (2 * Math.PI) / p);
}

// Ease Out (Elastic)
function easeOutElastic(t) {
    let p = 0.3;
    let s = p / 4;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
}

// Ease In Out (Elastic)
function easeInOutElastic(t) {
    let p = 0.45;
    let s = p / 4;
    if (t === 0) return 0;
    if (t === 1) return 1;
    t *= 2;
    if (t < 1) {
        t--;
        return -0.5 * Math.pow(2, 10 * t) * Math.sin((t - s) * (2 * Math.PI) / p);
    }
    t--;
    return 0.5 * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
}

// Ease In (Bounce)
function easeInBounce(t) {
    return 1 - easeOutBounce(1 - t);
}

// Ease Out (Bounce)
function easeOutBounce(t) {
    if (t < (1 / 2.75)) {
        return 7.5625 * t * t;
    } else if (t < (2 / 2.75)) {
        t -= (1.5 / 2.75);
        return 7.5625 * t * t + 0.75;
    } else if (t < (2.5 / 2.75)) {
        t -= (2.25 / 2.75);
        return 7.5625 * t * t + 0.9375;
    } else {
        t -= (2.625 / 2.75);
        return 7.5625 * t * t + 0.984375;
    }
}

// Ease In Out (Bounce)
function easeInOutBounce(t) {
    if (t < 0.5) {
        return easeInBounce(t * 2) * 0.5;
    } else {
        return easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
    }
}

export {
    linear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInSine,
    easeOutSine,
    easeInOutSine,
    easeInExpo,
    easeOutExpo,
    easeInOutExpo,
    easeInCirc,
    easeOutCirc,
    easeInOutCirc,
    easeInElastic,
    easeOutElastic,
    easeInOutElastic,
    easeInBounce,
    easeOutBounce,
    easeInOutBounce
};
