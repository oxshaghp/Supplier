import { FormData } from "./types";

export const initialFormData: FormData = {
  businessName: "Metro Electronics Supply",
  category: "",
  categories: [],
  description: "",
  services: [],
  contactEmail: "info@metroelectronics.com",
  contactPhone: "+966 50 123 4567",
  website: "",
  address: "",
  mainPhone: "",
  businessType: "",
  productKeywords: [],
  targetCustomers: [],
  serviceDistance: 0,
  additionalPhones: [],
  workingHours: {
    monday: { open: "09:00", close: "17:00", closed: false },
    tuesday: { open: "09:00", close: "17:00", closed: false },
    wednesday: { open: "09:00", close: "17:00", closed: false },
    thursday: { open: "09:00", close: "17:00", closed: false },
    friday: { open: "09:00", close: "17:00", closed: false },
    saturday: { open: "10:00", close: "16:00", closed: false },
    sunday: { open: "10:00", close: "16:00", closed: true },
  },
};
