frappe.ui.form.on('Subscription Plan', {
    custom_annual_subscription: function(frm) {
        if (frm.doc.custom_annual_subscription) {
            frm.set_value('billing_interval', 'Month');
            // frm.set_df_property('billing_interval', 'read_only', 1);
            frm.set_value('price_determination', 'Monthly Rate');
            frm.set_value('billing_interval_count', 1);
            // frm.set_df_property('billing_interval_count', 'read_only', 1);
            frm.set_df_property('price_determination', 'reqd', 0);
            frm.set_df_property('cost', 'read_only', 1);

            if (frm.doc.custom_annual_cost) {
                frm.set_value('cost', (frm.doc.custom_annual_cost / 12).toFixed(2));
            }
        } else {
            frm.set_df_property('billing_interval', 'read_only', 0);
            frm.set_df_property('billing_interval_count', 'read_only', 0);
            frm.set_df_property('price_determination', 'reqd', 1);
            frm.set_df_property('cost', 'read_only', 0);

            frm.set_value('cost', '');
        }
    },

    custom_annual_cost: function(frm) {
        if (frm.doc.custom_annual_subscription && frm.doc.custom_annual_cost) {
            frm.set_value('cost', (frm.doc.custom_annual_cost / 12).toFixed(2));
        } else {
            frm.set_value('cost', '');
        }
    },
        after_save: function(frm) {
        frm.set_df_property('custom_annual_cost', 'read_only', 1);
        frm.set_df_property('cost', 'read_only', 1);
    }
});
