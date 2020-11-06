const renderer = document.getElementById("renderer");
const sliderThickness = document.getElementById("var-thickness");
const sliderCenter = document.getElementById("var-center");
const fieldThickness = document.getElementById("field-thickness");
const fieldCenter = document.getElementById("field-center");
let varThickness = 0.5;
let varCenter = 0.5;

const render = () => {
    const context = renderer.getContext("2d");

    context.clearRect(0, 0, renderer.width, renderer.height);
};

sliderThickness.addEventListener("input", () => {
    varThickness = Number.parseFloat(sliderThickness.value);
    fieldThickness.value = varThickness.toString();

    render();
});

sliderCenter.addEventListener("input", () => {
    varCenter = Number.parseFloat(sliderCenter.value);
    fieldCenter.value = varCenter.toString();

    render();
});