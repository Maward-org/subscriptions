import frappe

def execute():
    # الحصول على البيانات الوصفية للـ Subscription Plan
    meta = frappe.get_meta("Subscription Plan")

    # البحث عن الحقل price_determination
    field = meta.get_field("price_determination")

    if field:
        options = field.options.split("\n")

        # إضافة "Annual Rate" إذا لم يكن موجودًا
        if "Annual Rate" not in options:
            options.append("Annual Rate")

            # تحديث القيم في قاعدة البيانات
            frappe.db.set_value("DocField", {"parent": "Subscription Plan", "fieldname": "price_determination"}, "options", "\n".join(options))

            # تحديث الكاش
            frappe.clear_cache()
            frappe.msgprint("تمت إضافة خيار 'Annual Rate' إلى price_determination بنجاح!")
