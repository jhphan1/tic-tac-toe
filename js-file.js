const container = document.querySelector("#container");

// Create <p> element with red text
const p = document.createElement("p");
p.classList.add("red");
p.textContent = "Hey I'm red!";
p.style.cssText = "color: red";

container.appendChild(p);

// Create <h3> with blue text
const blueHeading = document.createElement("h3");
blueHeading.classList.add("blue");
blueHeading.textContent = "I'm a blue h3!";
blueHeading.style.cssText = "color: blue";

container.appendChild(blueHeading);

// Create <div> with black border and pink background
const pinkDiv = document.createElement("div");
pinkDiv.classList.toggle("pink");
pinkDiv.style.cssText = "background-color: pink; border: solid black";

container.appendChild(pinkDiv);

// Add <h1> and <p> to div
const divHead = document.createElement("h1");
divHead.textContent = "I'm in a div";
pinkDiv.appendChild(divHead);

const divPara = document.createElement("p");
divPara.textContent = "ME TOO!";
pinkDiv.appendChild(divPara);

// Add button on-click
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button.id);
    });
});

