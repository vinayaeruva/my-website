gsap.registerPlugin(SplitText, CustomEase);

const tl = gsap.timeline({
  defaults: {
    ease: CustomEase.create("custom", "0.77, 0, 0.175, 1"),
    duration: 1,
  },
});

const splitOne = new SplitText(".headline-1", { type: "chars" });
const splitTwo = new SplitText(".headline-2", { type: "chars" });
const splitThree = new SplitText(".headline-3", { type: "chars" });

tl.fromTo(
  ".loader-screen",
  { clipPath: "inset(0 0 0% 0)" },
  { clipPath: "inset(0 0 100% 0)", delay: 1 }
)
  .from(".header", { y: "-100%" }, "-=0.25")
  .from(
    [splitOne.chars, splitTwo.chars, splitThree.chars],
    {
      duration: 0.5,
      y: 150,
      opacity: 0,
      stagger: 0.03,
    },
    "-=0.20"
  )
  .from(
    ".explore-catalog-btn",
    {
      scale: 1.1,
      opacity: 0,
    },
    "<"
  )
  .from(
    ".arrow-circle",
    {
      x: -50,
      y: 50,
      opacity: 0,
    },
    "<"
  )
  .from(
    ".landing-paragraph",
    {
      x: -20,
      opacity: 0,
    },
    "<"
  )
  .from(
    ".separator",
    {
      scaleX: 0,
      opacity: 0,
    },
    "<"
  )
  .from(
    ".label-line",
    {
      scaleX: 0,
    },
    "<"
  )
  .from(
    [".certs-1", ".certs-2"],
    {
      opacity: 0,
      stagger: 0.01,
      x: -20,
    },
    "<"
  )
  .from(
    ".scroll-down-indicator span",
    {
      y: 20,
      opacity: 0,
    },
    "<"
  )
  .from(
    ".scroll-down-indicator img",
    {
      y: 20,
      opacity: 0,
    },
    "<"
  );

  // Function to display company information
function displayCompanyInfo() {
  const companyInfoDiv = document.getElementById('companyInfo');
  companyInfoDiv.textContent = "Established in 1938, we are the world's number one producer";
}

// Export the function so it can be used in other files
export { displayCompanyInfo };
  

  document.getElementById('scrollButton').addEventListener('click', function() {
    // Scrolls down smoothly by 1000px from the current scroll position
    window.scrollTo({
      top: 1000,  // Set this to the desired scroll distance in pixels
      behavior: 'smooth'  // This ensures smooth scrolling
    });
  });


// Function to check if the user has scrolled to the bottom of the page
function checkScroll() {
    // Get the current scroll position and the total page height
    let scrollPosition = window.innerHeight + window.scrollY;
    let pageHeight = document.documentElement.scrollHeight;

    // Get the social media bar element
    let socialBar = document.getElementById('social-bar');

    // If the user has reached the bottom, show the social media bar
    if (scrollPosition >= pageHeight) {
        socialBar.classList.add('show');
    } else {
        socialBar.classList.remove('show');
    }
}

// Add an event listener to detect scroll
window.addEventListener('scroll', checkScroll);

// JavaScript for redirecting to contact.html

// Select the Contact Us button
const contactUsBtn = document.querySelector('.contact-us-btn');

// Add event listener to redirect to contact.html on click
contactUsBtn.addEventListener('click', function() {
    window.location.href = 'contact.html'; // Redirect to contact.html
});







  





