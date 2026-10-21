/* =====================================================
   STUDENT LIFE OS - MAIN JAVASCRIPT
===================================================== */

let currentDate = new Date();
let zIndex = 20;

document.addEventListener("DOMContentLoaded", function () {

    updateClock();
    setInterval(updateClock, 1000);

    loadNotes();
    loadTheme();
    loadWallpaper();

    displayAssignments();
    displayAttendance();

    // IMPORTANT: Start the account/page system
    setupAccountScreen();

});


/* =====================================================
   PAGE 1 → PAGE 2
===================================================== */

function startStudentOS() {

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const accountScreen =
        document.getElementById("accountScreen");

    const desktop =
        document.getElementById("desktop");

    if (welcomeScreen) {
        welcomeScreen.style.display = "none";
    }

    if (accountScreen) {
        accountScreen.style.display = "flex";
    }

    if (desktop) {
        desktop.style.display = "none";
    }
}


/* =====================================================
   ACCOUNT SCREEN
===================================================== */

function setupAccountScreen() {

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const accountScreen =
        document.getElementById("accountScreen");

    const profileScreen =
        document.getElementById("profileScreen");

    const passwordScreen =
        document.getElementById("passwordScreen");

    const loginScreen =
        document.getElementById("loginScreen");

    const desktop =
        document.getElementById("desktop");

    // Hide all secondary screens first

    if (accountScreen)
        accountScreen.style.display = "none";

    if (profileScreen)
        profileScreen.classList.remove("show");

    if (passwordScreen)
        passwordScreen.classList.remove("show");

    if (loginScreen)
        loginScreen.classList.remove("show");

    if (desktop)
        desktop.style.display = "none";


    /*
       FIRST VISIT:
       Show Page 1
    */

    const hasAccount =
        localStorage.getItem("studentLifeStarted");

    if (hasAccount === "true") {

        // Account already exists.
        // Show Page 1 first.
        if (welcomeScreen)
            welcomeScreen.style.display = "flex";

    } else {

        // New user
        if (welcomeScreen)
            welcomeScreen.style.display = "flex";

    }
}


/* =====================================================
   CREATE ACCOUNT
===================================================== */

function createNewAccount() {

    const accountScreen =
        document.getElementById("accountScreen");

    const profileScreen =
        document.getElementById("profileScreen");

    const passwordScreen =
        document.getElementById("passwordScreen");

    const loginScreen =
        document.getElementById("loginScreen");

    if (accountScreen)
        accountScreen.style.display = "none";

    if (passwordScreen)
        passwordScreen.classList.remove("show");

    if (loginScreen)
        loginScreen.classList.remove("show");

    if (profileScreen)
        profileScreen.classList.add("show");
}


/* =====================================================
   SHOW LOGIN SCREEN
===================================================== */

function showLoginScreen() {

    const accountScreen =
        document.getElementById("accountScreen");

    const loginScreen =
        document.getElementById("loginScreen");

    const loginWelcome =
        document.getElementById("loginWelcome");

    const name =
        localStorage.getItem("studentName");


    if (!localStorage.getItem("studentLifeStarted")) {

        alert("No account found. Please create an account first.");

        return;
    }


    if (accountScreen)
        accountScreen.style.display = "none";


    if (name && loginWelcome) {

        loginWelcome.innerText =
            "Welcome back, " + name + " 👋";

    }


    if (loginScreen)
        loginScreen.classList.add("show");
}


/* =====================================================
   PROFILE → PASSWORD
===================================================== */

function showPasswordScreen() {

    const nameInput =
        document.getElementById("studentName");
    const emailInput =
        document.getElementById("studentEmail");
    const courseInput =
        document.getElementById("studentCourse");

    const profileScreen =
        document.getElementById("profileScreen");

    const passwordScreen =
        document.getElementById("passwordScreen");


    if (!nameInput || !courseInput ||
        !profileScreen || !passwordScreen) {

        console.log("Profile elements not found");
        return;
    }


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const course =
        courseInput.value;


    if (name === "") {

        alert("Please enter your name.");

        nameInput.focus();

        return;
    }
      if (email === "") {
     
        alert("Please enter your email address.");
       
        emailInput.focus();
    
        return;
    }

    localStorage.setItem(
        "studentName",
        name
    );
    localStorage.setItem(
        "studentEmail",
        email
    );
    localStorage.setItem(
        "studentCourse",
        course
    );


    profileScreen.classList.remove("show");

    passwordScreen.classList.add("show");
}


