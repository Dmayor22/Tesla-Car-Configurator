// Selectors or variables
const topbar = document.getElementById("top-bar");
const exteriorColorSection = document.getElementById("exterior-buttons");
const interiorColorSection = document.getElementById("interior-buttons");
const exteriorImage = document.getElementById("exterior-image");
const interiorImage = document.getElementById("interior-image");
const wheelButtonSection = document.getElementById("wheel-buttons");
const performanceUpgrate = document.getElementById("performance-upgrage");
const totalPriceElement = document.getElementById("total-price");
const fullSelfDrivingCheckbox = document.getElementById(
  "full-self-driving-checkbox",
);
const centerConsoleTrays = document.getElementById("CCT");
const sunshade = document.getElementById("sunshade");
const allWeatherInteriorLiners = document.getElementById("AWIL");
const accesoriesContainer = document.getElementById("accesories-container");
const downPaymentEl = document.getElementById("down-payment");
const monthlyPaymentEl = document.getElementById("monthly-payment");

// price variables
const basePrice = 52490;
let currentPrice = basePrice;

const pricing = {
  "Performance Wheels": 2500,
  "Performance Package": 5000,
  "Full Self-Driving": 8500,
  Accessories: {
    "Center Console Trays": 35,
    Sunshade: 105,
    "All-weather Interior Liners": 225,
  },
};

// Update total Price in the UI
const updateTotalPrice = () => {
  // reser current price to  base price
  currentPrice = basePrice;

  if (selectedOptions["Performance Wheels"]) {
    currentPrice += pricing["Performance Wheels"];
  }
  if (selectedOptions["Performance Package"]) {
    currentPrice += pricing["Performance Package"];
  }
  if (selectedOptions["Full Self-Driving"]) {
    currentPrice += pricing["Full Self-Driving"];
  }
  if (selectedOptions["Center Console Tray"]) {
    currentPrice += pricing["Accessories"]["Center Console Trays"];
  }
  if (selectedOptions["Sunshade"]) {
    currentPrice += pricing["Accessories"]["Sunshade"];
  }
  if (selectedOptions["All Weather Interior Liners"]) {
    currentPrice += pricing["Accessories"]["All-weather Interior Liners"];
  }

  // Update Price in UI
  totalPriceElement.textContent = `$${currentPrice.toLocaleString()}`;

  // update estimate price
  handleEstPaymentUpdate();
};

let selectedColor = "Stealth Grey";
const selectedOptions = {
  "Performance Wheels": false,
  "Performance Package": false,
  "Full Self-Driving": false,
  "Center Console Tray": false,
  Sunshade: false,
  "All Weather Interior Liners": false,
};

// function to handle topbar scroll
const handleScroll = () => {
  const atTop = window.scrollY === 0;
  topbar.classList.toggle("visible-bar", atTop);
  topbar.classList.toggle("hidden-bar", !atTop);
};

// Image Mapping
const exteriorImages = {
  "Stealth Grey": "./images/model-y-stealth-grey.jpg",
  "Pearl White": "./images/model-y-pearl-white.jpg",
  "Deep Blue": "./images/model-y-deep-blue-metallic.jpg",
  "Solid Black": "./images/model-y-solid-black.jpg",
  "Ultra Red": "./images/model-y-ultra-red.jpg",
  Quicksilver: "./images/model-y-quicksilver.jpg",
};

const interiorImages = {
  Dark: "./images/model-y-interior-dark.jpg",
  Light: "./images/model-y-interior-light.jpg",
};

