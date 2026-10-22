const accessKey = "weddingSiteAccess";
const sitePassword = "ilovesophia";

const setAccessGranted = () => {
    try {
        sessionStorage.setItem(accessKey, "granted");
        localStorage.setItem(accessKey, "granted");
    } catch (error) {
        console.warn("Unable to save access state.", error);
    }
};

const unlockSite = () => {
    document.body.classList.remove("password-locked");
    const gate = document.body.querySelector(".password-gate");
    if (gate) {
        gate.remove();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem(accessKey) === "granted" || localStorage.getItem(accessKey) === "granted") {
        unlockSite();
        return;
    }

    document.body.classList.add("password-locked");

    const gate = document.createElement("div");
    gate.className = "password-gate";
    gate.setAttribute("aria-live", "polite");
    gate.innerHTML = `
        <div class="password-card" role="dialog" aria-modal="true" aria-labelledby="password-dialog-title">
            <p class="password-kicker">Private access</p>
            <h1 id="password-dialog-title">This site is password protected</h1>
            <p class="password-copy">Enter the password from your invitation to continue.</p>
            <form class="password-form" novalidate>
                <label for="site-password">Password</label>
                <input id="site-password" name="password" type="password" autocomplete="current-password" required>
                <p class="password-error" role="alert" aria-live="polite"></p>
                <button type="submit">Enter the site</button>
            </form>
        </div>
    `;

    const form = gate.querySelector("form");
    const input = gate.querySelector("input");
    const error = gate.querySelector(".password-error");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (input.value !== sitePassword) {
            error.textContent = "That password doesn't look right. Please try again.";
            input.value = "";
            input.focus();
            return;
        }

        setAccessGranted();
        unlockSite();
    });

    document.body.append(gate);
    input.focus();
});
