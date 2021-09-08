import { Link } from "react-router-dom";
import { TransactionItem } from "models/transaction";

require("components/transactionlist/style.scss");

interface PTransactionDetail {
    transactionDetail: TransactionItem;
}

const TransactionDetail = (props: PTransactionDetail) => {
    const { transactionDetail } = props;
    return (
        <div className="transaction-page">
            <div className="transaction-title"><h1>Transaction {transactionDetail.account} </h1></div>
            <hr className="transaction-divider" />
            <div className="transaction-detail-wrapper">
                <div>
                    <span>Account No.:</span>
                    <span>{transactionDetail.account}</span>
                </div>
                <div>
                    <span>Account Name: </span>
                    <span>{transactionDetail.accountName}</span>
                </div>
                <div>
                    <span>Currency Code:</span>
                    <span>{transactionDetail.currencyCode}</span>
                </div>
                <div>
                    <span>Amount:</span>
                    <span>{transactionDetail.amount}</span>
                </div>
                <div>
                    <span>Transaction Type:</span>
                    <span>{transactionDetail.transactionType}</span>
                </div>
            </div>
            <Link to="/">
                Home
            </Link>
        </div>
    );
}

export default TransactionDetail;