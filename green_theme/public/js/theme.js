frappe.provide("frappe.ui");

frappe.ui.ThemeSwitcher = class CustomThemeSwitcher extends frappe.ui.ThemeSwitcher {
  fetch_themes() {
    return new Promise((resolve) => {
      this.themes = [
        {
          name: "light",
          label: "Frappe Light",
          info: "Light Theme",
        },
        {
          name: "dark",
          label: "Timeless Night",
          info: "Dark Theme",
        },
        {
          name: "modern_ui_theme", 
          label: "Green Theme",
          info: "Modern Green UI",
        },
        {
          name: "automatic",
          label: "Automatic",
          info: "Use System Theme",
        },
      ];

      resolve(this.themes);
    });
  }
};

