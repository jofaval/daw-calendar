class EventWeek extends HTMLElement {
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
        <div class="card bg-dark rounded p-3 ${this.getAttribute("event-type")}">
            <p class="event-title m-0">${this.getAttribute("event-title")}</p>
        </div>
        `;
        var eventActions = shadowRoot.find(".card-icon");
        var close = eventActions.eq(0);
        var eventScope = this;
        close.on("click", function () {
            eventScope.remove();
        });

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.shadowRoot == null) {
            return;
        }
        switch (name) {
            case "event-title":
                $(this.shadowRoot).find(".event-title").text(newValue);
                break;
            case "event-type":
                $(this.shadowRoot).find(".card").removeClass(newValue);
                $(this.shadowRoot).find(".card").addClass(newValue);
                break;
        }
    }

    static get observedAttributes() {
        return ["event-title", "event-type"];
    }
}

customElements.define("event-week", EventWeek);