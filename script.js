function switchTab(tab) {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.remove("active");
    document.getElementById("loginTab").classList.remove("active");
    document.getElementById("registerTab").classList.remove("active");

    document.getElementById(tab + "Form").classList.add("active");
    document.getElementById(tab + "Tab").classList.add("active");
}

async function login(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "home.html";
    } else {
        alert(data.error);
    }
}

async function register(event) {
    event.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const res = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
        alert(data.message);
        switchTab('login'); // Switch to login after successful registration
    } else {
        alert(data.error);
    }
}

window.onload = function() {
    switchTab('login'); // Default tab on load
};

function sendOTP() {
    let email = document.getElementById('registerEmail').value;
    if (!email) {
        alert('Please enter an email first.');
        return;
    }

    fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.text())
    .then(message => alert(message))
    .catch(error => console.error('Error sending OTP:', error));
}

function verifyOTP(event) {
    event.preventDefault();
    let email = document.getElementById('registerEmail').value;
    let otp = document.getElementById('registerOTP').value;

    fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
    })
    .then(response => response.text())
    .then(message => {
        if (message.includes('verified')) {
            alert('OTP Verified! You can now login.');
            document.getElementById('registerForm').submit();
        } else {
            alert('Invalid OTP! Try again.');
        }
    })
    .catch(error => console.error('Error verifying OTP:', error));
}




