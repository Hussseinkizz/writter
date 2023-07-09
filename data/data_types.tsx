// * types and interfaces defining our data models in UI_data.tsx
// each interface or type in plural such as banks can be a table in database if code-first approach is taken or use an ORM like prisma!

type img_url = string;
type workRequestStatus = "pending" | "success" | "failed";
type paymentStatus = "pending" | "completed" | "failed";
type paymentMode = "online" | "cash" | "cheque" | "card";
type evidenceType = "image" | "audio" | "video" | "other";

export interface $Bank {
  id: string; // uuid
  bank_name: string;
  slogan: string;
  description: string;
}

// Note - The bailiff images apparently have any type but in production it should be a string of the image url
export interface $Bailiff {
  id: string; // uuid
  email: string;
  password: string;
  bailiff_rating: number;
  bailiff_name: string;
  bailiff_image_url: img_url;
  phone_number: string;
  tin_number: number;
  company_doc_url: string;
  trading_license_image_url: img_url;
  highcourt_license_image_url: img_url;
  // more info, can be extracted separately
  portfolio: string;
  retrived: string;
  collectedThisWeek: string;
  collectedLastWeek: string;
  recoveryRate: string;
  bio: string;
}

export interface $BankBailiffJoin {
  id: string;
  bankId: string; // references $Bank.id
  bailiffId: string; // references $Bailiff.id
}

export interface $BailiffBankJoin {
  id: string;
  bailiffId: string; // references $Bailiff.id
  bankId: string; // references $Bank.id
}

export interface $Client {
  id: string; // uuid
  client_name: string;
  contact: number;
  location: string;
  outstanding_amount: number;
  current_outstanding: number;
}

export interface $BankClientJoin {
  id: string;
  bankId: string; // references $Bank.id
  clientId: string; // references $Client.id
}

export interface $BailiffClientJoin {
  id: string;
  bailiffId: string; // references $Bailiff.id
  clientId: string; // references $Client.id
  date_added: Date;
}

export interface $BailiffOfficer {
  id: string; // uuid
  for_bailiff: string; // references $Bailiff.id
  officer_name: string;
  clients_assigned: number;
  total_amount_to_collect: number;
  total_amount_collected: number;
  recovery_rate: number;
  system_rating: number;
  // more info
}

// Todo: update this interface to match the mock data in UI_data
export interface $BailiffReport {
  id: string;
  client_id: string;
  client_name: string;
  date_issued: string;
  report_message: string;
  client_engaged: boolean;
  engagement_date: string | null;
  client_paid: boolean;
  client_paid_amount: number;
  report_week: string;
  payment_references: string | null;
  hasEvidence: boolean;
  evidence_type: string | null;
  evidence_url: string | null;
}

// Todo: inspect and improve these types
export interface $ClientReport {
  report_id: string;
  date_issued: string;
  report_message: string;
  client_engaged: boolean;
  engagement_date: string;
  client_paid: boolean;
  client_paid_amount: number;
  report_week: string;
  payment_reference: string;
  hasEvidence: boolean;
  evidence_type: string;
  evidence_url: string;
}

// Todo: inspect and improve these types, add loan status, file can be in closed status
export interface $ClientDetails {
  id: string;
  client_id: string;
  client_bailiff_id: string;
  client_attached_docs: string[];
  client_name: string;
  intitial_loan_amount: number;
  collection_rate: string;
  current_remaining_amount: number;
  total_collected_amount: number;
  total_payments_count: number;
  total_engagements_count: number;
  date_added: string;
  last_engagement_date: string;
  payment_references: string[];
  client_contact: string;
  client_location: string;
  client_reports: $ClientReport[];
}

// export interface $BailiffReport {
//   id: string;
//   for_client: string; // references $Client.id
//   toBank: string; // references $Bank.id
//   byBailiff: string; // references $Bailiff.id
//   date_issued: Date;
//   report_message: string;
//   client_engaged: boolean; // true or false
//   engagement_date: Date;
//   client_paid: boolean; // true or false
//   client_paid_amount: number; // 0 if client_paid or client_engaged is false
//   report_week: string; // week 2 for example
//   payment_references: string; // references $Payment.id
//   hasEvidence: boolean;
//   evidence_type: evidenceType;
//   evidence_url: string;
// }

export interface $ReportReactions {
  id: string;
  by_bank: string; // references $Bank.id
  to_bailiff: string; // references $Bailiff.id
  for_report: string; // references $BailiffReport.id
  reaction_message: string;
  reaction_date: Date;
}

export interface $ClientPayment {
  id: string; // uuid
  amount_paid: number;
  date_paid: Date;
  payment_status: paymentStatus; // eg. success
  payment_mode: paymentMode; // eg. cash
  payment_proof: img_url;
  by_client: string; // references $Client.id
  to_officer: string; // references $BailiffOfficer.id
  to_bailiff: string; // references $Bailiff.id
  to_bank: string; // references $Bank.id
}

export interface $bailiffWorkRequest {
  id: string;
  status: workRequestStatus; // eg. failed
  to_bank: string; // references $Bank.id
  by_bailiff: string; // references $Bailiff.id
  submitted_date: Date;
}

export interface $BailiffPendingTasks {
  id: string;
  by_bank: string; // references $Bank.id
  to_bailiff: string; // references $Bailiff.id
  task_client: string; // references $Client.id
  date_sent: Date;
  due_date: Date;
}

// others to include will be Officer Reports, Bank Metrics, Bailiff Metrics and more join tables or interfaces
