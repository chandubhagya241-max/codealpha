const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");

const translateButton = document.getElementById("translateButton");
const copyButton = document.getElementById("copyButton");
const swapButton = document.getElementById("swapButton");

const status = document.getElementById("status");


translateButton.addEventListener("click", async function () {

    const text = inputText.value.trim();

    if (text === "") {
        status.textContent = "Please enter some text.";
        return;
    }

    const source = sourceLanguage.value;
    const target = targetLanguage.value;

    if (source === target) {
        outputText.value = text;
        status.textContent = "Translation completed.";
        return;
    }

    status.textContent = "Translating...";
    outputText.value = "";

    try {

        const url =
            "https://api.mymemory.translated.net/get?q=" +
            encodeURIComponent(text) +
            "&langpair=" +
            source +
            "|" +
            target;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network error");
        }

        const data = await response.json();

        if (
            !data.responseData ||
            !data.responseData.translatedText
        ) {
            throw new Error("Translation not available");
        }

        outputText.value =
            data.responseData.translatedText;

        status.textContent =
            "Translation completed successfully.";

    } catch (error) {

        console.error(error);

        status.textContent =
            "Translation failed. Please try again.";

    }

});


copyButton.addEventListener("click", async function () {

    const text = outputText.value.trim();

    if (text === "") {
        status.textContent = "Nothing to copy.";
        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        status.textContent = "Translation copied!";

    } catch (error) {

        status.textContent = "Copy failed.";

    }

});


swapButton.addEventListener("click", function () {

    const oldSource = sourceLanguage.value;
    const oldTarget = targetLanguage.value;

    sourceLanguage.value = oldTarget;
    targetLanguage.value = oldSource;

    const oldInput = inputText.value;

    inputText.value = outputText.value;
    outputText.value = oldInput;

});