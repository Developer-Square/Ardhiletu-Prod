import React from "react";
import { Table, Button } from "reactstrap";

export default function SingleTableRecord({ records, changeRecords }) {
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
						<td>{records}</td>
						<td className='text-center'>2 weeks ago</td>
					</tr>
				</tbody>
			</Table>
			<div className='d-flex justify-content-end mt-4'>
				<Button
					color='danger'
					className='animation-on-hover'
					onClick={() => changeRecords("")}
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
