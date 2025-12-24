
async function postJSON(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body && body.message ? body.message : "Request failed";
    throw new Error(msg);
  }
  return body;
}

function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

async function calcBMI() {
  const height_cm = Number(document.getElementById("bmi_height").value);
  const weight_kg = Number(document.getElementById("bmi_weight").value);
  const out = document.getElementById("bmi_out");
  out.textContent = "Calculating...";
  try {
    const result = await postJSON("/api/bmi", { height_cm, weight_kg });
    out.textContent = pretty(result);
  } catch (e) {
    out.textContent = "Error: " + e.message;
  }
}

async function calcBMR() {
  const sex = document.getElementById("bmr_sex").value;
  const age_years = Number(document.getElementById("bmr_age").value);
  const height_cm = Number(document.getElementById("bmr_height").value);
  const weight_kg = Number(document.getElementById("bmr_weight").value);
  const activity_level = document.getElementById("bmr_activity").value;
  const out = document.getElementById("bmr_out");
  out.textContent = "Calculating...";
  try {
    const result = await postJSON("/api/bmr", { sex, age_years, height_cm, weight_kg, activity_level });
    out.textContent = pretty(result);
  } catch (e) {
    out.textContent = "Error: " + e.message;
  }
}

async function calcWHtR() {
  const waist_cm = Number(document.getElementById("whtr_waist").value);
  const height_cm = Number(document.getElementById("whtr_height").value);
  const out = document.getElementById("whtr_out");
  out.textContent = "Calculating...";
  try {
    const result = await postJSON("/api/whtr", { waist_cm, height_cm });
    out.textContent = pretty(result);
  } catch (e) {
    out.textContent = "Error: " + e.message;
  }
}

async function convLength() {
  const value = Number(document.getElementById("len_value").value);
  const from = document.getElementById("len_from").value;
  const to = document.getElementById("len_to").value;
  const out = document.getElementById("len_out");
  out.textContent = "Converting...";
  try {
    const result = await postJSON("/api/convert/length", { value, from, to });
    out.textContent = pretty(result);
  } catch (e) {
    out.textContent = "Error: " + e.message;
  }
}