/* =====================================================
   SAVE STUDENT PROFILE
===================================================== */

function saveStudentProfile() {

    const passwordInput =
        document.getElementById("studentPassword");

    const confirmInput =
        document.getElementById("confirmPassword");

    const passwordScreen =
        document.getElementById("passwordScreen");

    const desktop =
        document.getElementById("desktop");


    if (!passwordInput || !confirmInput)
        return;


    const password =
        passwordInput.value;

    const confirmPassword =
        confirmInput.value;


    if (password.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;
    }


    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return;
    }


    localStorage.setItem(
        "studentPassword",
        password
    );

    localStorage.setItem(
        "studentLifeStarted",
        "true"
    );


    if (passwordScreen)
        passwordScreen.classList.remove("show");


    if (desktop)
        desktop.style.display = "block";


    passwordInput.value = "";
    confirmInput.value = "";


    alert(
        "Profile created successfully! 🎉"
    );
}


/* =====================================================
   LOGIN
===================================================== */

function loginStudent() {

    const passwordInput =
        document.getElementById("loginPassword");

    const error =
        document.getElementById("loginError");

    const loginScreen =
        document.getElementById("loginScreen");

    const desktop =
        document.getElementById("desktop");


    if (!passwordInput || !error)
        return;


    const password =
        passwordInput.value;

    const savedPassword =
        localStorage.getItem("studentPassword");


    if (!savedPassword) {

        error.innerText =
            "No student profile found.";

        return;
    }


    if (password === "") {

        error.innerText =
            "Please enter your password.";

        return;
    }


    if (password !== savedPassword) {

        error.innerText =
            "❌ Incorrect password. Try again.";

        passwordInput.value = "";

        return;
    }


    error.innerText = "";


    if (loginScreen)
        loginScreen.classList.remove("show");


    if (desktop)
        desktop.style.display = "block";


    passwordInput.value = "";


    alert(
        "Login successful! 🎉"
    );
}


/* =====================================================
   APPLICATION WINDOWS
===================================================== */

function openApp(appId) {

    const app =
        document.getElementById(appId);

    if (!app) {

        console.log(
            "App not found:",
            appId
        );

        return;
    }


    app.style.display = "block";

    app.style.zIndex = ++zIndex;


    addRunningApp(appId);


    if (appId === "calendarWindow")
        generateCalendar();

    if (appId === "assignmentWindow")
        displayAssignments();

    if (appId === "attendanceWindow")
        displayAttendance();

    if (appId === "notesWindow")
        loadNotes();
}


function closeApp(appId) {

    const app =
        document.getElementById(appId);

    if (app) {

        app.style.display = "none";

        app.classList.remove("maximized");
    }


    removeRunningApp(appId);
}


function minimizeApp(appId) {

    const app =
        document.getElementById(appId);

    if (app)
        app.style.display = "none";
}


function maximizeApp(appId) {

    const app =
        document.getElementById(appId);

    if (!app)
        return;

    app.classList.toggle("maximized");

    app.style.zIndex = ++zIndex;
}


/* =====================================================
   BRING WINDOW TO FRONT
===================================================== */

document.addEventListener("click", function (event) {

    const windowElement =
        event.target.closest(".app-window");

    if (windowElement) {

        windowElement.style.zIndex =
            ++zIndex;
    }

});


/* =====================================================
   RUNNING APPLICATIONS
===================================================== */

