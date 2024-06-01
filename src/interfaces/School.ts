import { ContactInfo } from "./ContactInfo";
import { Invoice } from "./Invoice";

export interface School {
  id: string;
  name: string;
  type: string;
  products: string[];
  county: string;
  registration_date: string;
  contact_info: ContactInfo;
  school_balance: number;
  invoices: Invoice[];
}

export interface SchoolData {
  schools: School[];
}
