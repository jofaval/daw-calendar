class Event extends HTMLElement {
    connectedCallback() {
        var shadowRoot = $(this.shadowRoot);
        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open'
            });
        }

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./client/styles/bootstrap.min.css">
        <link rel="stylesheet" href="./client/styles/main.css">
        <link rel="stylesheet" href="./client/styles/events.css">
            <div class="card ${this.getAttribute("event-type")} mb-3 mr-3 bg-dark">
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
        var eventActions = shadowRoot.find(".card-icon");
        var close = eventActions.eq(0);
        var eventScope = this;
        close.on("click", function() {
            eventScope.remove();
        });
        var edit = eventActions.eq(1);
        edit.on("click", function() {
            eventScope.remove();
        });

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.shadowRoot == null) {
            return;
        }
        switch (name) {
            case "event-start-hour":
                $(this.shadowRoot).find("#eventStartHour").text(newValue);
                break;
            case "event-end-hour":
                $(this.shadowRoot).find("#eventEndHour").text(newValue);
                break;
            case "event-title":
                $(this.shadowRoot).find(".card-title").text(newValue);
                break;
            case "teacher-email":
                $(this.shadowRoot).find("#teacherName").text(newValue);
                break;
            case "teacher-name":
                $(this.shadowRoot).find("#teacherEmail").attr("href", "mailto:" + newValue);
                break;
            case "event-type":
                $(this.shadowRoot).find(".card").removeClass(oldValue);
                $(this.shadowRoot).find(".card").addClass(newValue);
                break;
            case "show-schedule":
                var current = $(this.shadowRoot).find("#eventSchedule");
                var currentBrother = current.next();
                console.log(current);

                if (newValue != "0") {
                    current.addClass("d-flex");
                    current.removeClass("d-none");
                    currentBrother.addClass("col-md-10");
                    currentBrother.addClass("col-9");
                    currentBrother.removeClass("col-md");
                    currentBrother.removeClass("col");
                } else {
                    current.addClass("d-none");
                    current.removeClass("d-flex");
                    currentBrother.add("col-md");
                    currentBrother.add("col");
                    currentBrother.removeClass("col-md-10");
                    currentBrother.removeClass("col-9");
                }
                break;
        }
    }
    static get observedAttributes() {
        return ["event-start-hour", "event-end-hour", "event-title", "teacher-email", "teacher-name", "event-type", "show-schedule"];
    }
}

customElements.define("event-card", Event);