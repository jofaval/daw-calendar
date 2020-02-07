class EventWeek extends HTMLElement {
    connectedCallback() {
        var shadowRoot = $(this.shadowRoot);
        if (!shadowRoot) {
            this.attachShadow({
                mode: 'open'
            });
        }

        shadowRoot.html(`
        <link rel="stylesheet" href="../styles/bootstrap.min.css">
        <link rel="stylesheet" href="../styles/main.css">
        <link rel="stylesheet" href="../styles/events.css">
        <div class="card picked bg-dark rounded p-3">
            <p class="event-title m-0">Climate change lecture</p>
        </div>
        `);
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
        }
    }

    static get observedAttributes() {
        return ["event-title"];
    }
}

customElements.define("event-week", EventWeek);