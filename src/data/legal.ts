// PLACEHOLDER — every number and date below must be replaced with the details on the real certificates
// (and `file` pointed at the scanned PDF in /public) before this page goes live.
export type LegalDocument = {
  title: string;
  issuer: string;
  kind: "Registration" | "Licence" | "Tax" | "Membership" | "Insurance";
  number: string;
  issued: string;
  validUntil: string;
  file: string;
};

export const legalDocuments: LegalDocument[] = [
  { title: "Company Registration Certificate", issuer: "Office of the Company Registrar, Government of Nepal", kind: "Registration", number: "000000/067/068", issued: "2010", validUntil: "Permanent", file: "#" },
  { title: "Tour Operator Licence", issuer: "Department of Tourism, Government of Nepal", kind: "Licence", number: "0000", issued: "2010", validUntil: "Renewed annually", file: "#" },
  { title: "Trekking Agency Licence", issuer: "Department of Tourism, Government of Nepal", kind: "Licence", number: "0000", issued: "2012", validUntil: "Renewed annually", file: "#" },
  { title: "PAN / VAT Registration", issuer: "Inland Revenue Department, Nepal", kind: "Tax", number: "000000000", issued: "2010", validUntil: "Permanent", file: "#" },
  { title: "TAAN Membership", issuer: "Trekking Agencies' Association of Nepal", kind: "Membership", number: "0000", issued: "2012", validUntil: "Renewed annually", file: "#" },
  { title: "NMA Membership", issuer: "Nepal Mountaineering Association", kind: "Membership", number: "0000", issued: "2014", validUntil: "Renewed annually", file: "#" },
  { title: "Nepal Tourism Board Registration", issuer: "Nepal Tourism Board", kind: "Registration", number: "0000", issued: "2010", validUntil: "Renewed annually", file: "#" },
  { title: "Staff & Guide Insurance", issuer: "Licensed Nepali insurer", kind: "Insurance", number: "0000000", issued: "2026", validUntil: "Renewed annually", file: "#" },
];

export const verifySteps = [
  { title: "Department of Tourism", text: "Search the register of licensed tour operators and trekking agencies by company name.", href: "https://tourismdepartment.gov.np" },
  { title: "TAAN member directory", text: "Every member agency is listed with its registered address and licence number.", href: "https://www.taan.org.np" },
  { title: "Ask us for the originals", text: "Visit our Kamaladi office and we'll show you every certificate in person.", href: "/contact" },
];
