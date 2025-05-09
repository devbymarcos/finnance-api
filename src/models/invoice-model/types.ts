export interface InvoiceTypes {
    id?: number;
    user_id: number;
    wallet_id: number;
    ds_wallet?: string;
    category_id: number;
    ds_category?: string;
    invoice_of?: number;
    name?: string;
    description?: string;
    price?: number;
    due_at: Date;
    type?: "income | expense";
    pay?: string;
    repeat_when?: string;
    period?: string;
    date_init?: string;
    date_end?: string;
    typeTransfer?: string;
    active?: number;
}

export interface IInvoiceList {
    user_id: number;
    wallet_id: number;
}
