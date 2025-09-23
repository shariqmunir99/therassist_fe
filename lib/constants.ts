export const defaultNavItems = [
  {
    label: "Home",
    url: "/",
    isDropdown: false,
    dropdown: [],
  },
  {
    label: "Company",
    isDropdown: true,
    url: "",
    dropdown: [
      {
        label: "Our Mission",
        url: "/our-mission",
        isDropdown: false,
        dropdown: [],
      },
      {
        label: "Therapist Reviews",
        url: "/therapist-reviews",
        isDropdown: false,
        dropdown: [],
      },
    ],
  },
  {
    label: "Privacy",
    url: "/privacy",
    isDropdown: false,
    dropdown: [],
  },
  {
    label: "Pricing",
    url: "/pricing",
    isDropdown: false,
    dropdown: [],
  },
];

export const profilePic =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBFW1TxDfPZrZj-_ft2IP5oMDHKFwxSI97S-M0jBxQ4UPvJrTh2wiUbaY4YbFArB0Z3oWTead47Z2yCVVMKBQv3KhGfOAu5MHp-D_97j3nD9z3J-j1BV-66-wMOlu9GE6E_9scu094Ph1oTrhvVREjZ2GAgiVKvqw9jpTh0zWuGkTHs00qUxdHKKQB4PfT3mdBTnAeb3TrjBkNtWpV2J1lLx7NQyy6h42X7qgHSx1vpzHOXCBsFKB-G-mElA9TqtjCsxaHFcZCx7nk";

export const authState = {
  isAuthenticated: true,
  username: "Shariq Munir",
  email: "shariq.munir7@gmail.com",
  profilePic: profilePic,
};

export const therapistSidebar = [
  {
    title: "Dashboard",
    url: "#",
    icon: "/icons/dashboard.svg",
  },
  {
    title: "Clients",
    url: "#",
    icon: "/icons/clients.svg",
  },
  {
    title: "Sessions",
    url: "#",
    icon: "/icons/sessions.svg",
  },
  {
    title: "Notes",
    url: "#",
    icon: "/icons/notes.svg",
  },
  {
    title: "Insights",
    url: "#",
    icon: "/icons/insights.svg",
  },
];

export const settings = {
  title: "Settings",
  url: "#",
  icon: "/icons/settings.svg",
  options: [
    {
      title: "Account",
      url: "#",
    },
    {
      title: "Billing",
      url: "#",
    },
    {
      title: "Logout",
      url: "#",
    },
  ],
};
