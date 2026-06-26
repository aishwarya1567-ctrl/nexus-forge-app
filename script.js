async function sendMessage() {
  const inputBox = document.getElementById("input");
  const outputBox = document.getElementById("output");

  const message = inputBox.value.trim();

  if (!message) {
    alert("Please enter a question!");
    return;
  }

  outputBox.innerHTML = "⏳ Thinking...";

  try {
    const res = await fetch("/api/staff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    if (data.error) {
      outputBox.innerHTML = `❌ ${data.error}`;
    } else {
      outputBox.innerHTML = `<strong>Response:</strong><br>${data.reply}`;
    }

  } catch (err) {
    outputBox.innerHTML = "❌ Failed to connect to server";
  }
}

function fillExample(text) {
  document.getElementById("input").value = text;
}
