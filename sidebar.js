// Function to Open Sidebar
function showsidebar() {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.add("active");
      }

      // Function to Close Sidebar
      function closesidebar() {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.remove("active");
      }

      // Bonus: Close sidebar if clicking outside of it (Optional but recommended)
      document.addEventListener("click", function (event) {
        const sidebar = document.querySelector(".sidebar");
        const menuButton = document.querySelector(".menu-button");

        // If sidebar is open AND click is NOT on sidebar AND NOT on menu button
        if (
          sidebar.classList.contains("active") &&
          !sidebar.contains(event.target) &&
          !menuButton.contains(event.target)
        ) {
          closesidebar();
        }
      });      