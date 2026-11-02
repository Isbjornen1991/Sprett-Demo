function addTemplateExercise() {
    const state = model.viewState.adminTrainingTemplatePage;
    const name = state.newExerciseName.trim();
    if (name === "") return;

    state.exercises.push(name);
    state.newExerciseName = "";
    updateView();
}

function removeTemplateExercise(index) {
    model.viewState.adminTrainingTemplatePage.exercises.splice(index, 1);
    updateView();
}

function startEditTemplate(templateId) {
    const state = model.viewState.adminTrainingTemplatePage;

    for (const template of model.trainingTemplates) {
        if (template.templateId === templateId) {
            state.editingTemplateId = templateId;
            state.templateName = template.name;
            state.exercises = [...template.exercises];
        }
    }
    updateView();
}

function saveTrainingTemplate() {
    const state = model.viewState.adminTrainingTemplatePage;
    const name = state.templateName.trim();
    if (name === "" || state.exercises.length === 0) return;

    if (state.editingTemplateId === null) {
        let newId = 0;
        for (const template of model.trainingTemplates) {
            if (template.templateId >= newId) newId = template.templateId + 1;
        }
        model.trainingTemplates.push({templateId: newId, name: name, exercises: state.exercises});
    } else {
        for (const template of model.trainingTemplates) {
            if (template.templateId === state.editingTemplateId) {
                template.name = name;
                template.exercises = state.exercises;
            }
        }
    }

    state.templateName = "";
    state.exercises = [];
    state.editingTemplateId = null;
    updateView();
}

function deleteTrainingTemplate(templateId) {
    if (confirm("Er du sikker på at du vil slette malen?")) return;

    model.trainingTemplates = model.trainingTemplates.filter((t) => t.templateId !== templateId);
    updateView();
}