/**
 * Shopify onboarding hackathon challenge
 * 
 */

const alertIcon = document.querySelector("#alert-icon");
const alertCard = document.querySelector("#alert-card");

const menusIcon = document.querySelector("#menus-icon");
const menusCard = document.querySelector("#menus-card");

const closeIcon = document.querySelector("#close-icon");
const closeCard = document.querySelector("#close-card");

const dropdIcon = document.querySelector("#dropd-icon");
const dropdCard = document.querySelector("#dropd-card");

const rangeText = document.querySelector("#range-text");
const rangePipe = document.querySelector("#range-pipe");

const checkList = document.querySelectorAll(".check");
const titleList = document.querySelectorAll(".title");

// const docWindow = document.body;

const state = {
    idle: "#icon-dash",
    loading: "#icon-spin",
    success: "#icon-chek",
    timeout: 100
}

let value = parseInt(rangePipe.dataset.val);
let limit = parseInt(rangePipe.dataset.max);


let currPanel = document.querySelector(".panel");
let prevPanel;

currPanel.parentElement.parentElement
    .style.setProperty("background-color", "var(--l-100)");

/**
 * Handle Toggle
 * @param {*} event 
 */
const handleToggle = (param) => {
    const { target, type } = param;
    if (type === "menus") {
        if (alertCard.classList.contains("show")) {
            alertCard.classList.remove("show");
        }
    }

    if (type === "alert") {
        if (menusCard.classList.contains("show")) {
            menusCard.classList.remove("show");
        }
    }

    if (type === "dropd") {
        const arrow = dropdIcon.querySelector("use");
        if (dropdCard.classList.contains("show")) {
            arrow.setAttribute("href", "#icon-angu");
        } else {
            arrow.setAttribute("href", "#icon-angd");
        }
    }
    target.classList.toggle("show");
}

/**
 * Handle Remove
 * @param {*} event 
 */
const handleRemove = (event) => {
    closeCard.classList.add("hide");
    setTimeout(() => {
        closeCard.style.setProperty("display", "none");
    }, 500);
}

/**
 * Handle Checks
 * @param {*} event 
 */
const handleChecks = (param) => {
    const { target } = param;
    const check = target.dataset.state;
    if (check === "idle") {
        value = value + 1;
        updateSlider({ value });
        updatePanels({
            level: target
        });
        target.setAttribute("data-state", "done");
        target.animate([
            { transform: "rotate(360deg)" }], { duration: 500 });
        setTimeout(() => handleStatus({
            target, status: state.loading
        }), state.timeout * 0);
        setTimeout(() => handleStatus({
            target, status: state.success
        }), state.timeout * 5);
    } else {
        const checkbox = target.querySelector("use");
        value = value - 1;
        updateSlider({ value });
        target.setAttribute("data-state", "idle");
        checkbox.setAttribute("href", state.idle);
    }
}

/**
 * Handle Titles
 * @param {*} event
 */

const handleTitles = (param) => {
    const { target } = param;

    prevPanel = currPanel;
    currPanel = target.nextElementSibling;

    if (prevPanel) {
        prevPanel.classList.remove("show");
        prevPanel.parentElement.parentElement
        .style.setProperty("background-color", " transparent");
    }

    currPanel.classList.add("show");
    currPanel.parentElement.parentElement
        .style.setProperty("background-color", "var(--l-100)");
}

const handleStatus = (param) => {
    const { target, status } = param;
    const checkbox = target.querySelector("use");
    if (!document.startViewTransition) {
        checkbox.setAttribute("href", status);
        return;
    }
    document.startViewTransition(() => {
        checkbox.setAttribute("href", status);
    });
}

const updateSlider = (param) => {
    const { value } = param;
    const width = (value / limit) * 100;

    const val = value.toString();
    const max = limit.toString();

    rangeText.innerText = `${val} / ${max} completed`;
    rangePipe.style.setProperty("width", `${width}%`);
}

const updatePanels = (param) => {
    const { level: targetElem } = param;

    const elemA = targetElem.parentElement;
    const elemB = elemA.nextElementSibling;
    if (!elemB) { return };

    const panel = elemB.querySelector(".bunker__level-panel");

    if (currPanel) {
        currPanel.classList.remove("show");
        currPanel.parentElement.parentElement
        .style.setProperty("background-color", " transparent");
    }

    panel.classList.add("show");
    panel.parentElement.parentElement
        .style.setProperty("background-color", "var(--l-100)");
    currPanel = panel;
}

checkList.forEach(check => {
    check.addEventListener("click", (e) => handleChecks({
        target: check,
        event: e
    }));
});

titleList.forEach(title => {
    title.addEventListener("click", (e) => handleTitles({
        target: title,
        event: e
    }));
});

alertIcon.addEventListener("click", (e) => handleToggle({
    target: alertCard,
    type: "alert"
}));
menusIcon.addEventListener("click", (e) => handleToggle({
    target: menusCard,
    type: "menus"
}));
dropdIcon.addEventListener("click", (e) => handleToggle({
    target: dropdCard,
    type: "dropd"
}));
closeIcon.addEventListener("click", (e) => handleRemove(e));
