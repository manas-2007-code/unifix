

var student = checkLogin("student");

if (student != null) {
    var welcome = document.getElementById("studentWelcome");
    var topName = document.getElementById("studentTopName");

    if (welcome != null) {
        welcome.textContent = "Welcome, " + student.name;
    }

    if (topName != null) {
        topName.textContent = student.name;
    }

    var logoutButton = document.getElementById("studentLogout");

    if (logoutButton != null) {
        logoutButton.addEventListener("click", logout);
    }

    showStudentDashboard();
    showMyComplaints();
    submitComplaint();
}

function showStudentDashboard() {
    var table = document.getElementById("recentComplaints");

    if (table == null) {
        return;
    }

    var complaints = getComplaints();
    var myList = [];

    for (var i = 0; i < complaints.length; i++) {
        if (complaints[i].studentEmail == student.email) {
            myList.push(complaints[i]);
        }
    }

    document.getElementById("totalCount").textContent = myList.length;
    document.getElementById("pendingCount").textContent = countStatus(myList, "Pending");
    document.getElementById("progressCount").textContent = countStatus(myList, "In Progress");
    document.getElementById("resolvedCount").textContent = countStatus(myList, "Resolved");

    table.innerHTML = "";

    for (var j = myList.length - 1; j >= 0 && j >= myList.length - 5; j--) {
        var row = "<tr>";
        row += "<td>" + safeText(myList[j].id) + "</td>";
        row += "<td>" + safeText(myList[j].title) + "</td>";
        row += "<td>" + safeText(myList[j].category) + "</td>";
        row += "<td>" + safeText(myList[j].date) + "</td>";
        row += "<td><span class='status'>" + safeText(myList[j].status) + "</span></td>";
        row += "</tr>";
        table.innerHTML += row;
    }

    if (myList.length > 0) {
        document.getElementById("noRecentComplaints").style.display = "none";
    }
}

function countStatus(list, status) {
    var count = 0;

    for (var i = 0; i < list.length; i++) {
        if (list[i].status == status) {
            count++;
        }
    }

    return count;
}

function submitComplaint() {
    var form = document.getElementById("reportForm");

    if (form == null) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var complaints = getComplaints();
        var newComplaint = {
            id: "UF" + Date.now(),
            studentName: student.name,
            studentEmail: student.email,
            title: document.getElementById("issueTitle").value.trim(),
            category: document.getElementById("issueCategory").value,
            location: document.getElementById("issueLocation").value.trim(),
            priority: document.getElementById("issuePriority").value,
            description: document.getElementById("issueDescription").value.trim(),
            date: new Date().toLocaleDateString(),
            status: "Pending"
        };

        complaints.push(newComplaint);
        saveComplaints(complaints);
        alert("Your complaint has been submitted.");
        window.location.href = "my-complaints.html";
    });
}

function showMyComplaints() {
    var table = document.getElementById("myComplaintsTable");

    if (table == null) {
        return;
    }

    var searchBox = document.getElementById("complaintSearch");

    function displayList() {
        var complaints = getComplaints();
        var search = searchBox.value.toLowerCase();
        var found = 0;
        table.innerHTML = "";

        for (var i = 0; i < complaints.length; i++) {
            var item = complaints[i];
            var titleMatches = item.title.toLowerCase().indexOf(search) != -1;

            if (item.studentEmail == student.email && titleMatches) {
                var row = "<tr>";
                row += "<td>" + safeText(item.id) + "</td>";
                row += "<td>" + safeText(item.title) + "</td>";
                row += "<td>" + safeText(item.category) + "</td>";
                row += "<td>" + safeText(item.location) + "</td>";
                row += "<td>" + safeText(item.date) + "</td>";
                row += "<td><span class='status'>" + safeText(item.status) + "</span></td>";
                row += "</tr>";
                table.innerHTML += row;
                found++;
            }
        }

        document.getElementById("noComplaints").style.display = found > 0 ? "none" : "block";
    }

    displayList();
    searchBox.addEventListener("input", displayList);
}
