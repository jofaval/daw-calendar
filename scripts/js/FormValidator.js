class FormValidator {
    validateForm(formName, form) {
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

    validate(validationParams, inputs) {
        if (!Array.isArray(validationParams)) {
            return false;
        }
        validationParams.forEach(validationInfo => {
            var currentInput = inputs[validationInfo["fieldName"]];
            var currentInputVal = currentInput.val();
            var rulesToExecute = validationInfo["rules"].split(",");

            rulesToExecute.array.forEach(validationRule => {
                if (eval(validationRule)(currentInputVal)) {
                    currentInput.removeClass("error");
                } else {
                    currentInput.addClass("error");
                    return false;
                }
            });
        });

        return true;
    }

    validateSignUp(form) {
        var rules = [{
                "fieldName": "name",
                "rules": "noEmpty,name",
            },
            {
                "fieldName": "username",
                "rules": "noEmpty,username",
            },
            {
                "fieldName": "image",
                "rules": "noEmpty,image",
            },
            {
                "fieldName": "password",
                "rules": "noEmpty,password",
            },
            {
                "fieldName": "email",
                "rules": "noEmpty,email",
            },
        ];
        var inputs = {
            "name": form.find("#inputName"),
            "username": form.find("#inputUsername"),
            "image": form.find("#inputImage"),
            "password": form.find("#inputPassword"),
            "email": form.find("#inputEmail"),
        };
        Validator.validate(rules, inputs);
    }

    validateSignIn(form) {
        var rules = [{
                "fieldName": "name",
                "rules": "noEmpty,name",
            },
            {
                "fieldName": "username",
                "rules": "noEmpty,username",
            },
        ];
        var inputs = {
            "name": form.find("#inputName"),
            "username": form.find("#inputUsername"),
        };
        Validator.validate(rules, inputs);
    }
}