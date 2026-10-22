const accessKey = "weddingSiteAccess";
const sitePassword = "seals";

if (sessionStorage.getItem(accessKey) === "granted") {
    document.documentElement.classList.add("wedding-access");
} else {
    document.documentElement.classList.add("password-locked");

    document.addEventListener("DOMContentLoaded", () => {
        const gate = document.createElement("main");
        gate.className = "password-gate";
        gate.innerHTML = `
            <form class="password-card">
                <h1>Welcome</h1>
                <label for="site-password">Password</label>
                <input id="site-password" name="password" type="password" autocomplete="current-password" required>
                <p class="password-error" role="alert" aria-live="polite"></p>
                <button type="submit">Enter the site</button>
            </form>
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

            sessionStorage.setItem(accessKey, "granted");
            document.documentElement.classList.remove("password-locked");
            document.documentElement.classList.add("wedding-access");
            gate.remove();
        });

        document.body.append(gate);
        input.focus();
    }, { once: true });
}
