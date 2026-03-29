document.addEventListener("DOMContentLoaded", function () {
  function setLoading(isLoading) {
    const buttonSpan = document.querySelector(".btn-magic span");
    if (isLoading) {
      buttonSpan.innerHTML = "Gerando Background ...";
    } else {
      buttonSpan.innerHTML = "Gerar Background Mágico";
    }
  }

  function applyGeneratedPreview(html, css) {
    const preview = document.getElementById("preview-section");
    preview.style.display = "block";
    preview.innerHTML = html;
    const previousStyle = document.getElementById("dynamic-style");
    if (previousStyle) previousStyle.remove();
    if (css) {
      const styleElement = document.createElement("style");
      styleElement.id = "dynamic-style"; // mesmo id para localizar e remover na próxima vez
      styleElement.textContent = css;
      document.head.appendChild(styleElement);
    }
  }

  const form = document.querySelector(".form-group");
  const textarea = document.getElementById("description");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const description = textarea.value.trim();
    if (!description) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://luiz123456teste.app.n8n.cloud/webhook/593bd9d6-991d-4651-b2a1-ff9156f78ce5",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
          }),
        },
      );
      const data = await response.json();
      const hmtlCode = document.getElementById("html-code");
      const cssCode = document.getElementById("css-code");
      hmtlCode.textContent = data.html || "";
      cssCode.textContent = data.css || "";
      applyGeneratedPreview(data.html, data.css);
    } catch (error) {
      console.log("Erro ao gerar o fundo:", err);
      htmlCode.textContent = "Não consegui gerar o HTML. Tente novamente.";
      cssCode.textContent = "Não consegui gerar o CSS. Tente novamente.";
      preview.innerHTML = "";
    } finally {
      setLoading(false);
    }
  });
});
