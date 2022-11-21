const keys = document.querySelector(".keyboard");
const display = document.querySelector(".display");

keys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;

  if (display.textContent == 0) {
    display.textContent = keyValue;
  } else {
    display.textContent = displayValue + keyValue;
  }
});
