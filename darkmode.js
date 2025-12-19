// Check for saved user preference in localStorage
let darkmode = localStorage.getItem('darkmode');
// Select all elements with the id or class (using selector to catch both switches)
const themeSwitches = document.querySelectorAll('#theme-switch');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active'); // Save preference
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null); // Remove preference
};

// Apply preference on page load
if (darkmode === "active") enableDarkmode();

// Loop through all switches and add the click event listener
themeSwitches.forEach(switchBtn => {
    switchBtn.addEventListener("click", () => {
        darkmode = localStorage.getItem('darkmode');
        // Toggle between active and null
        darkmode !== "active" ? enableDarkmode() : disableDarkmode();
    });
});