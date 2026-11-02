function createMyProgramsHtml() {
    let html = "";

    for (const program of model.trainingPrograms) {
        if (program.userId !== model.app.loggedInUserId) continue;

        html += /*HTML*/ `
            <div class="reservation-row">
                <strong onclick="selectTrainingProgram(${program.programId})" class="link-text">
                    ${program.name}
                </strong>
                <span>${program.exercises.length} øvelser</span>
            </div>
        `;
    }

    if (html = "") {
    html = "<p>Du har ingen treningsprogram ennå.</p>";
    }

    return html;
}

function drawUserTrainingProgramPage() {
    const state = model.viewState.userTrainingProgramPage;

    const content = /*HTML*/ `
        <section class="info-box">
            <h3>Lag treningsprogram</h3>

            <p>Start en mal:</p>
            <select onchange="useTrainingTemplate(this.value)">
                <option value="">Tomt program</option>
                ${createTemplateOptionsHtml()}
            </select>

            <input
                type="text"
                placeholder="Navn på programmet"
                value="${state.programName}"
                oninput="model.viewState.userTrainingProgramPage.programName = this.value"
            />

            ${createExerciseRowsHtml()}

            <button class="wide-button" onclick="addUserExercise()">+ Legg til øvelse</button>
            <button class="wide-button" onclick="saveTrainingProgram()">Lagre program</button>
            <p>${state.message}</p>
        </section>
    `;

    return drawUserShell(content);
}

function createTemplateOptionsHtml() {
    let html = "";
    for (const template of model.trainingTemplates) {
        html += `<option value="${template.templateId}">${template.name}</option>`;
    }
    return html;
}

function createExerciseRowsHtml() {
    const exercises = model.viewState.userTrainingProgramPage.exercises;
    let html = "";

    for (let i = 0; i < exercises.length; i++) {
        const exercise = exercises[i];
        html += /*HTML*/ `
            <div class="reservation-row">
                <input type="text" placeholder="Øvelse" value="${exercise.name}"
                    oninput="model.viewState.userTrainingProgramPage.exercises[${i}].name = this.value"/>
                <input type="number" placeholder="Sett" value="${exercise.sets}"
                    oninput="model.viewState.userTrainingProgramPage.exercises[${i}].sets = this.value"/>
                <input type="number" placeholder="Reps" value="${exercise.reps}"
                    oninput="model.viewState.userTrainingProgramPage.exercises[${i}].reps = this.value"/>
                <input type="text" placeholder="Vekt (kg)" value="${exercise.weight}"
                    oninput="model.viewState.userTrainingProgramPage.exercises[${i}].weight = this.value"/>
                <button onclick="removeUserExercise(${i})">X</button>
            </div>
        `;
    }

    return html;
}


    
    