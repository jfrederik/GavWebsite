const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
        .split(";")
        .map(cookie => cookie.split("="))
        .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value}), {});
    return cookies[key];
    },
    setItem: (key, value) => {
        document.cookie = `${key}=${value}`;
    }
};

const storageType = localStorage
const consentPropertyName = "cookieConsent"

const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {

    const acceptFn = event => {
        saveToStorage(storageType);
        consentPopup.classList.add("hidden");
    }

    const consentPopup = document.getElementById("consent-popup");
    const acceptBtn = document.getElementById("accept")
    acceptBtn.addEventListener("click", acceptFn);

    if (shouldShowPopup(storageType)) {
        consentPopup.classList.remove("hidden");
    }
};


// Check if the user has already given consent
if (!storageType.getItem('cookieConsent')) {
    // Block all cookies
    document.cookie = "cross-site-cookie=block; SameSite=Lax";
  }

  function acceptCookies() {
    // Set the cookie consent flag
    storageType.setItem('cookieConsent', true);
  
    // Delete the "block" cookie if it exists
    document.cookie = "cross-site-cookie=block; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax;";
  
    // Allow cookies to be set
    document.cookie = "cross-site-cookie=allow; SameSite=Lax";
  }

  const acceptBtn = document.getElementById("accept");
acceptBtn.addEventListener("click", acceptCookies);