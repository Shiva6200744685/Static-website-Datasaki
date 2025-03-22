document.addEventListener("DOMContentLoaded", function () {
  const state = {
    isAnnual: false,
    currentPage: "home",
    theme: "light",
    isMenuOpen: false,
    testimonialIndex: 0,
    formData: {
      name: "",
      email: "",
      message: "",
    },
    testimonials: [
      {
        id: 1,
        name: "John Smith",
        company: "Tech Solutions Inc.",
        content:
          "Datasaki has transformed how we handle our data analytics. The AI capabilities are outstanding!",
        image: "https://placehold.co/100x100",
        rating: 5,
      },
      {
        id: 2,
        name: "Sarah Chen",
        company: "Innovation Labs",
        content:
          "The platform's ease of use and powerful features have made a significant impact on our business decisions.",
        image: "https://placehold.co/100x100",
        rating: 4.5,
      },
    ],
  };

  // DOM Elements
  const siteContainer = document.querySelector(".site-container");
  const themeToggle = document.querySelector(".theme-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const homeLink = document.querySelector(".home-link");
  const featuresLink = document.querySelector(".features-link");
  const pricingLink = document.querySelector(".pricing-link");
  const contactLink = document.querySelector(".contact-link");
  const pricingToggle = document.querySelector(".toggle-button");
  const contactForm = document.querySelector(".contact-form");
  const nameInput = document.querySelector(
    '.contact-form .form-input[type="text"]'
  );
  const emailInput = document.querySelector(
    '.contact-form .form-input[type="email"]'
  );
  const messageTextarea = document.querySelector(
    ".contact-form .form-textarea"
  );
  const testimonialDots = document.querySelectorAll(".dot");
  const testimonialButton = document.querySelector(".testimonial-button");

  // Theme Toggle
  function toggleTheme() {
    state.theme = state.theme === "light" ? "dark" : "light";
    updateTheme();
  }

  function updateTheme() {
    if (state.theme === "dark") {
      siteContainer.classList.add("dark-theme");
    } else {
      siteContainer.classList.remove("dark-theme");
    }
  }

  // Navigation
  function setPage(page) {
    state.currentPage = page;
    updateNavigation();

    // Scroll to section
    const section = document.querySelector(`.${page}-section`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile menu if open
    if (state.isMenuOpen) {
      toggleMenu();
    }
  }

  function updateNavigation() {
    // Remove active class from all links
    homeLink.classList.remove("active");
    featuresLink.classList.remove("active");
    pricingLink.classList.remove("active");
    contactLink.classList.remove("active");

    // Add active class to current page link
    switch (state.currentPage) {
      case "home":
        homeLink.classList.add("active");
        break;
      case "features":
        featuresLink.classList.add("active");
        break;
      case "pricing":
        pricingLink.classList.add("active");
        break;
      case "contact":
        contactLink.classList.add("active");
        break;
    }
  }

  function toggleMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    if (state.isMenuOpen) {
      navLinks.classList.add("active");
    } else {
      navLinks.classList.remove("active");
    }
  }

  // Pricing Toggle
  function togglePricing() {
    state.isAnnual = !state.isAnnual;
    updatePricing();
  }

  function updatePricing() {
    if (state.isAnnual) {
      pricingToggle.classList.add("active");
      document.body.classList.add("annual-active");
    } else {
      pricingToggle.classList.remove("active");
      document.body.classList.remove("annual-active");
    }
  }

  // Form Handling
  function handleFormInput(field, value) {
    state.formData[field] = value;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!state.formData.name) {
      alert("Please enter your name");
      return;
    }

    if (!state.formData.email || !validateEmail(state.formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!state.formData.message) {
      alert("Please enter a message");
      return;
    }

    // In a real application, you would send the form data to a server here
    console.log("Form submitted:", state.formData);
    alert("Thank you for your message! We'll get back to you soon.");

    // Reset form
    nameInput.value = "";
    emailInput.value = "";
    messageTextarea.value = "";
    state.formData = { name: "", email: "", message: "" };
  }

  // Testimonials
  function setTestimonial(index) {
    state.testimonialIndex = index;
    updateTestimonials();
  }

  function updateTestimonials() {
    testimonialDots.forEach((dot, index) => {
      if (index === state.testimonialIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Event Listeners
  themeToggle.addEventListener("click", toggleTheme);
  menuToggle.addEventListener("click", toggleMenu);
  homeLink.addEventListener("click", () => setPage("home"));
  featuresLink.addEventListener("click", () => setPage("features"));
  pricingLink.addEventListener("click", () => setPage("pricing"));
  contactLink.addEventListener("click", () => setPage("contact"));
  pricingToggle.addEventListener("click", togglePricing);

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
    nameInput.addEventListener("input", (e) =>
      handleFormInput("name", e.target.value)
    );
    emailInput.addEventListener("input", (e) =>
      handleFormInput("email", e.target.value)
    );
    messageTextarea.addEventListener("input", (e) =>
      handleFormInput("message", e.target.value)
    );
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => setTestimonial(index));
  });

  testimonialButton.addEventListener("click", () => {
    setTestimonial((state.testimonialIndex + 1) % testimonialDots.length);
  });

  // Initialize
  updateTheme();
  updateNavigation();
  updatePricing();
  updateTestimonials();
});
