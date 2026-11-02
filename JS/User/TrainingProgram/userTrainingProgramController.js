function useTrainingTemplate(templateId) {
    const state = model.viewState.userTrainingProgramPage;
    state.exercises = [];

    for (const template of model.trainingTemplates) {
        if (String(template.templateId) === templateId) {
            state.programName = template.name;
            for (const name of template.exercises) {
                state.exercises.push({name: name, sets: "", reps: "", weight: ""});
            }
        }
    }
    updateView();
}
function addUserExercise() {
    model.viewState.userTrainingProgramPage.exercises.push({name: "", sets: "", reps: "",  weight: ""});
    updateView();
}

function removeUserExercise(index) {
    model.viewState.userTrainingProgramPage.exercises.splice(index, 1);
    updateView();
}

function saveTrainingProgram() {
    const state = model.viewState.userTrainingProgramPage;
    const name = state.programName.trim();

    if (name === "" || state.exercises.length === 0) {
        state.message = "Programmet må ha et navn og minst en øvelse.";
        updateView();
        return;
    }

    let newId = 0;
    for (const program of model.trainingPrograms) {
        if (program.programId >= newId) newId = program.programId + 1;
    }

    model.trainingPrograms.push({
        programId: newId,
        userId: model.app.loggedInUserId,
        name: name,
        exercises: state.exercises,
    });

    state.programName = "";
    state.exercises = [];
    state.message = "";
    navigateTo("userProfileHome");
}

function selectTrainingProgram(programId) {
    model.viewState.userTrainingProgramPage.selectedProgramId = programId;
    updateView();
}