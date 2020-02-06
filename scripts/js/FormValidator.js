class FormValidator {
    validate(formName, form) {
        switch (key) {
            case "signup":
                this.validateSignUp(form);
                break;
            case "signin":
                this.validateSignIn(form);
                break;
            case "classroom":
                this.validateClassroom(form);
                break;
            case "schedule":
                this.validateSchedule(form);
                break;

            default:
                break;
        }
    }

    validateSignUp(form) {

    }

    validateSignIn(form) {

    }

    validateClassroom(form) {

    }

    validateSchedule(form) {

    }
}