import frappe

def update_price_determination_options():
    doc = frappe.get_doc("DocType", "Subscription Plan")
    
    for field in doc.fields:
        if field.fieldname == "price_determination":
            options = field.options.split("\n")
            if "Annual Rate" not in options:
                options.append("Annual Rate")
                field.options = "\n".join(options)
                doc.save()
                frappe.db.commit()
                frappe.msgprint("Option 'Annual Rate' added successfully!")
            return
