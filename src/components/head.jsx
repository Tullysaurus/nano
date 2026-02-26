const Head = function () {
    const getTopDocument = () => {
        try {
            if (window.top && window.top !== window.self && window.top.document) {
                return window.top.document;
            }
        } catch {}

        return null;
    };

    const setDocumentTitle = (doc, title) => {
        if (doc) {
            doc.title = title;
        }
    };

    const setDocumentFavicon = (doc, href) => {
        if (!doc) {
            return;
        }

        let favicon = doc.querySelector("link[rel='icon']");
        if (!favicon) {
            favicon = doc.createElement("link");
            favicon.setAttribute("rel", "icon");
            doc.head.appendChild(favicon);
        }
        favicon.href = href;
    };

    const resolveIconURL = (icon) => {
        try {
            return new URL(icon || "/logo.svg", window.location.origin).href;
        } catch {
            return new URL("/logo.svg", window.location.origin).href;
        }
    };

    useChange(this.theme, () => {
        document.body.dataset.theme = this.theme;
        localStorage.setItem("@nano/theme", this.theme);
    });

    useChange(this.cloakTitle, () => {
        const topDocument = getTopDocument();
        const title = this.cloakTitle || "nano.";

        if (this.cloakTitle) {
            document.title = this.cloakTitle;
        } else {
            document.title = "nano.";
        }
        setDocumentTitle(topDocument, title);
        localStorage.setItem("@nano/cloak/title", this.cloakTitle);
    });

    useChange(this.cloakIcon, () => {
        const topDocument = getTopDocument();
        const icon = resolveIconURL(this.cloakIcon);

        setDocumentFavicon(window.document, icon);
        setDocumentFavicon(topDocument, icon);
        localStorage.setItem("@nano/cloak/icon", this.cloakIcon);
    });

    return <div></div>;
};

export default Head;
