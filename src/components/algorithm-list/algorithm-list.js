export default class AlgorithmList {
  #sortDict;

  constructor(sortDict) {
    this.#sortDict = sortDict;
  }

  #sort = async (buttonCard, method) => {
    buttonCard.disabled = true;
    method()
      .then(() => {
        buttonCard.disabled = false;
      })
      .catch((e) => {
        buttonCard.classList.add("broke");
        console.error(e);
      });
  };

  createCards() {
    const algorithmListContainer = document.getElementById(
      "algorithm-list-container"
    );

    const sortEntries = Object.entries(this.#sortDict);
    for (const [key, method] of sortEntries) {
      const buttonCard = document.createElement("button");
      buttonCard.id = key;
      buttonCard.textContent = key;
      buttonCard.classList.add("algorithm-card");

      if (typeof method === "function") {
        buttonCard.addEventListener("click", (e) => {
          this.#sort(buttonCard, method);
        });
      } else buttonCard.disabled = true;

      algorithmListContainer.appendChild(buttonCard);
    }
  }
}