function addRunningApp(appId) {

    const runningApps =
        document.getElementById("runningApps");

    if (!runningApps)
        return;


    if (
        document.querySelector(
            `[data-app="${appId}"]`
        )
    ) {
        return;
    }


    const appButton =
        document.createElement("button");

    appButton.className =
        "running-app";

    appButton.dataset.app =
        appId;


    const appNames = {

        notesWindow: "📝 Notes",

        calendarWindow: "📅 Calendar",

        assignmentWindow: "📚 Assignments",

        attendanceWindow: "📊 Attendance",

        calculatorWindow: "🧮 Calculator",

        musicWindow: "🎵 Music",

        fileWindow: "📂 Files",

        notificationWindow: "🔔 Notifications",

        settingsWindow: "⚙️ Settings",

        recycleWindow: "🗑️ Recycle Bin"

    };


    appButton.innerText =
        appNames[appId] || appId;


    appButton.onclick = function () {

        const app =
            document.getElementById(appId);

        if (!app)
            return;


        if (app.style.display === "none") {

            app.style.display = "block";

            app.style.zIndex = ++zIndex;

        } else {

            app.style.display = "none";

        }

    };


    runningApps.appendChild(appButton);
}


function removeRunningApp(appId) {

    const button =
        document.querySelector(
            `[data-app="${appId}"]`
        );

    if (button)
        button.remove();
}


/* =====================================================
   NOTES
===================================================== */

function saveNotes() {

    const notesElement =
        document.getElementById("notesText");

    if (!notesElement)
        return;


    localStorage.setItem(
        "studentLifeNotes",
        notesElement.value
    );


    const message =
        document.getElementById("saveMessage");

    if (message) {

        message.innerText =
            "✓ Notes saved successfully!";

        setTimeout(function () {

            message.innerText = "";

        }, 2500);

    }
}


function loadNotes() {

    const notesElement =
        document.getElementById("notesText");

    if (!notesElement)
        return;


    const savedNotes =
        localStorage.getItem(
            "studentLifeNotes"
        );


    if (savedNotes !== null)
        notesElement.value = savedNotes;
}


function clearNotes() {

    const notesElement =
        document.getElementById("notesText");

    if (!notesElement)
        return;


    notesElement.value = "";

    localStorage.removeItem(
        "studentLifeNotes"
    );


    const message =
        document.getElementById("saveMessage");

    if (message)
        message.innerText = "Notes cleared.";
}


/* =====================================================
   CALENDAR
===================================================== */

function generateCalendar() {

    const monthYear =
        document.getElementById("monthYear");

    const calendarGrid =
        document.getElementById("calendarGrid");


    if (!monthYear || !calendarGrid)
        return;


    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    const monthNames = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];


    monthYear.innerText =
        `${monthNames[month]} ${year}`;


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const totalDays =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    calendarGrid.innerHTML = "";


    for (let i = 0; i < firstDay; i++) {

        const empty =
            document.createElement("div");

        calendarGrid.appendChild(empty);
    }


    const today =
        new Date();


    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const dateElement =
            document.createElement("div");

        dateElement.className =
            "calendar-date";

        dateElement.innerText =
            day;


        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            dateElement.classList.add("today");

        }


        dateElement.onclick =
            function () {

                alert(
                    `Selected date: ${day} ${monthNames[month]} ${year}`
                );

            };


        calendarGrid.appendChild(
            dateElement
        );
    }
}


function previousMonth() {

    currentDate.setMonth(
        currentDate.getMonth() - 1
    );

    generateCalendar();
}


function nextMonth() {

    currentDate.setMonth(
        currentDate.getMonth() + 1
    );

    generateCalendar();
}


/* =====================================================
   ASSIGNMENTS
===================================================== */

function addAssignment() {

    const nameElement =
        document.getElementById(
            "assignmentName"
        );

    const subjectElement =
        document.getElementById(
            "assignmentSubject"
        );

    const dateElement =
        document.getElementById(
            "assignmentDate"
        );

    const priorityElement =
        document.getElementById(
            "assignmentPriority"
        );


    if (
        !nameElement ||
        !subjectElement ||
        !dateElement ||
        !priorityElement
    )
        return;


    const name =
        nameElement.value.trim();

    const subject =
        subjectElement.value.trim();

    const date =
        dateElement.value;

    const priority =
        priorityElement.value;


    if (
        name === "" ||
        subject === "" ||
        date === ""
    ) {

        alert(
            "Please enter assignment name, subject and date."
        );

        return;
    }


    const assignments =
        JSON.parse(
            localStorage.getItem(
                "studentAssignments"
            )
        ) || [];


    assignments.push({

        id: Date.now(),

        name,

        subject,

        date,

        priority

    });


    localStorage.setItem(
        "studentAssignments",
        JSON.stringify(assignments)
    );


    nameElement.value = "";
    subjectElement.value = "";
    dateElement.value = "";


    displayAssignments();
}


