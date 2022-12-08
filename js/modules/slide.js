function slide({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    slidesWparrer = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWparrer).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "1s all";

  slidesWparrer.style.overflow = "hidden";

  slides.forEach((slide) => (slide.style.width = width));

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  const diliteNotDigits = (str) => {
    return +str.replace(/\D/g, "");
  };

  next.addEventListener("click", () => {
    if (offset === diliteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += diliteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = diliteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= diliteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = diliteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

  // izi variant
  //   slideShow(slideIndex);

  //   if (slides.length < 10) {
  //     total.textContent = `0${slides.length}`;
  //   } else {
  //     total.textContent = slides.length;
  //   }

  //   function slideShow(n) {
  //     if (n > slides.length) {
  //       slideIndex = 1;
  //     }

  //     if (n < 1) {
  //       slideIndex = slides.length;
  //     }

  //     slides.forEach((el) => (el.style.display = "none"));
  //     slides[slideIndex - 1].style.display = "block";

  //     if (slides.length < 10) {
  //       current.textContent = `0${slideIndex}`;
  //     } else {
  //       current.textContent = slideIndex;
  //     }
  //   }

  //   function plusSlides(n) {
  //     slideShow((slideIndex += n));
  //   }

  //   prev.addEventListener("click", () => plusSlides(-1));
  //   next.addEventListener("click", () => plusSlides(1));
}

export default slide;
