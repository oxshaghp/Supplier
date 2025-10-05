export interface WorkingHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

export interface AdditionalPhone {
  id: number;
  type: string;
  number: string;
  name: string;
}

export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  location: { lat: number; lng: number };
  workingHours: WorkingHours;
  status: "active" | "inactive" | string;
  specialServices: string[];
  isMainBranch: boolean;
};

export interface FormData {
  businessName: "";
  category: "";
  description: "";
  services: [];
  contactEmail: "";
  contactPhone: "";
  website: "";
  address: "";
  mainPhone: "";
  businessType: "";
  categories: [];
  productKeywords: [];
  targetCustomers: [];
  serviceDistance: 0;
  additionalPhones: [];
  workingHours: {
    monday: { open: ""; close: ""; closed: false };
    tuesday: { open: ""; close: ""; closed: false };
    wednesday: { open: ""; close: ""; closed: false };
    thursday: { open: ""; close: ""; closed: false };
    friday: { open: ""; close: ""; closed: false };
    saturday: { open: ""; close: ""; closed: false };
    sunday: { open: ""; close: ""; closed: false };
  };
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Errors {
  [key: string]: string;
}

export interface CompleteProfileFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  selectedLocation: Location;
}
