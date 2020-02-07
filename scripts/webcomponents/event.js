class Event extends HTMLElement {
    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open'
            });
        }

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="../styles/bootstrap.min.css">
        <link rel="stylesheet" href="../styles/main.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
        .card-icon {
            z-index: 5;
            cursor: pointer;
        }

        .card-icon:hover {
            background: rgba(0, 0, 0, 0.25) !important;
        }

        .card.free {
            background: rgb(63, 140, 255) !important;
        }

        .card.yours {
            background: rgb(255, 178, 63) !important;
        }
        </style>
            <div class="card mb-3 mr-3 bg-dark">
                <span
                    class="pull-right w-100 position-absolute p-1 d-flex flex-row-reverse clickable close-icon">
                    <a class="card-icon text-light m-1 p-2 rounded"><i
                            class="fa fa-times"></i></a>
                    <a class="card-icon text-light m-1 p-2 rounded"><i
                            class="fa fa-pencil"></i></a>
                </span>
                <div class="row no-gutters text-light">
                    <div id="eventSchedule"
                        class="col-3 col-sm d-flex justify-content-center text-center align-content-center flex-column">
                        <div class="align-middle" id="eventStartHour">${this.getAttribute("event-start-hour")}</div>
                        <div class="align-middle">-</div>
                        <div class="align-middle" id="eventEndHour">${this.getAttribute("event-end-hour")}</div>
                    </div>
                    <div class="col-md-10 col-9 px-0">
                        <div class="card-body">
                            <p class="card-title">${this.getAttribute("event-title")}</p>
                            <p class="card-text"><small class="text-light">Booked by
                                    <a id="teacherEmail" href="mailto:${this.getAttribute("teacher-email")}"
                                        class="text-warning"><b id="teacherName">${this.getAttribute("teacher-name")}</b></a></small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        var eventActions = this.shadowRoot.querySelectorAll(".card-icon");
        var close = eventActions[0];
        var event = this;
        close.addEventListener("click", function () {
            event.remove();
        });
        var edit = eventActions[1];
        edit.addEventListener("click", function () {
            event.remove();
        });

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.shadowRoot == null) {
            return;
        }
        switch (name) {
            case "event-start-hour":
                this.shadowRoot.querySelector("#eventStartHour").innerText = newValue;
            case "event-end-hour":
                this.shadowRoot.querySelector("#eventEndHour").innerText = newValue;
            case "event-title":
                this.shadowRoot.querySelector(".card-title").innerText = newValue;
                break;
            case "teacher-email":
                this.shadowRoot.querySelector("#teacherName").innerText = newValue;
                break;
            case "teacher-name":
                this.shadowRoot.querySelector("#teacherEmail").setAttribute("href", "mailto:" + newValue);
                break;
            case "event-type":
                this.shadowRoot.querySelector(".card").className = "card mb-3 mr-3 bg-dark " + newValue;
                break;
            case "show-schedule":
                var current = this.shadowRoot.querySelector("#eventSchedule");
                var currentBrother = current.nextElementSibling;
                console.log(current);

                if (newValue != "0") {
                    current.classList.add("d-flex");
                    current.classList.remove("d-none");
                    currentBrother.classList.add("col-md-10");
                    currentBrother.classList.add("col-9");
                    currentBrother.classList.remove("col-md");
                    currentBrother.classList.remove("col");
                } else {
                    current.classList.add("d-none");
                    current.classList.remove("d-flex");
                    currentBrother.classList.remove("col-md-10");
                    currentBrother.classList.remove("col-9");
                }
                break;
        }
    }
    static get observedAttributes() {
        return ["event-start-hour", "event-end-hour", "event-title", "teacher-email", "teacher-name", "event-type", "show-schedule"];
    }
}

customElements.define("event-card", Event);