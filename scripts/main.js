const sectionCache = {};

function loadAllSections() {
    const sectionNames = [
        "about_me",
        "professional_summary",
        "professional_experience",
        "skills",
        "education",
        "ash_bookshelf",
        "creative_persuits",
        "contact_me"
    ];

    sectionNames.forEach(name => {
        fetch(`sections/${name}.html`)
            .then(response => response.text())
            .then(data => {
                sectionCache[name] = data;
                const container = document.getElementById(`${name}-container`);
                if (container) {
                    container.innerHTML = data;
                }
            });
    });
}

function loadSection(sectionName) {
    history.pushState(null, null, `#${sectionName}`);

    document.querySelectorAll('.section-wrapper').forEach(div => {
        div.style.display = "none";
    });

    const container = document.getElementById(`${sectionName}-container`);
    if (container) {
        container.style.display = "block";
        attachCollapsibleEventListeners(sectionName);
        container.scrollIntoView({ behavior: "smooth" });
    } else {
        console.error(`No container found for section ${sectionName}`);
    }
}

function updateActiveTab(sectionName) {
    let tabs = document.getElementsByClassName('tab');
    for (let tab of tabs) {
        tab.classList.remove('active');
        if (tab.getAttribute('onclick').includes(sectionName)) {
            tab.classList.add('active');
        }
    }
}

function attachCollapsibleEventListeners(sectionName) {
    const collapsibleButtons = document.querySelectorAll(`#${sectionName}-container .collapsible`);
    collapsibleButtons.forEach(button => {
        const content = button.nextElementSibling;
        content.style.display = "none";
        button.addEventListener('click', function () {
            this.classList.toggle('active-collapsible');
            content.style.display = (content.style.display === "none" || content.style.display === "") ? "block" : "none";
        });
    });
}

window.addEventListener('popstate', function() {
    const sectionName = location.hash ? location.hash.substring(1) : 'professional_summary';
    loadSection(sectionName);
});

document.addEventListener('DOMContentLoaded', () => {
    loadAllSections();
    const sectionName = location.hash ? location.hash.substring(1) : 'professional_summary';
    setTimeout(() => loadSection(sectionName), 300);
});