function displayAssignments() {

    const list =
        document.getElementById(
            "assignmentList"
        );


    if (!list)
        return;


    const assignments =
        JSON.parse(
            localStorage.getItem(
                "studentAssignments"
            )
        ) || [];


    list.innerHTML = "";


    if (assignments.length === 0) {

        list.innerHTML =
            "<p>No assignments yet.</p>";

        return;
    }


    assignments.forEach(function (item) {

        const div =
            document.createElement("div");

        div.className =
            "assignment-item";


        div.innerHTML = `

            <h3>${escapeHTML(item.name)}</h3>

            <p>
                📖 Subject:
                ${escapeHTML(item.subject)}
            </p>

            <p>
                📅 Due:
                ${escapeHTML(item.date)}
            </p>

            <p>
                ⚡ Priority:
                ${escapeHTML(item.priority)}
            </p>

            <button
                onclick="deleteAssignment(${item.id})">
                Delete
            </button>

        `;


        list.appendChild(div);

    });
}


function deleteAssignment(id) {

    let assignments =
        JSON.parse(
            localStorage.getItem(
                "studentAssignments"
            )
        ) || [];


    assignments =
        assignments.filter(
            item => item.id !== id
        );


    localStorage.setItem(
        "studentAssignments",
        JSON.stringify(assignments)
    );


    displayAssignments();
}


/* =====================================================
   ATTENDANCE
===================================================== */

function addAttendance() {

    const subjectElement =
        document.getElementById(
            "subjectName"
        );

    const presentElement =
        document.getElementById(
            "presentClasses"
        );

    const totalElement =
        document.getElementById(
            "totalClasses"
        );


    if (
        !subjectElement ||
        !presentElement ||
        !totalElement
    )
        return;


    const subject =
        subjectElement.value.trim();

    const present =
        Number(presentElement.value);

    const total =
        Number(totalElement.value);


    if (
        subject === "" ||
        total <= 0 ||
        present < 0 ||
        present > total
    ) {

        alert(
            "Please enter valid attendance details."
        );

        return;
    }


    const attendance =
        JSON.parse(
            localStorage.getItem(
                "studentAttendance"
            )
        ) || [];


    attendance.push({

        id: Date.now(),

        subject,

        present,

        total

    });


    localStorage.setItem(
        "studentAttendance",
        JSON.stringify(attendance)
    );


    subjectElement.value = "";
    presentElement.value = "";
    totalElement.value = "";


    displayAttendance();
}


function displayAttendance() {

    const list =
        document.getElementById(
            "attendanceList"
        );


    if (!list)
        return;


    const attendance =
        JSON.parse(
            localStorage.getItem(
                "studentAttendance"
            )
        ) || [];


    list.innerHTML = "";


    if (attendance.length === 0) {

        list.innerHTML =
            "<p>No attendance records yet.</p>";

        return;
    }


    attendance.forEach(function (item) {

        const percentage =
            (item.present / item.total) * 100;


        const div =
            document.createElement("div");


        div.className =
            "attendance-item";


        const statusClass =
            percentage >= 75
                ? "attendance-good"
                : "attendance-warning";


        div.innerHTML = `

            <h3>
                ${escapeHTML(item.subject)}
            </h3>

            <p>
                Present:
                ${item.present}/${item.total}
            </p>

            <p class="${statusClass}">
                ${percentage.toFixed(1)}%
            </p>

            <button
                class="secondary-btn"
                onclick="deleteAttendance(${item.id})">
                Delete
            </button>

        `;


        list.appendChild(div);

    });
}


function deleteAttendance(id) {

    let attendance =
        JSON.parse(
            localStorage.getItem(
                "studentAttendance"
            )
        ) || [];


    attendance =
        attendance.filter(
            item => item.id !== id
        );


    localStorage.setItem(
        "studentAttendance",
        JSON.stringify(attendance)
    );


    displayAttendance();
}


/* =====================================================
   CALCULATOR
===================================================== */

