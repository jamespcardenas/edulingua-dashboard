// ======================================
// EduLingua Dashboard
// Part 1
// ======================================

const TOTAL_MODULES = 6;
const ACHIEVEMENTS = 3;
const MAX_GRADE = 25;
const PASS_GRADE = 15;

let students = JSON.parse(localStorage.getItem("edulinguaStudents")) || [];

// -----------------------------
// Save
// -----------------------------

function saveStudents() {
    localStorage.setItem(
        "edulinguaStudents",
        JSON.stringify(students)
    );
}

// -----------------------------
// Form
// -----------------------------

const form = document.getElementById("studentForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const student = {

        id: Date.now(),

        name:
            document.getElementById("studentName").value,

        language:
            document.getElementById("language").value,

        level:
            document.getElementById("level").value,

        teacher:
            document.getElementById("teacher").value,

        credits:
            parseInt(document.getElementById("credits").value),

        modules: createModules()

    };

    students.push(student);

    saveStudents();

    renderStudents();

    form.reset();

    document.getElementById("credits").value = 10;

});


// -----------------------------
// Create Modules
// -----------------------------

function createModules() {

    let modules = [];

    for (let i = 1; i <= TOTAL_MODULES; i++) {

        modules.push({

            title: "Module " + i,

            unlocked: i === 1,

            lessonDate: "",

            lessonNotes: "",

            achievements: [false, false, false],

            testDate: "",

            grade: 0,

            percentage: 0,

            testNotes: "",

            paid: false

        });

    }

    return modules;

}

// -----------------------------
// Search
// -----------------------------

document
.getElementById("search")
.addEventListener("input", renderStudents);


// -----------------------------
// Badge Colors
// -----------------------------

function badgeClass(level){

    return "level-" + level;

}

// -----------------------------
// Average Grade
// -----------------------------

function averageGrade(student){

    let total = 0;

    let count = 0;

    student.modules.forEach(module=>{

        if(module.grade>0){

            total += module.grade;

            count++;

        }

    });

    if(count===0){

        return 0;

    }

    return (total/count).toFixed(1);

}

// -----------------------------
// Progress
// -----------------------------

function progress(student){

    let completed = 0;

    student.modules.forEach(module=>{

        if(module.grade>=PASS_GRADE){

            completed++;

        }

    });

    return Math.round(

        completed / TOTAL_MODULES * 100

    );

}
