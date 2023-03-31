const root = document.querySelector(":root"),
  navMenu = document.getElementById("nav-menu"),
  toggleMenu = document.getElementById("nav-toggle"),
  closeMenu = document.getElementById("nav-close"),
  navLink = document.querySelectorAll(".nav_link"),
  sections = document.querySelectorAll("section[id]"),
  downloadResume = document.getElementById("download-resume"),
  emailTextbox = document.getElementById("fromEmail"),
  submitBtn = document.getElementById("submitButton");
themeToggler = document.getElementById("themeToggler");

//Show menu
toggleMenu.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

//Hide menu on click of close icon
closeMenu.addEventListener("click", () => {
  navMenu.classList.remove("show");
});

//Hide menu on click of any link
navLink.forEach((link) =>
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  })
);

//Scroll sections for active link
window.addEventListener("scroll", () => {
  const scroll = window.pageYOffset;
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    sectionId = section.getAttribute("id");
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav_menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav_menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
});

downloadResume.addEventListener("click", () => {
  downloadResume.classList.remove("download_btn");
  downloadResume.classList.add("downloading_btn");
  var anim = setInterval(animate, 40);
  var percent = 0;

  function animate() {
    percent++;
    if (percent > 100) {
      clearInterval(anim);
      download("assets/AakashJainResume.pdf");
      downloadResume.classList.remove("downloading_btn");
      downloadResume.classList.add("download_btn");
      downloadResume.innerHTML = "Download Resume";
    } else {
      downloadResume.innerHTML = percent + "%";
    }
  }
});
const download = (file) => {
  var element = document.createElement("a");
  element.setAttribute("href", file);
  element.setAttribute("download", "");
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

emailTextbox.addEventListener("focusout", () => {
  const regex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
  const value = emailTextbox.value;
  if (value == "" || value.match(regex)) {
    emailTextbox.classList.remove("contact_input_error");
  } else {
    emailTextbox.classList.add("contact_input_error");
    alert("Please enter valid email.");
  }
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    submitBtn.value = "Sending...";
    const serviceID = "default_service";
    const templateID = "template_gpqqs0i";
    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        submitBtn.value = "Send Message";
        alert("Your message has been sent successfully!");
        this.reset();
      },
      (err) => {
        submitBtn.value = "Send Message";
        alert(JSON.stringify(err));
      }
    );
  });

themeToggler.addEventListener("click", () => {
  const themeIcon = themeToggler.children[0];
  if (themeIcon.classList.contains("bxs-moon")) {
    themeIcon.classList.add("bxs-sun");
    themeIcon.classList.remove("bxs-moon");
    root.style.setProperty("--background-color-light", "rgb(237, 254, 255)");
    root.style.setProperty("--background-color-lighten", "#000000");
    root.style.setProperty("--background-color-dark", "#EAE7E6");
    root.style.setProperty("--background-color-darken", "#FFFAFA");
  } else {
    themeIcon.classList.remove("bxs-sun");
    themeIcon.classList.add("bxs-moon");
    root.style.setProperty("--background-color-light", "#EAE7E6");
    root.style.setProperty("--background-color-lighten", "#FFFAFA");
    root.style.setProperty("--background-color-dark", "rgb(237, 254, 255)");
    root.style.setProperty("--background-color-darken", "#000000");
  }
});
