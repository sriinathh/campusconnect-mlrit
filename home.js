document.getElementById("logoutBtn").addEventListener("click", function () {
    // Clear user session (adjust based on your authentication method)
    localStorage.removeItem("userToken"); // If using JWT or session storage
    sessionStorage.removeItem("userSession"); // If using session storage

    // Redirect to login page
    window.location.href = "index.html";
});
