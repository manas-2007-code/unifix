
function getUsers() {
    var users = localStorage.getItem("unifixUsers");

    if (users == null) {
        return [];
    }

    return JSON.parse(users);
}

function saveUsers(users) {
    localStorage.setItem("unifixUsers", JSON.stringify(users));
}

function getComplaints() {
    var complaints = localStorage.getItem("unifixComplaints");

    if (complaints == null) {
        return [];
    }

    return JSON.parse(complaints);
}

function saveComplaints(complaints) {
    localStorage.setItem("unifixComplaints", JSON.stringify(complaints));
}

function getCurrentUser() {
    var user = localStorage.getItem("unifixCurrentUser");

    if (user == null) {
        return null;
    }

    return JSON.parse(user);
}

function checkLogin(role) {
    var user = getCurrentUser();

    if (user == null || user.role != role) {
        window.location.href = "index.html";
        return null;
    }

    return user;
}

function logout() {
    localStorage.removeItem("unifixCurrentUser");
    window.location.href = "index.html";
}

function showMessage(elementId, message) {
    var messageBox = document.getElementById(elementId);

    if (messageBox != null) {
        messageBox.textContent = message;
    }
}

function safeText(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