function calculatorInput(value) {

    const display =
        document.getElementById(
            "calculatorDisplay"
        );

    if (!display)
        return;


    display.value += value;
}


function clearCalculator() {

    const display =
        document.getElementById(
            "calculatorDisplay"
        );

    if (display)
        display.value = "";
}


function deleteCalculator() {

    const display =
        document.getElementById(
            "calculatorDisplay"
        );

    if (!display)
        return;


    display.value =
        display.value.slice(0, -1);
}


function calculateResult() {

    const display =
        document.getElementById(
            "calculatorDisplay"
        );


    if (!display)
        return;


    try {

        let expression =
            display.value;


        if (!expression)
            return;


        if (
            !/^[0-9+\-*/().%\s]+$/.test(
                expression
            )
        ) {

            display.value = "Error";
            return;
        }


        expression =
            expression.replace(
                /%/g,
                "/100"
            );


        const result =
            Function(
                `"use strict"; return (${expression})`
            )();


        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            display.value = "Error";
            return;
        }


        display.value =
            Number.isInteger(result)
                ? result
                : result
                    .toFixed(6)
                    .replace(/0+$/, "")
                    .replace(/\.$/, "");

    }

    catch {

        display.value = "Error";

    }
}


/* =====================================================
   SETTINGS
===================================================== */

function changeTheme(theme) {

    const desktop =
        document.getElementById("desktop");

    if (!desktop)
        return;


    const themes = [
        "blue",
        "purple",
        "dark",
        "green"
    ];


    themes.forEach(function (item) {

        desktop.classList.remove(
            "theme-" + item
        );

    });


    if (themes.includes(theme)) {

        desktop.classList.add(
            "theme-" + theme
        );


        localStorage.setItem(
            "studentLifeTheme",
            theme
        );

    }
}


function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "studentLifeTheme"
        );


    if (savedTheme)
        changeTheme(savedTheme);
}


function resetSettings() {

    localStorage.removeItem(
        "studentLifeTheme"
    );

    localStorage.removeItem(
        "studentWallpaper"
    );


    const desktop =
        document.getElementById(
            "desktop"
        );


    if (desktop) {

        desktop.classList.remove(
            "theme-blue",
            "theme-purple",
            "theme-dark",
            "theme-green"
        );

    }


    loadWallpaper();


    alert(
        "Settings have been reset."
    );
}


/* =====================================================
   WALLPAPER
===================================================== */

function changeWallpaper(image) {

    const desktop =
        document.querySelector(".desktop");


    if (!desktop)
        return;


    desktop.style.backgroundImage =
        `url("wallpaper/${image}")`;


    desktop.style.backgroundSize =
        "cover";


    desktop.style.backgroundPosition =
        "center";


    desktop.style.backgroundRepeat =
        "no-repeat";


    localStorage.setItem(
        "studentWallpaper",
        image
    );
}


function loadWallpaper() {

    const savedWallpaper =
        localStorage.getItem(
            "studentWallpaper"
        );


    changeWallpaper(
        savedWallpaper || "space.jpg"
    );
}


/* =====================================================
   START MENU
===================================================== */

function toggleStartMenu() {

    const menu =
        document.getElementById(
            "startMenu"
        );


    if (!menu)
        return;


    menu.style.display =
        menu.style.display === "block"
            ? "none"
            : "block";
}


document.addEventListener(
    "click",
    function (event) {

        const menu =
            document.getElementById(
                "startMenu"
            );

        const startButton =
            document.querySelector(
                ".start-button"
            );


        if (
            menu &&
            startButton &&
            !menu.contains(event.target) &&
            !startButton.contains(event.target)
        ) {

            menu.style.display =
                "none";

        }

    }
);


/* =====================================================
   SEARCH
===================================================== */

function openSearch() {

    const search =
        prompt(
            "What would you like to open?"
        );


    if (!search)
        return;


    const text =
        search.toLowerCase();


    const apps = {

        note: "notesWindow",
        notes: "notesWindow",

        calendar: "calendarWindow",

        assignment: "assignmentWindow",
        assignments: "assignmentWindow",

        attendance: "attendanceWindow",

        calculator: "calculatorWindow",

        music: "musicWindow",

        file: "fileWindow",
        files: "fileWindow",

        setting: "settingsWindow",
        settings: "settingsWindow",

        notification: "notificationWindow",
        notifications: "notificationWindow",

        recycle: "recycleWindow"

    };


    for (const keyword in apps) {

        if (text.includes(keyword)) {

            openApp(apps[keyword]);

            return;
        }

    }


    alert("App not found.");
}


