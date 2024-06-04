export const menuItemsData = [
    {
        title: "Home",
        url: "/",
    },
    {
        title: "Settings",
        url: "/settings",
        submenu: [
            {
                title: "Config",
                url: "config",
                submenu: [
                    {
                        title: "FAQ",
                        url: "faq"
                    },
                ],
            },
            {
                title: "Users",
                url: "users",
            },
        ],
    },
    {
        title: "About",
        url: "/about",
    },
];