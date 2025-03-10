// Swiper Sliders Initialization
var swiper1 = new Swiper(".slide-swp", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true
  },
  autoplay: {
      delay: 2500,
      disableOnInteraction: false,
  },
  loop: true,
});

var swiper2 = new Swiper(".deals", {
  slidesPerView: 2,
  spaceBetween: 30,
  autoplay: {
      delay: 1000,
      disableOnInteraction: false,
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  loop: true,
  breakpoints: {
      1200: { slidesPerView: 2 },
      990: { slidesPerView: 1 },
      0: { slidesPerView: 1 }
  }
});

var swiper3 = new Swiper(".sale-sec", {
  slidesPerView: 5,
  spaceBetween: 30,
  autoplay: {
      delay: 3000,
      disableOnInteraction: false,
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  loop: true,
  breakpoints: {
      1400: { slidesPerView: 5 },
      1200: { slidesPerView: 4 },
      800: { slidesPerView: 3, spaceBetween: 30 },
      650: { slidesPerView: 3, spaceBetween: 15 },
      0: { slidesPerView: 2, spaceBetween: 10 }
  }
});

var swiper4 = new Swiper(".swip-with-img", {
  slidesPerView: 4,
  spaceBetween: 30,
  autoplay: {
      delay: 3000,
      disableOnInteraction: false,
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  loop: true,
  breakpoints: {
      1400: { slidesPerView: 4 },
      1100: { slidesPerView: 3 },
      800: { slidesPerView: 2, spaceBetween: 30 },
      700: { slidesPerView: 2, spaceBetween: 15 },
      0: { slidesPerView: 2, spaceBetween: 10 }
  }
});

/* Side Bar in Responsive */
let btnCloseSide = document.getElementById("btn-close");
let sideBar = document.getElementById("side-bar");
let btnOpenSide = document.getElementById("open-side");

// const apiurl=process.env.BACKEND_URL;

if (btnOpenSide && sideBar) {
  btnOpenSide.onclick = () => sideBar.classList.add('active');
}

if (btnCloseSide && sideBar) {
  btnCloseSide.onclick = () => sideBar.classList.remove('active');
}

/* Product Image Change */
let bigImage = document.getElementById('big-img');

function myProduct(item) {
  if (bigImage) {
      bigImage.src = item;
  }
}

/* Buy Now Fast Order */
let btnbuyNowF = document.querySelector('.buyNow');
let divcretAcBuyF = document.querySelector('.creatacountfast');

if (btnbuyNowF && divcretAcBuyF) {
  btnbuyNowF.onclick = () => {
      divcretAcBuyF.classList.toggle('active');
  };
} else {
  console.error("Element(s) not found: Check .buyNow and .creatacountfast classes.");
}

// Sending mail to new subscriber
document.getElementById("subscribe-form").addEventListener("submit", async function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;

  try {
    const response = await fetch("https://shop-nest-0tcz.onrender.com/api/subscribe", { 
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
  });
  

    const data = await response.json();

    if (response.status === 409) {
        alert("You are already subscribed!");
    } else {
        alert("You are already subscribed!",data.message);
    }
  } catch (error) {
    console.error("Error subscribing:", error);
    alert("Something went wrong. Please try again.");
  }
});  