/* =====================================================
   SYSTEM ICONS
===================================================== */

function showWifi() {

    alert(
        "📶 Wi-Fi\nConnected"
    );
}


function showVolume() {

    alert(
        "🔊 Volume\nSystem volume is active."
    );
}


function showBattery() {

    alert(
        "🔋 Battery\nBattery information will be added later."
    );
}


/* =====================================================
   PROFILE
===================================================== */

function showProfile() {

    const name =
        localStorage.getItem(
            "studentName"
        ) || "Student";


    const course =
        localStorage.getItem(
            "studentCourse"
        ) || "Not specified";


    alert(
        "👤 Student Profile\n\n" +
        "Name: " + name + "\n" +
        "Course: " + course
    );
}


/* =====================================================
   SHUTDOWN
===================================================== */

function shutdown() {

    const desktop =
        document.getElementById(
            "desktop"
        );


    if (!desktop)
        return;


    desktop.style.transition =
        "filter 0.5s ease";


    desktop.style.filter =
        "brightness(0)";


    setTimeout(function () {

        alert(
            "Student Life OS has been shut down."
        );


        desktop.style.filter =
            "brightness(1)";

    }, 500);
}


/* =====================================================
   RECYCLE BIN
===================================================== */

function emptyRecycleBin() {

    alert(
        "Recycle Bin is already empty."
    );
}


/* =====================================================
   LIVE CLOCK
===================================================== */

function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );


    if (!clock)
        return;


    const now =
        new Date();


    let hours =
        now.getHours();


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");


    const ampm =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    clock.innerText =
        `${hours}:${minutes}:${seconds} ${ampm}`;
}


/* =====================================================
   DRAGGABLE WINDOWS
===================================================== */

let draggedWindow = null;
let offsetX = 0;
let offsetY = 0;


document.addEventListener(
    "mousedown",
    function (event) {

        const header =
            event.target.closest(
                ".window-header"
            );


        if (!header)
            return;


        const windowElement =
            header.closest(
                ".app-window"
            );


        if (!windowElement)
            return;


        if (
            windowElement.classList.contains(
                "maximized"
            )
        ) {
            return;
        }


        draggedWindow =
            windowElement;


        const rect =
            windowElement.getBoundingClientRect();


        offsetX =
            event.clientX - rect.left;


        offsetY =
            event.clientY - rect.top;


        windowElement.style.zIndex =
            ++zIndex;


        header.style.cursor =
            "grabbing";


        event.preventDefault();

    }
);


document.addEventListener(
    "mousemove",
    function (event) {

        if (!draggedWindow)
            return;


        let newLeft =
            event.clientX - offsetX;


        let newTop =
            event.clientY - offsetY;


        const maxLeft =
            Math.max(
                0,
                window.innerWidth -
                draggedWindow.offsetWidth
            );


        const maxTop =
            Math.max(
                0,
                window.innerHeight -
                draggedWindow.offsetHeight -
                60
            );


        newLeft =
            Math.max(
                0,
                Math.min(
                    newLeft,
                    maxLeft
                )
            );


        newTop =
            Math.max(
                0,
                Math.min(
                    newTop,
                    maxTop
                )
            );


        draggedWindow.style.left =
            newLeft + "px";


        draggedWindow.style.top =
            newTop + "px";

    }
);


document.addEventListener(
    "mouseup",
    function () {

        if (!draggedWindow)
            return;


        const header =
            draggedWindow.querySelector(
                ".window-header"
            );


        if (header) {

            header.style.cursor =
                "move";

        }


        draggedWindow = null;

    }
);


/* =====================================================
   LOGOUT
===================================================== */

function logoutStudent() {

    const desktop =
        document.getElementById(
            "desktop"
        );

    const loginScreen =
        document.getElementById(
            "loginScreen"
        );


    if (desktop)
        desktop.style.display = "none";


    if (loginScreen)
        loginScreen.classList.add("show");
}


