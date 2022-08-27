import React from "react";
import { Table } from "reactstrap";

export default function TableRecords({ changeRecords, headers, tableContent }) {
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
				{tableContent.map((content, index) => (
					<tr
						role='button'
						key={index}
						onClick={() => changeRecords(content["Full Name"])}
					>
						{Object.values(content).map((item, index) => (
							<td key={index} className={`${index === 3 ? "text-center" : ""}`}>
								{item}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</Table>
	);
}
