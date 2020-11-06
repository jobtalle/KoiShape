const STEPS = 128;
const COLOR_FILL_LIGHT = "#5180ba";
const COLOR_FILL_DARK = "#314066";
const COLOR_EYE = "#000000";
const EYE_RADIUS = 8;
const MAX_RADIUS = 0.4;
const renderer = document.getElementById("renderer");
const sliderLength = document.getElementById("var-length");
const sliderRadius = document.getElementById("var-radius");
const sliderRadiusPower = document.getElementById("var-radius-power");
const sliderCenterPower = document.getElementById("var-center-power");
const sliderEye = document.getElementById("var-eye");
const fieldLength = document.getElementById("field-length");
const fieldRadius = document.getElementById("field-radius");
const fieldRadiusPower = document.getElementById("field-radius-power");
const fieldCenterPower = document.getElementById("field-center-power");
const fieldEye = document.getElementById("field-eye");
let varLength = Number.parseFloat(sliderLength.value) * renderer.width;
let varRadius = Number.parseFloat(sliderRadius.value) * renderer.height * MAX_RADIUS;
let varRadiusPower = Number.parseFloat(sliderRadiusPower.value);
let varCenterPower = Number.parseFloat(sliderCenterPower.value);
let varEye = Number.parseFloat(sliderEye.value);

const sampleRadius = (f, radius, center) => {
    return Math.pow(Math.cos(Math.PI * (Math.pow(f, center) - .5)), radius);
};

const render = () => {
    const context = renderer.getContext("2d");
    const headX = renderer.width - (renderer.width - varLength) * .5;
    const headY = renderer.height * .5;
    const gradient = context.createLinearGradient(
        0, renderer.height,
        0, 0);

    gradient.addColorStop(0, COLOR_FILL_DARK);
    gradient.addColorStop(1, COLOR_FILL_LIGHT);

    context.clearRect(0, 0, renderer.width, renderer.height);

    context.fillStyle = gradient;
    context.moveTo(headX, headY);
    context.beginPath();

    let step = 0;

    for (; step < STEPS; ++step) {
        const f = step / (STEPS - 1);

        context.lineTo(
            headX - f * varLength,
            headY + sampleRadius(f, varRadiusPower, varCenterPower) * varRadius);
    }

    for (;step-- > 1;) {
        const f = step / (STEPS - 1);

        context.lineTo(
            headX - f * varLength,
            headY - sampleRadius(f, varRadiusPower, varCenterPower) * varRadius);
    }

    context.closePath()
    context.fill();

    context.fillStyle = COLOR_EYE;

    context.beginPath();
    context.arc(
        headX - varLength * varEye,
        headY + sampleRadius(varEye, varRadiusPower, varCenterPower) * varRadius - EYE_RADIUS,
        EYE_RADIUS,
        0,
        Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(
        headX - varLength * varEye,
        headY - sampleRadius(varEye, varRadiusPower, varCenterPower) * varRadius + EYE_RADIUS,
        EYE_RADIUS,
        0,
        Math.PI * 2);
    context.fill();
};

sliderLength.addEventListener("input", () => {
    varLength = Number.parseFloat(sliderLength.value);
    fieldLength.value = varLength.toString();

    varLength *= renderer.width;

    render();
});

sliderRadius.addEventListener("input", () => {
    varRadius = Number.parseFloat(sliderRadius.value);
    fieldRadius.value = varRadius.toString();

    varRadius *= renderer.height * MAX_RADIUS;

    render();
});

sliderRadiusPower.addEventListener("input", () => {
    varRadiusPower = Number.parseFloat(sliderRadiusPower.value);
    fieldRadiusPower.value = varRadiusPower.toString();

    render();
});

sliderCenterPower.addEventListener("input", () => {
    varCenterPower = Number.parseFloat(sliderCenterPower.value);
    fieldCenterPower.value = varCenterPower.toString();

    render();
});

sliderEye.addEventListener("input", () => {
    varEye = Number.parseFloat(sliderEye.value);
    fieldEye.value = varEye.toString();

    render();
});

render();