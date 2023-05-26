document.addEventListener('DOMContentLoaded', (event) => {
  var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

function handlePillarClick(pillarNumber, event) {
  event.stopPropagation();
  const pillarBoxes = document.querySelectorAll('.pillar-box');
  const page = document.getElementById('page-2');
  
  let anyExpanded = false;

  pillarBoxes.forEach((pillarBox, index) => {
    if (pillarNumber - 1 === index) {
      pillarBox.classList.toggle('expanded');
      pillarBox.classList.toggle('collapsed');
      anyExpanded = pillarBox.classList.contains('expanded');
    } else {
      pillarBox.classList.remove('expanded');
      pillarBox.classList.add('collapsed');
    }
  });

  if (anyExpanded) {
    page.classList.add('darkened-background');
  } else {
    page.classList.remove('darkened-background');
  }
}


function resetPillars() {
  const pillarBoxes = document.querySelectorAll('.pillar-box');
  const page = document.getElementById('page-2');

  pillarBoxes.forEach((pillarBox) => {
    pillarBox.classList.remove('expanded');
    pillarBox.classList.add('collapsed');
  });

  page.classList.remove('darkened-background');
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("read-terms-btn").addEventListener("click", function () {
    const termsContainer = document.getElementById("terms-modal");
    termsContainer.style.display = "block";
  });
});

function showModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function hideModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

window.onclick = function (event) {
  var modals = document.getElementsByClassName("modal");

  for (var i = 0; i < modals.length; i++) {
    if (event.target === modals[i]) {
      modals[i].style.display = "none";
    }
  }
};



var closeModalButtons = document.getElementsByClassName("close-modal");
for (var i = 0; i < closeModalButtons.length; i++) {
  closeModalButtons[i].onclick = function (event) {
    var modal = event.target.closest(".modal");
    if (modal) {
      modal.style.display = "none";
    }
  };
}


window.onload = function() {
  // Get the container in which to add the bubbles
  var container = document.querySelector('.scroll-section-1');

  // Function to generate a random integer between min and max (inclusive)
  function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Create 100 bubbles
  for (var i = 0; i < 100; i++) {
      // Create a new bubble
      var bubble = document.createElement('div');

      // Randomly assign it a size
      var size = randomInt(1, 3);
      bubble.className = 'bubble ' + (size === 1 ? 'small' : size === 2 ? 'medium' : 'large');

      // Randomly position it along the width of the container
      bubble.style.left = randomInt(0, container.offsetWidth) + 'px';

      // Randomly delay its animation
      bubble.style.animationDelay = randomInt(0, 20) + 's';

      // Add the bubble to the container
      container.appendChild(bubble);
  }
}

/*Responsive Design*/

/*Page 1*/

document.querySelector('.mobile-button-philosophical-pillars .mobile-button').addEventListener('click', function() {
var philosophicalPillars = document.getElementById('philosophical-pillars');
if (philosophicalPillars.style.display === 'none') {
  philosophicalPillars.style.display = 'block';
} else {
  philosophicalPillars.style.display = 'none';
}
});

const button = document.getElementById('book-trial-button');

button.addEventListener('touchstart', () => {
  button.classList.add('active');
});

button.addEventListener('touchend', () => {
  button.classList.remove('active');
});

// For devices that support both touch and click events
button.addEventListener('mousedown', () => {
  button.classList.add('active');
});

button.addEventListener('mouseup', () => {
  button.classList.remove('active');
});

const bookTrialButton = document.getElementById('book-trial-button');
const enrollButton = document.getElementById('enroll-button');

[bookTrialButton, enrollButton].forEach((button) => {
button.addEventListener('touchstart', () => {
  button.classList.add('active');
});

button.addEventListener('touchend', () => {
  button.classList.remove('active');
});

button.addEventListener('mousedown', () => {
  button.classList.add('active');
});

button.addEventListener('mouseup', () => {
  button.classList.remove('active');
});
});

window.onscroll = function() {
  var header = document.querySelector(".header");

  if (window.pageYOffset > 10) { // Change the color after scrolling 50px
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};