/* =====================================================
   RESET ACCOUNT
===================================================== */

function resetAccount() {

    const confirmReset =
        confirm(
            "Delete your Student Life OS account?"
        );


    if (!confirmReset)
        return;


    localStorage.removeItem("studentName");
    localStorage.removeItem("studentCourse");
    localStorage.removeItem("studentPassword");
    localStorage.removeItem("studentLifeStarted");


    location.reload();
}


/* =====================================================
   HTML SAFETY
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
// ===============================
// DRAG DESKTOP ICONS + SAVE POSITION
// ===============================

const icons = document.querySelectorAll(".app-icon");
const iconArea = document.querySelector(".desktop-icons");

icons.forEach((icon, index) => {

    icon.style.position = "absolute";

    // Load saved position
    const savedPosition = localStorage.getItem("icon-" + index);

    if (savedPosition) {
        const position = JSON.parse(savedPosition);
        icon.style.left = position.left + "px";
        icon.style.top = position.top + "px";
    } else {
        // Default position
        icon.style.left = "20px";
        icon.style.top = `${20 + index * 100}px`;
    }

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    icon.addEventListener("mousedown", function (e) {

        isDragging = true;

        const iconRect = icon.getBoundingClientRect();

        offsetX = e.clientX - iconRect.left;
        offsetY = e.clientY - iconRect.top;

        icon.classList.add("dragging");

        e.preventDefault();
    });

    document.addEventListener("mousemove", function (e) {

        if (!isDragging) return;

        const areaRect = iconArea.getBoundingClientRect();

        let x = e.clientX - areaRect.left - offsetX;
        let y = e.clientY - areaRect.top - offsetY;

        x = Math.max(
            0,
            Math.min(x, iconArea.clientWidth - icon.offsetWidth)
        );

        y = Math.max(
            0,
            Math.min(y, iconArea.scrollHeight - icon.offsetHeight)
        );

        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
    });

    document.addEventListener("mouseup", function () {

        if (isDragging) {

            isDragging = false;
            icon.classList.remove("dragging");

            // Save position
            const position = {
                left: parseInt(icon.style.left),
                top: parseInt(icon.style.top)
            };

            localStorage.setItem(
                "icon-" + index,
                JSON.stringify(position)
            );
        }
    });
});
function clearNotifications() {

    localStorage.setItem(
        "notificationsCleared",
        "true"
    );

    const notificationWindow =
        document.getElementById("notificationWindow");

    if (!notificationWindow)
        return;

    const notifications =
        notificationWindow.querySelectorAll(".notification-item");

    notifications.forEach(function(notification) {
        notification.remove();
    });
}
function loadNotifications() {

    const cleared =
        localStorage.getItem("notificationsCleared");

    if (cleared !== "true")
        return;

    const notificationWindow =
        document.getElementById("notificationWindow");

    if (!notificationWindow)
        return;

    const notifications =
        notificationWindow.querySelectorAll(".notification-item");

    notifications.forEach(function(notification) {
        notification.remove();
    });
}

loadNotifications();
function addNotification(message) {

    let notifications =
        JSON.parse(
            localStorage.getItem("studentNotifications")
        ) || [];

    notifications.push(message);

    localStorage.setItem(
        "studentNotifications",
        JSON.stringify(notifications)
    );

    displayNotifications();
}document
function displayNotifications() {

    const notificationWindow =
        document.getElementById("notificationWindow");

    if (!notificationWindow)
        return;

    const windowContent =
        notificationWindow.querySelector(".window-content");

    if (!windowContent)
        return;

    const clearButton =
        windowContent.querySelector(
            ".clear-notifications-btn"
        );

    document
        .querySelectorAll(
            "#notificationWindow .dynamic-notification"
        )
        .forEach(function(notification) {
            notification.remove();
        });

    const notifications =
        JSON.parse(
            localStorage.getItem("studentNotifications")
        ) || [];

    notifications.forEach(function(message) {

        const notification =
            document.createElement("div");

        notification.className =
            "notification-item dynamic-notification";

        notification.innerText =
            message;

        windowContent.insertBefore(
            notification,
            clearButton
        );
    });
}
