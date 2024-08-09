import Sort from "../../consts/sortTypes.js";

const sortDict = {
  [Sort.BUBBLE]: {},
  [Sort.HEAP]: {},
  [Sort.INSERTION]: {},
  [Sort.MERGE]: {},
  [Sort.QUICK]: {},
  [Sort.RADIX]: {},
  [Sort.SELECTION]: {},
};

const algorithmListContainer = document.getElementById(
  "algorithm-list-container"
);

const sortEntries = Object.entries(sortDict);
for (const [key, method] of sortEntries) {
  const buttonCard = document.createElement("button");
  buttonCard.id = key;
  buttonCard.textContent = key;
  buttonCard.classList.add("algorithm-card");

  if (typeof method === "function")
    buttonCard.addEventListener("click", method);
  else buttonCard.disabled = true;

  algorithmListContainer.appendChild(buttonCard);
}
