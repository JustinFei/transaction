import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";

import { AccountName, TransactionType, TransactionItem } from "models/transaction";

require("./style.scss");

const TransactionList = (props: any) => {
    const [state, setState] = useState({
        transactionData: null,
        typeSet: new Set(),
        accountNameSet: new Set()
    });

    useEffect(() => {
        import('./data.json').then(background => {
            console.log(background.transactions);
            setState({
                ...state,
                transactionData: background.transactions as TransactionItem[]
            })
        });
        return () => setState({
            ...state,
            transactionData: []
        });
    }, []);

    const handleAccountNameChange = (accountName: AccountName, e) => {
        const { accountNameSet } = state;
        if (e.target.checked) {
            accountNameSet.add(accountName);

        } else {
            accountNameSet.delete(accountName);
        }
        setState({
            ...state,
            accountNameSet
        });
    }

    const handleTransactionTypeChange = (transactionType: TransactionType, e) => {
        const { typeSet } = state;
        if (e.target.checked) {
            typeSet.add(transactionType);

        } else {
            typeSet.delete(transactionType);
        }
        setState({
            ...state,
            typeSet
        });
    }

    const generateTransactionTable = () => {

        const { transactionData, typeSet, accountNameSet } = state;
        if (!transactionData) {
            return (
                <div>Empty</div>
            );
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <th>ACCOUNT NO.</th>
                        <th>ACCOUNT NAME</th>
                        <th>CURRENCY</th>
                        <th>AMOUNT</th>
                        <th>TRANSACTION TYPE</th>
                    </tr>
                    {transactionData
                        .filter((transaction: TransactionItem) => typeSet.size === 0 || typeSet.has(transaction.transactionType))
                        .filter((transaction: TransactionItem) => accountNameSet.size === 0 || accountNameSet.has(transaction.accountName))
                        .map((transaction: TransactionItem) => {
                            return (
                                <tr key={transaction.iban}>
                                    <td>
                                        <Link to="/detail" onClick={(() => props.setTransaction(transaction))}>
                                            {transaction.account}
                                        </Link>
                                    </td>
                                    <td>{transaction.accountName}</td>
                                    <td>{transaction.currencyCode}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.transactionType}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        );
    }

    return (
        <div className="transaction-page">
            <div className="transaction-title"><h1>My Transactions</h1></div>
            <hr className="transaction-divider" />
            <div className="transaction-table">
                <div className="transaction-table-filter">
                    <h3>Filters</h3>
                    <div className="account-name-filter">
                        <h4>Account Name</h4>
                        {Object.entries(AccountName).map(([key, accountName]) => {
                            return (
                                <span>
                                    <label>
                                        <input
                                            key={key}
                                            type="checkbox"
                                            // checked={this.state.complete}
                                            onChange={(e) => handleAccountNameChange(accountName, e)}
                                        />
                                        <span>{accountName}</span>
                                    </label>
                                </span>
                            );
                        })}
                    </div>
                    <div className="transaction-type-filter">
                        <h4>Transaction Type</h4>
                        {Object.entries(TransactionType).map(([key, transactionType]) => {
                            return (
                                <span>
                                    <label >
                                        <input
                                            key={key}
                                            type="checkbox"
                                            // checked={this.state.complete}
                                            onChange={(e) => handleTransactionTypeChange(transactionType, e)}
                                        />
                                        <span className="transaction-type-name">{transactionType}</span>
                                    </label>
                                </span>
                            );
                        })}
                    </div>
                </div>

                <div className="transaction-table-content">
                    {generateTransactionTable()}
                </div>
            </div>
        </div>
    );
}

export default TransactionList;