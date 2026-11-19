
var loginForm = document.getElementById("loginForm");

if (loginForm != null) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var email = document.getElementById("email").value.trim().toLowerCase();
        var password = document.getElementById("password").value;
        var users = getUsers();
        var foundUser = null;

        for (var i = 0; i < users.length; i++) {
            if (users[i].email == email && users[i].password == password) {
                foundUser = users[i];
                break;
            }
        }

        if (foundUser == null) {
            showMessage("loginMessage", "Email or password is incorrect. Please sign up first.");
        } else {
            localStorage.setItem("unifixCurrentUser", JSON.stringify(foundUser));

            if (foundUser.role == "student") {
                window.location.href = "student-dashboard.html";
            } else {
                window.location.href = "admin-dashboard.html";
            }
        }
    });
}

// STUDENT SIGN UP
var studentSignupForm = document.getElementById("studentSignupForm");

if (studentSignupForm != null) {
    studentSignupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var users = getUsers();
        var email = document.getElementById("studentEmail").value.trim().toLowerCase();
        var password = document.getElementById("studentPassword").value;
        var confirmPassword = document.getElementById("studentConfirmPassword").value;
        var emailUsed = false;

        for (var i = 0; i < users.length; i++) {
            if (users[i].email == email) {
                emailUsed = true;
            }
        }

        if (emailUsed) {
            showMessage("studentSignupMessage", "This email is already registered.");
            return;
        }

        if (password != confirmPassword) {
            showMessage("studentSignupMessage", "Passwords do not match.");
            return;
        }

        var student = {
            name: document.getElementById("studentName").value.trim(),
            email: email,
            password: password,
            studentId: document.getElementById("studentId").value.trim(),
            course: document.getElementById("studentCourse").value.trim(),
            branch: document.getElementById("studentBranch").value.trim(),
            year: document.getElementById("studentYear").value,
            role: "student"
        };

        users.push(student);
        saveUsers(users);
        alert("Student account created. Please log in.");
        window.location.href = "index.html";
    });
}

// ADMINISTRATION SIGN UP
var adminSignupForm = document.getElementById("adminSignupForm");

if (adminSignupForm != null) {
    adminSignupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var users = getUsers();
        var email = document.getElementById("adminEmail").value.trim().toLowerCase();
        var password = document.getElementById("adminPassword").value;
        var confirmPassword = document.getElementById("adminConfirmPassword").value;
        var emailUsed = false;

        for (var i = 0; i < users.length; i++) {
            if (users[i].email == email) {
                emailUsed = true;
            }
        }

        if (emailUsed) {
            showMessage("adminSignupMessage", "This email is already registered.");
            return;
        }

        if (password != confirmPassword) {
            showMessage("adminSignupMessage", "Passwords do not match.");
            return;
        }

        var admin = {
            name: document.getElementById("adminName").value.trim(),
            email: email,
            password: password,
            facultyId: document.getElementById("facultyId").value.trim(),
            department: document.getElementById("adminDepartment").value.trim(),
            designation: document.getElementById("adminDesignation").value.trim(),
            role: "admin"
        };

        users.push(admin);
        saveUsers(users);
        alert("Administration account created. Please log in.");
        window.location.href = "index.html";
    });
}
