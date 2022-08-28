import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Table, Button } from "reactstrap";

export default function SingleTableRecord({ records, changeRecords }) {
	const { userBalance, changeBalance } = useContext(UserAndRecordsContext);
	const handleLandBuy = () => {
		const balanceToInt = parseInt(userBalance.replaceAll(",", ""));
		const actualPrice = parseFloat(records.price) * 1000000;

		if (balanceToInt > actualPrice) {
			const newBalance = balanceToInt - actualPrice;
			toast.success("Succesfully bought the land");
			changeBalance(newBalance);
		} else {
			toast.error("Purchased failed, kindly check your balance");
		}
	};

	return (
		<>
			<Table className='tablesorter' responsive>
				<thead className='text-primary'>
					<tr>
						<th>Event</th>
						<th>From</th>
						<th>To</th>
						<th className='text-center'>Date</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Transfer</td>
						<td>James Orengo</td>
						<td>{records.name}</td>
						<td className='text-center'>2 weeks ago</td>
					</tr>
				</tbody>
			</Table>
			<div className='d-flex justify-content-end mt-4'>
				<Button
					color='danger'
					className='animation-on-hover'
					onClick={() => changeRecords("", "")}
				>
					Go Back
				</Button>
				<Button
					color='success'
					className='animation-on-hover'
					onClick={handleLandBuy}
				>
					Buy
				</Button>
			</div>
		</>
	);
}
