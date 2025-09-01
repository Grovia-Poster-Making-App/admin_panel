import images from "./images";

const data = {
  user: {
    name: "Zahra Mirzaei",
    img: images.avt,
  },
  summary: [
    {
      title: "Sales",
      value: "$5.340",
      icon: "akar-icons:shopping-bag",
    },
    {
      title: "Orders",
      value: "1760",
      icon: "icon-park-outline:transaction-order", //width:48px;
    },
    {
      title: "Revenue",
      value: "$2.530",
      icon: "bi:coin",
    },
  ],
  revenueByMonths: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350],
  },
  topCustomers: {
    head: ["customer", "totalOrders", "totalSpending"],
    body: [
      {
        username: "john doe",
        order: 490,
        price: "$15,870",
      },
      {
        username: "frank iva",
        order: 250,
        price: "$12,251",
      },
      {
        username: "anthony baker",
        order: 120,
        price: "$10,840",
      },
      {
        username: "frank iva",
        order: 110,
        price: "$9,251",
      },
      {
        username: "anthony baker",
        order: 80,
        price: "$8,840",
      },
    ],
  },
  latestOrders: {
    header: ["orderID", "customer", "totalPrice", "date", "status"],
    body: [
      {
        orderId: "#OD1711",
        customer: "john doe",
        totalPrice: "$900",
        date: "17 Jun 2022",
        status: "approved",
      },
      {
        orderId: "#OD1712",
        customer: "frank iva",
        totalPrice: "$400",
        date: "1 Jun 2022",
        status: "pending",
      },
      {
        orderId: "#OD1713",
        customer: "anthony baker",
        totalPrice: "$200",
        date: "27 Jun 2021",
        status: "approved",
      },
      {
        orderId: "#OD1712",
        customer: "frank iva",
        totalPrice: "$400",
        date: "1 Jun 2022",
        status: "rejected",
      },
      {
        orderId: "#OD1713",
        customer: "anthony baker",
        totalPrice: "$200",
        date: "27 Jun 2022",
        status: "approved",
      },
    ],
  },
  templates: {
    categories: [
      "Banner 1",
      "Banner 2", 
      "Stories",
      "Special Events",
      "Welcome",
      "Motivational Dose",
      "Rank Promotions",
      "Leader's Offers",
      "Achievements",
      "Income Promotions",
      "Bonanza Promotions",
      "Greetings",
      "Thank You Post",
      "Schedule",
      "Meetings (With Photo)",
      "Meetings (Without Photo)",
      "Custom Meetings",
      "Capping"
    ],
    templates: [
      {
        id: 1,
        preview: "sample1.png",
        title: "Welcome Banner",
        category: "Welcome",
        downloads: 120,
        expiresAt: "01-10-2025"
      },
      {
        id: 2,
        preview: "sample2.png", 
        title: "Motivation Story",
        category: "Motivational Dose",
        downloads: 85,
        expiresAt: "15-09-2025"
      },
      {
        id: 3,
        preview: "sample3.png",
        title: "Special Event Flyer", 
        category: "Special Events",
        downloads: 200,
        expiresAt: "20-11-2025"
      },
      {
        id: 4,
        preview: "sample4.png",
        title: "Leadership Offer",
        category: "Leader's Offers", 
        downloads: 65,
        expiresAt: "05-12-2025"
      },
      {
        id: 5,
        preview: "sample5.png",
        title: "Achievement Badge",
        category: "Achievements",
        downloads: 150,
        expiresAt: "30-08-2025"
      },
      {
        id: 6,
        preview: "sample6.png",
        title: "Income Promotion",
        category: "Income Promotions",
        downloads: 95,
        expiresAt: "12-10-2025"
      }
    ]
  }
};

export default data;
