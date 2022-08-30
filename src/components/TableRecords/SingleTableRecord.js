import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table, Button } from "reactstrap";

export default function SingleTableRecord() {
	const [event, setEvent] = useState("");
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const { singeRecordId, changeId, records } = useContext(
		UserAndRecordsContext
	);

	// useEffect(() => {
	// 	if (records.length > 0) {
	// 		records.map(record => {
	// 			if (record.hash === singeRecordId) {
	// 				setFrom(record.owner)

	// 			}
	// 		})
	// 	}
	// }, []);
	// const handleLandBuy = () => {
	// 	const balanceToInt = parseInt(userBalance.replaceAll(",", ""));
	// 	const actualPrice = parseFloat(0.1) * 1000000;

	// 	if (balanceToInt > actualPrice) {
	// 		const newBalance = balanceToInt - actualPrice;
	// 		toast.success("Succesfully bought the land");
	// 	} else {
	// 		toast.error("Purchased failed, kindly check your balance");
	// 	}
	// };

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
						<td>{event}</td>
						<td>{from}</td>
						<td>{to}</td>
						<td className='text-center'>2 weeks ago</td>
					</tr>
				</tbody>
			</Table>
			<div className='d-flex justify-content-end mt-4'>
				<Button
					color='danger'
					className='animation-on-hover'
					onClick={() => changeId("")}
				>
					Go Back
				</Button>
				<Button color='success' className='animation-on-hover'>
					Buy
				</Button>
			</div>
		</>
	);
}
