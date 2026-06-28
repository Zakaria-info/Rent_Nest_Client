export const tenantBookings = [
  {
    id: "BK-1001",
    propertyName: "Lakeview Family Apartment",
    bookingDate: "2026-06-12",
    amountPaid: "$1,450",
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
  },
  {
    id: "BK-1002",
    propertyName: "Downtown Studio Loft",
    bookingDate: "2026-06-18",
    amountPaid: "$920",
    bookingStatus: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    id: "BK-1003",
    propertyName: "Northside Garden Home",
    bookingDate: "2026-06-21",
    amountPaid: "$1,780",
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
  },
];

export const tenantFavorites = [
  {
    id: "FV-201",
    propertyName: "Sunset Villa",
    location: "Austin, TX",
    rent: "$2,250",
    rentType: "Monthly",
    propertyType: "Villa",
  },
  {
    id: "FV-202",
    propertyName: "City Center Apartment",
    location: "Dallas, TX",
    rent: "$1,350",
    rentType: "Monthly",
    propertyType: "Apartment",
  },
  {
    id: "FV-203",
    propertyName: "Quiet Suburban Duplex",
    location: "Plano, TX",
    rent: "$1,700",
    rentType: "Monthly",
    propertyType: "Duplex",
  },
];

export const ownerProperties = [
  {
    id: "PR-301",
    title: "Lakeview Family Apartment",
    location: "Austin, TX",
    propertyType: "Apartment",
    rent: "$1,450",
    rentType: "Monthly",
    bedrooms: 3,
    bathrooms: 2,
    status: "Approved",
  },
  {
    id: "PR-302",
    title: "Downtown Studio Loft",
    location: "Dallas, TX",
    propertyType: "Studio",
    rent: "$920",
    rentType: "Monthly",
    bedrooms: 1,
    bathrooms: 1,
    status: "Pending",
  },
  {
    id: "PR-303",
    title: "Northside Garden Home",
    location: "Plano, TX",
    propertyType: "House",
    rent: "$1,780",
    rentType: "Monthly",
    bedrooms: 4,
    bathrooms: 3,
    status: "Rejected",
  },
];

export const ownerBookingRequests = [
  {
    id: "RQ-401",
    tenantName: "Maya Carter",
    tenantEmail: "maya@example.com",
    propertyName: "Lakeview Family Apartment",
    propertyLocation: "Austin, TX",
    bookingAmount: "$1,450",
    status: "Pending",
  },
  {
    id: "RQ-402",
    tenantName: "James Wilson",
    tenantEmail: "james@example.com",
    propertyName: "Downtown Studio Loft",
    propertyLocation: "Dallas, TX",
    bookingAmount: "$920",
    status: "Pending",
  },
  {
    id: "RQ-403",
    tenantName: "Nora Lee",
    tenantEmail: "nora@example.com",
    propertyName: "Lakeview Family Apartment",
    propertyLocation: "Austin, TX",
    bookingAmount: "$1,450",
    status: "Confirmed",
  },
];

export const monthlyEarnings = [
  { month: "Jul", earnings: 1200 },
  { month: "Aug", earnings: 1800 },
  { month: "Sep", earnings: 1450 },
  { month: "Oct", earnings: 2400 },
  { month: "Nov", earnings: 2100 },
  { month: "Dec", earnings: 2780 },
  { month: "Jan", earnings: 3200 },
  { month: "Feb", earnings: 2900 },
  { month: "Mar", earnings: 3650 },
  { month: "Apr", earnings: 4100 },
  { month: "May", earnings: 3850 },
  { month: "Jun", earnings: 4680 },
];

export const adminUsers = [
  {
    id: "US-501",
    name: "Avery Bennett",
    email: "avery@example.com",
    role: "Tenant",
    status: "Active",
  },
  {
    id: "US-502",
    name: "Riley Stone",
    email: "riley@example.com",
    role: "Owner",
    status: "Active",
  },
  {
    id: "US-503",
    name: "Morgan Shah",
    email: "morgan@example.com",
    role: "Admin",
    status: "Active",
  },
];

export const adminBookings = [
  {
    id: "AB-601",
    tenant: "Maya Carter",
    property: "Lakeview Family Apartment",
    owner: "Riley Stone",
    amount: "$1,450",
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
  },
  {
    id: "AB-602",
    tenant: "James Wilson",
    property: "Downtown Studio Loft",
    owner: "Riley Stone",
    amount: "$920",
    bookingStatus: "Pending",
    paymentStatus: "Unpaid",
  },
];

export const transactions = [
  {
    id: "TR-701",
    bookingId: "BK-1001",
    paidBy: "Maya Carter",
    amount: "$1,450",
    method: "Card",
    status: "Successful",
    date: "2026-06-12",
  },
  {
    id: "TR-702",
    bookingId: "BK-1003",
    paidBy: "Nora Lee",
    amount: "$1,780",
    method: "Bank Transfer",
    status: "Successful",
    date: "2026-06-21",
  },
];
