(function () {
    frappe.after_ajax(() => {
        init_custom_navbar();
    });

    frappe.router.on("change", () => {
        init_custom_navbar();
    });
})();
function init_custom_navbar() {
      if (is_administrator()) {
        return;
    }
    if ($("#custom-top-navbar").length) return;

    $(".sticky-top").hide();
    $("header.desk-header").hide();
    $(".layout-side-section").css("top", "0");
    $(".layout-main-section-wrapper").css("padding-top", "0");

    $("body").prepend(get_custom_navbar_html());

    $("#modules-toggle").on("click", function () {
        $("#modules-panel").toggleClass("open");
    });
    $(document).on("click", "#modules-panel a", function () {
        $("#modules-panel").removeClass("open");
    });
}
function get_custom_navbar_html() {
    const user =
        frappe.boot?.user?.full_name ||
        frappe.boot?.user?.name ||
        "User";

    return `
<div id="custom-top-navbar" class="custom-navbar">
  <div class="navbar-inner">

    <div class="left">
      <a href="/app" class="brand">
        <img src="${frappe.boot.app_logo_url}">
      </a>

      <div class="modules-menu">
        ${get_modules_dropdowns()}
      </div>
    </div>

    <div class="right">
      <div class="user-dropdown">
        <button class="user-btn">
          <span class="user-icon">👤</span>
          <span class="user-name">${user}</span>
        </button>

        <div class="user-menu">
          <a href="/app/user-profile">My Profile</a>
          <div class="divider"></div>
          <a href="#" class="logout-btn">Logout</a>
        </div>
      </div>
    </div>

  </div>
</div>
`;
}

function is_admin_user() {
    return frappe.user.has_role("Admin");
}
function is_administrator() {
    return (
        frappe.session.user === "Administrator" ||
        frappe.user.has_role("System Manager")
    );
}
function get_modules_dropdowns() {
    const isAdmin = is_admin_user();

    return `
${isAdmin ? `
<div class="module-dropdown">
  <button class="module-btn">Support</button>
  <div class="dropdown-menu">
    <a href="/app/plant">Plant</a>
    <a href="/app/waste-type">Waste Type</a>
    <a href="/app/reaction-agent-master">Reaction Agent Master</a>
    <a href="/app/suppliers">Supplier</a>
    <a href="/app/drying-agent-master">Drying Agent Master</a>
    <a href="/app/lab">Lab Master</a>
  </div>
</div>
` : ``}

<div class="module-dropdown">
  <button class="module-btn">Collection</button>
  <div class="dropdown-menu">
    <a href="/app/bins">Bin</a>
    <a href="/app/vehicle">Vehicle</a>
    <a href="/app/collection-trip">Collection Trip</a>
    <a href="/app/drivers">Driver</a>
  </div>
</div>

<div class="module-dropdown">
  <button class="module-btn">Manufacturing</button>
  <div class="dropdown-menu">
    <a href="/app/processing-batch">Processing Batch</a>
    <a href="/app/batch-input-waste">Batch Input Waste</a>
    <a href="/app/utility-usage">Utility Usage</a>
    <a href="/app/drying-agent">Drying Agent</a>
    <a href="/app/reaction-agent">Reaction Agent</a>
    <a href="/app/lab-test">Lab Test</a>
  </div>
</div>

<div class="module-dropdown">
  <button class="module-btn">Fertilizer</button>
  <div class="dropdown-menu">
    <a href="/app/warehouses">Warehouse</a>
    <a href="/app/bag-configuration">Bag Configuration</a>
    <a href="/app/produced-fertilizer-lot">Produced Fertilizer Lot</a>
    <a href="/app/product-listing">Product Listing</a>
    ${isAdmin ? `
    <a href="/app/sales-order">Sales Order</a>
    <a href="/app/shipping-rule">Shipping Rule</a>
    ` : ``}
  </div>
</div>

${isAdmin ? `
<div class="module-dropdown">
  <button class="module-btn">Users</button>
  <div class="dropdown-menu">
    <a href="/app/user">User List</a>
    <a href="/app/company">Company</a>
  </div>
</div>
` : ``}
`;
}


// User dropdown toggle
$(document).on("click", ".user-btn", function (e) {
    e.stopPropagation();
    $(".user-dropdown").toggleClass("open");
});

// Close when clicking outside
$(document).on("click", function () {
    $(".user-dropdown").removeClass("open");
});

$(document).on("click", ".logout-btn", function (e) {
    e.preventDefault();

    frappe.call("logout").then(() => {
        window.location.href = "/login";
    });
});

