
export enum AccountName {
	Savings = 'Savings Account',
	Checking = 'Checking Account',
	AutoLoan = 'Auto Loan Account',
	CreditCard = 'Credit Card Account',
    Investment = 'Investment Account',
	PersonalLoan = 'Personal Loan Account',
	MoneyMarket = 'Money Market Account',
    HomeLoan = 'Home Loan Account'
}

export enum TransactionType {
	Deposit = 'deposit',
	Withdrawal = 'withdrawal',
	Invoice = 'invoice',
	Payment = 'payment'
}

export interface TransactionItem {
	account: string;
	accountName: string;
	amount: number;
	bic: string;
	currencyCode: string;
	currencyName: string;
	currencySymbol: string;
    iban: string;
    mask: string;
    transactionType: TransactionType;
}
