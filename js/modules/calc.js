function calc() {
  const result = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "famele";
    localStorage.setItem("sex", "famele");
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  function initLocalSetings(selector, classActive) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      el.classList.remove(classActive);

      if (el.getAttribute("id") === localStorage.getItem("sex")) {
        el.classList.add(classActive);
      }

      if (el.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        el.classList.add(classActive);
      }
    });
  }

  initLocalSetings("#gender div", "calculating__choose-item_active");
  initLocalSetings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = `___`;
      return;
    }
    if (sex === "famele") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        elements.forEach((el) => el.classList.remove(activeClass));

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.backgroundColor = "#f0ad65";
      } else {
        input.style.backgroundColor = "#fff";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
      }
      calcTotal();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}

export default calc;