// function to handle Color Selection
const handleColorSelection = (event) => {
  let button;

  //   get the target to be a button when click not withstanding if it is an image tag
  if (event.target.tagName === "IMG") {
    button = event.target.closest("button");
  } else if (event.target.tagName === "BUTTON") {
    button = event.target;
  }

  //   adding and removing the class for btn selected and change images
  if (button) {
    // remove
    const buttons = event.currentTarget.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("btn-selected"));
    // add
    button.classList.add("btn-selected");

    // change exterior images
    if (event.currentTarget === exteriorColorSection) {
      // select img alt text
      selectedColor = button.querySelector("img").alt;
      updateExteriorImage();
    }
    // change interior images
    if (event.currentTarget === interiorColorSection) {
      // select img alt text
      const color = button.querySelector("img").alt;
      interiorImage.src = interiorImages[color];
    }
  }
};

// function to handle wheek section
const handleWheelButtonClick = (e) => {
  if (e.target.tagName === "BUTTON") {
    const buttons = document.querySelectorAll("#wheel-buttons button");
    buttons.forEach((btn) => {
      btn.classList.remove("bg-gray-700", "text-white");
      btn.classList.add("bg-gray-200");
    });

    // add style to clicked button for wheel
    e.target.classList.add("bg-gray-700", "text-white");

    // change wheels based on selected performance
    selectedOptions["Performance Wheels"] =
      e.target.textContent.includes("Performance");

    // update Exterior Image
    updateExteriorImage();

    // update price
    updateTotalPrice();
  }
};

// Update exterior image src based on Color and Wheels
const updateExteriorImage = () => {
  const performanceSuffix = selectedOptions["Performance Wheels"]
    ? "-performance"
    : "";
  const colorKey =
    selectedColor in exteriorImages ? selectedColor : "Stealth Grey";
  exteriorImage.src = exteriorImages[colorKey].replace(
    ".jpg",
    `${performanceSuffix}.jpg`,
  );
};

// Update Performance Upgrade Package Button
const handlePerformanceClickButton = (e) => {
  const isSelected = performanceUpgrate.classList.toggle("bg-gray-700");
  performanceUpgrate.classList.toggle("text-white");

  // update selected options
  selectedOptions["Performance Package"] = isSelected;
  // update pricing
  updateTotalPrice();
};

// function for FSD selection if checked
const fsd = () => {
  const isSelected = fullSelfDrivingCheckbox.checked;
  selectedOptions["Full Self-Driving"] = isSelected;

  updateTotalPrice();
};

const handleAccessoriesClick = () => {
  const isSelected = centerConsoleTrays.checked;
  const isSelectedTwo = sunshade.checked;
  const isSelectedThree = allWeatherInteriorLiners.checked;
  selectedOptions["Center Console Tray"] = isSelected;
  selectedOptions["Sunshade"] = isSelectedTwo;
  selectedOptions["All Weather Interior Liners"] = isSelectedThree;

  updateTotalPrice();
};

// Payment Breakdown Calculation
const handleEstPaymentUpdate = () => {
  const downPayment = currentPrice * 0.1;
  downPaymentEl.textContent = `$${downPayment}`;

  // Calculate loan details (assuming 60-month loan and 3% interest rate)
  const loanTermMonths = 60;
  const interestRate = 0.03;

  const loanAmount = currentPrice - downPayment;

  // Monthly payment formula: P * (r(1+r)^n) / ((1+r)^n - 1)
  const monthlyInterestRate = interestRate / 12;

  const monthlyPayment =
    (loanAmount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

  monthlyPaymentEl.textContent = `$${monthlyPayment
    .toFixed(2)
    .toLocaleString()}`;
};

// Event Listeners
// Initializing pricing
updateTotalPrice();
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener("click", handleColorSelection);
interiorColorSection.addEventListener("click", handleColorSelection);
wheelButtonSection.addEventListener("click", handleWheelButtonClick);
performanceUpgrate.addEventListener("click", handlePerformanceClickButton);
fullSelfDrivingCheckbox.addEventListener("click", fsd);
centerConsoleTrays.addEventListener("click", handleAccessoriesClick);
sunshade.addEventListener("click", handleAccessoriesClick);
allWeatherInteriorLiners.addEventListener("click", handleAccessoriesClick);
