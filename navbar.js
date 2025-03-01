document.addEventListener("DOMContentLoaded", function () {
    const authLink = document.getElementById("authLink");
    const myAccountLink = document.getElementById("myAccountLink");

    // Check if user is logged in (stored in localStorage)
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        // User is logged in: Change "Sign In" to "Logout"
        authLink.textContent = "Logout";
        authLink.href = "#"; // Prevent navigating to sign-in page
        authLink.addEventListener("click", function () {
            localStorage.removeItem("user"); // Clear user data
            window.location.reload(); // Refresh page to update UI
        });

        // Change "My Account" link to redirect to myaccount.html
        myAccountLink.href = "/myaccount.html";
    }
});
