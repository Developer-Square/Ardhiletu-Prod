import React from "react";
import { Table } from "reactstrap";

export default function TableRecords({ changeRecords }) {
	return (
		<Table className='tablesorter' responsive>
			<thead className='text-primary'>
				<tr>
					<th>Name</th>
					<th>National ID</th>
					<th>Land Reference No.</th>
					<th className='text-center'>Size(Acres)</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				<tr role='button' onClick={() => changeRecords("Joseph Kamau")}>
					<td>Joseph Kamau</td>
					<td>34343323</td>
					<td>KAJAIDO/LOODAH1AK/579</td>
					<td className='text-center'>142</td>
					<td className='text-center'>Ksh 834,534</td>
				</tr>
				<tr role='button' onClick={() => changeRecords("Alice Njoki")}>
					<td>Alice Njoki</td>
					<td>24794889</td>
					<td>NAIROBI/LOODAH1AK/579</td>
					<td className='text-center'>101</td>
					<td className='text-center'>Ksh 534,534</td>
				</tr>
			</tbody>
		</Table>
	);
}
