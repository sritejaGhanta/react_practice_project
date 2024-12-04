export default {
    auth: {
        login: "/api/auth/customer-loign",
    },
    customer: {
        identity: "/api/company/customer-identity",
        update: "/api/company/update-customer-profile",
        update_password: "api/auth/customer-change-password"
    },
    users: {
        add: "/api/user/user-add",
        autocomplete: "/api/user/user-autocomplete",
        change_status: "/api/user/user-change-status",
        delete: "/api/user/user-delete",
        details: "/api/user/user-details",
        list: "/api/user/user-list",
        update: "/api/user/user-update",
    }
}