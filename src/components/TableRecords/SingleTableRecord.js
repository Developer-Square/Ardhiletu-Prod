import React from "react";
import { Table } from "reactstrap";

export default function SingleTableRecord({ fullName }) {
	return (
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
					<td>{fullName}</td>
					<td className='text-center'>2 weeks ago</td>
				</tr>
			</tbody>
		</Table>
	);
}
