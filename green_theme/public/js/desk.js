frappe.provide("green_theme");

green_theme.init_desk_override = function () {

  // Run only on Desk
  if (frappe.get_route()[0] !== "desk") return;

  // Avoid duplicate injection
  if (document.getElementById("custom-modules-root")) return;

  // Hide default workspace content
  document.querySelectorAll(
    ".desk-page, .workspace-container, .layout-main-section"
  ).forEach(el => {
    el.style.display = "none";
  });

  const container = document.createElement("div");
  container.id = "custom-modules-root";
  container.innerHTML = `
    <div class="modules-grid">
      <div class="module-card">
        <div class="module-header">Support Module</div>
        <ul>
          <li><a href="/app/plant">Plant</a></li>
          <li><a href="/app/waste-type">Waste Type</a></li>
          <li><a href="/app/reaction-agent-master">Reaction Agent</a></li>
        </ul>
      </div>
    </div>
  `;

  const page = document.querySelector(".page-container");
  page?.prepend(container);
};

frappe.router.on("change", () => {
  setTimeout(green_theme.init_desk_override, 100);
});
