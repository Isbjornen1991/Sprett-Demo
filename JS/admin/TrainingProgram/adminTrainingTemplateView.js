function drawAdminTrainingTemplates() {
    const state = model.viewState.adminTrainingTemplatePage;

    const content = /*HTML*/ `
        <div class="adminCard">
            <h2>${state.editingTemplateId === null ? "Ny treningsmal" : "Rediger mal"}</h2>
            <input type="text" placeholder="Navn på mal" value="${state.templateName}"
                oninput="model.viewState.adminTrainingTemplatePage.templateName = this.value"/>
            
            ${createTemplateExerciseListHtml()}

            <input type="text" placeholder="Ny øvelse" value="${state.newExerciseName}"
                oninput="model.viewState.adminTrainingTemplatePage.newExerciseName = this.value"/>
            <button onclick="addTemplateExercise()">Legg til øvelse</button>
            <button onclick="saveTrainingTemplate()">Lagre mal</button>
        </div>

        <div class="adminCard">
            <h2>Alle maler</h2>
            ${createTemplateListHtml()}
        </div>
    `;

    return drawAdminShell(content);
}

function createTemplateExerciseListHtml() {
    const exercises = model.viewState.adminTrainingTemplatePage.exercises;
    let html = "";

    for (let i = 0; i < exercises.length; i++) {
        html += /*HTML*/ `
            <div class="subSection roomRow">
                <span>${exercises[i]}</span>
                <button onclick="removeTemplateExercise(${i})">X</button>
            </div>
        `;
    }
    return html;
}

function createTemplateListHtml() {
    let html = "";

    for (const template of model.trainingTemplates) {
        html += /*HTML*/ `
            <div class="subSection roomRow">
                <span>${template.name} (${template.exercises-length} øvelser)</span>
                <div class="actionButtons">
                    <button onclick="startEditTemplate(${template.templateId})">✎</button>
                    <button onclick="deleteTrainingTemplate(${template.templateId})">X</button>
                </div>
            </div>
        `;
    }

    if (html === "") html = "<p>Ingen maler ennå.</p>";
    return html;
}