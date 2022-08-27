import React from "react";
import { Table } from "reactstrap";

export default function SingleTableRecord() {
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
					<td>Joseph Kamau</td>
					<td className='text-center'>2 weeks ago</td>
				</tr>
				<tr>
					<td>Transfer</td>
					<td>Phylis Wairimu</td>
					<td>Alice Njoki</td>
					<td className='text-center'>3 months ago</td>
				</tr>
			</tbody>
		</Table>
	);
}
