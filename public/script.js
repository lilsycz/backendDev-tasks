const list = document.getElementById("list");
const msg = document.getElementById("msg");
const form = document.getElementById("form");

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

async function load() {
  const res = await fetch("/materials");
  const data = await res.json();
  list.innerHTML = data.map((m) => `
        <tr>
            <td>${esc(m.name)}</td>
            <td>${esc(m.category)}</td>
            <td>${esc(m.density_kg_m3)}</td>
            <td>${esc(m.youngs_modulus_gpa)}</td>
            <td><button data-id="${m.id}">Delete</button></td>
        </tr>`).join("");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = new FormData(form);
  const num = (v) => (v === "" ? null : Number(v));
  const body = {
    name: f.get("name"),
    category: f.get("category") || null,
    density_kg_m3: num(f.get("density_kg_m3")),
    youngs_modulus_gpa: num(f.get("youngs_modulus_gpa")),
  };
  const res = await fetch("/materials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  msg.textContent = res.ok ? "" : data.error;
  if (res.ok) {form.reset();}
  load();
});

list.addEventListener("click", async (e) => {
  if (!e.target.dataset.id) {return;}
  const res = await fetch(`/materials/${e.target.dataset.id}`, { method: "DELETE" });
  const data = await res.json();
  msg.textContent = res.ok ? "" : data.error;
  load();
});

load();