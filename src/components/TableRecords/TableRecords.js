import React from "react";
import { Table } from "reactstrap";

import "./table-record.css";

export default function TableRecords({ changeRecords, headers, tableContent }) {
	return (
		<Table className='tablesorter' responsive>
			<thead className='text-primary'>
				<tr>
					{headers.map((title, index) => (
						<th key={index}>{title}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{tableContent.length ? (
					tableContent.map((content, index) => (
						<tr
							role='button'
							key={index}
							onClick={() =>
								changeRecords(
									content["Full Name"],
									Object.values(content).pop()
								)
							}
						>
							{Object.values(content).map((item, index) => (
								<td
									key={index}
									className={`${index === 3 ? "text-center" : ""}`}
								>
									{item}
								</td>
							))}
						</tr>
					))
				) : (
					<tr className='no-results'>No Results. Try Searching...</tr>
				)}
			</tbody>
		</Table>
	);
}
