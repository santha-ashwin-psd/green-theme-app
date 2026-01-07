import frappe
from frappe import _

@frappe.whitelist()
def switch_theme(theme=None, **kwargs):

    # Handle dict payloads
    if isinstance(theme, dict):
        theme = theme.get("name") or theme.get("theme")

    # Handle kwargs
    if not theme and "theme" in kwargs:
        theme = kwargs.get("theme")

    if not theme:
        frappe.throw(_("Theme not provided"))

    # 🔥 NORMALIZE (this fixes your issue)
    theme = theme.strip().lower()

    allowed_themes = {
        "light",
        "dark",
        "automatic",
        "modern_ui_theme",
    }

    if theme not in allowed_themes:
        frappe.throw(_("Invalid theme: {0}").format(theme))

    frappe.db.set_value("User", frappe.session.user, "desk_theme", theme)
    frappe.db.commit()

    return {"status": "success", "theme": theme}
