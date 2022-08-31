import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";
import React, { useContext } from "react";
import { Table } from "reactstrap";

import "./table-record.css";

export default function TableRecords({ tableContent }) {
	const { changeId, changeRecordBalance } = useContext(UserAndRecordsContext);
	return (
		<Table className='tablesorter' responsive>
			<thead className='text-primary'>
				<tr>
					<th>LAND TITLE</th>
					<th>LAND SIZE(ACRES)</th>
					<th>PRICE(IN MILLIONS)</th>
				</tr>
			</thead>
			<tbody>
				{tableContent.length ? (
					tableContent.map((content, index) => (
						<tr
							role='button'
							key={index}
							onClick={() => {
								changeRecordBalance(Object.values(content).pop());
								changeId(content["referenceNumber"]);
							}}
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
					<tr className='no-results'>
						<td>No Results. Try Searching...</td>
					</tr>
				)}
			</tbody>
		</Table>
	);
}
