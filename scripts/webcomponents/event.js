class Event extends HTMLElement {
    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open'
            });
        }

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="../styles/bootstrap.min.css">
            <div class="card mb-3 mr-3 bg-dark">
                <span
                    class="pull-right w-100 position-absolute p-1 d-flex flex-row-reverse clickable close-icon">
                    <a class="card-icon text-light m-1 p-2 rounded"><i
                            class="fa fa-times"></i></a>
                    <a class="card-icon text-light m-1 p-2 rounded"><i
                            class="fa fa-pencil"></i></a>
                </span>
                <div class="row no-gutters text-light">
                    <div
                        class="col-3 col-sm d-flex justify-content-center text-center align-content-center flex-column">
                        <div class="align-middle" id="eventStartHour">` + this.getAttribute("event-start-hour") + `</div>
                        <div class="align-middle">-</div>
                        <div class="align-middle" id="eventEndHour">` + this.getAttribute("event-end-hour") + `</div>
                    </div>
                    <div class="col-md-10 col-9 px-0">
                        <div class="card-body">
                            <p class="card-title">` + this.getAttribute("event-title") + `</p>
                            <p class="card-text"><small class="text-light">Booked by
                                    <a id="teacherEmail" href="mailto:` + this.getAttribute("teacher-email") + `"
                                        class="text-warning"><b id="teacherName">` + this.getAttribute("teacher-name") + `</b></a></small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        console.log($(this).find(".card-icon"));

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
        }
    }
    static get observedAttributes() {
        return ["event-start-hour", "event-end-hour", "event-title", "teacher-email", "teacher-name"];
    }
}

customElements.define("event-card", Event);