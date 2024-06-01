import { ContactInfo } from "./ContactInfo";
import { Invoice } from "./Invoice";
import { Collection } from "./Collection";

export interface School {
  id: Key | null | undefined;
  name: string;
  type: string;
  products: string[];
  county: string;
  registration_date: string;
  contact_info: ContactInfo;
  school_balance: number;
  invoices: Invoice[];
  collections: Collection[];
}

export interface SchoolData {
  [x: string]: any;
  schools: School[];
}
