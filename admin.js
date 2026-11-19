
var admin = checkLogin("admin");

if (admin != null) {
    var welcome = document.getElementById("adminWelcome");
    var topName = document.getElementById("adminTopName");

    if (welcome != null) {
        welcome.textContent = "Welcome, " + admin.name;
    }

    if (topName != null) {
        topName.textContent = admin.name;
    }

    var logoutButton = document.getElementById("adminLogout");

    if (logoutButton != null) {
        logoutButton.addEventListener("click", logout);
    }

    showAdminDashboard();
    showAllComplaints();
}

function showAdminDashboard() {
    var table = document.getElementById("adminRecentTable");

    if (table == null) {
        return;
    }

    var complaints = getComplaints();
    document.getElementById("adminTotal").textContent = complaints.length;
    document.getElementById("adminPending").textContent = countAdminStatus(complaints, "Pending");
    document.getElementById("adminProgress").textContent = countAdminStatus(complaints, "In Progress");
    document.getElementById("adminResolved").textContent = countAdminStatus(complaints, "Resolved");

    table.innerHTML = "";

    for (var i = complaints.length - 1; i >= 0 && i >= complaints.length - 5; i--) {
        var row = "<tr>";
        row += "<td>" + safeText(complaints[i].id) + "</td>";
        row += "<td>" + safeText(complaints[i].studentName) + "</td>";
        row += "<td>" + safeText(complaints[i].title) + "</td>";
        row += "<td>" + safeText(complaints[i].category) + "</td>";
        row += "<td><span class='status'>" + safeText(complaints[i].status) + "</span></td>";
        row += "</tr>";
        table.innerHTML += row;
    }

    if (complaints.length > 0) {
        document.getElementById("adminNoComplaints").style.display = "none";
    }
}

function countAdminStatus(list, status) {
    var count = 0;

    for (var i = 0; i < list.length; i++) {
        if (list[i].status == status) {
            count++;
        }
    }

    return count;
}

function showAllComplaints() {
    var table = document.getElementById("manageComplaintsTable");

    if (table == null) {
        return;
    }

    var searchBox = document.getElementById("adminSearch");

    function displayComplaints() {
        var complaints = getComplaints();
        var search = searchBox.value.toLowerCase();
        var found = 0;
        table.innerHTML = "";

        for (var i = 0; i < complaints.length; i++) {
            var item = complaints[i];
            var idMatch = item.id.toLowerCase().indexOf(search) != -1;
            var titleMatch = item.title.toLowerCase().indexOf(search) != -1;

            if (idMatch || titleMatch) {
                var row = document.createElement("tr");
                row.innerHTML = "<td>" + safeText(item.id) + "</td>" +
                    "<td>" + safeText(item.studentName) + "</td>" +
                    "<td>" + safeText(item.title) + "</td>" +
                    "<td>" + safeText(item.location) + "</td>";

                var statusCell = document.createElement("td");
                var statusSelect = document.createElement("select");
                statusSelect.id = "status" + i;

                var options = ["Pending", "In Progress", "Resolved"];

                for (var j = 0; j < options.length; j++) {
                    var option = document.createElement("option");
                    option.value = options[j];
                    option.textContent = options[j];

                    if (item.status == options[j]) {
                        option.selected = true;
                    }

                    statusSelect.appendChild(option);
                }

                statusCell.appendChild(statusSelect);
                row.appendChild(statusCell);

                var buttonCell = document.createElement("td");
                var updateButton = document.createElement("button");
                updateButton.textContent = "Update";
                updateButton.className = "button";
                updateButton.addEventListener("click", function () {
                    updateStatus(this.getAttribute("data-number"));
                });
                updateButton.setAttribute("data-number", i);
                buttonCell.appendChild(updateButton);
                row.appendChild(buttonCell);

                table.appendChild(row);
                found++;
            }
        }

        document.getElementById("adminEmptyMessage").style.display = found > 0 ? "none" : "block";
    }

    displayComplaints();
    searchBox.addEventListener("input", displayComplaints);
}

function updateStatus(number) {
    var complaints = getComplaints();
    var selectedStatus = document.getElementById("status" + number).value;

    complaints[number].status = selectedStatus;
    saveComplaints(complaints);
    alert("Complaint status updated.");
    showAllComplaints();
}
