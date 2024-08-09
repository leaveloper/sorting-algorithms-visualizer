export default class AlgorithmList {
  #sortDict;
  done = false;

  constructor(sortDict) {
    this.#sortDict = sortDict;
    this.#createCards();
  }

  #handleClick = async (buttonCard, method) => {
    this.done = false;

    this.#handleDisabledCards(buttonCard, true);

    buttonCard.disabled = true;
    await method()
      .then(() => {
        buttonCard.disabled = false;
      })
      .catch((e) => {
        buttonCard.classList.add("broke");
        console.error(e);
      });

    this.#handleDisabledCards(buttonCard, false);

    this.done = true;
  };

  #createCards() {
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
          this.#handleClick(buttonCard, method);
        });
      } else buttonCard.disabled = true;

      algorithmListContainer.appendChild(buttonCard);
    }
  }

  #handleDisabledCards(buttonCard, disabled) {
    const buttons = document.querySelectorAll(".algorithm-card");
    for (const button of buttons) {
      if (button === buttonCard || button.disabled === disabled) continue;
      button.disabled = disabled;
    }
  }
}
