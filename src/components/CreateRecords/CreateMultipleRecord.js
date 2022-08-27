import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";
import React, { useState } from "react";
import { Button } from "reactstrap";

export default function CreateMultipleRecord({ setShowModal }) {
	const [file, setFile] = useState();

	const fileReader = new FileReader();

	const handleOnChange = (e) => {
		setFile(e.target.files[0]);
	};

	const csvFileToArray = (string, changeImportedDetails) => {
		const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
		const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

		const array = csvRows.map((i) => {
			const values = i.split(",");
			const obj = csvHeader.reduce((object, header, index) => {
				object[header] = values[index];
				return object;
			}, {});
			return obj;
		});
		const headerKeys = Object.keys(Object.assign({}, ...array));
		changeImportedDetails(headerKeys, array);
		setShowModal(false);
	};

	const handleOnSubmit = (e, changeImportedDetails) => {
		e.preventDefault();

		if (file) {
			fileReader.onload = function (event) {
				const csvOutput = event.target.result;
				csvFileToArray(csvOutput, changeImportedDetails);
			};

			fileReader.readAsText(file);
		}
	};

	return (
		<UserAndRecordsContext.Consumer>
			{({ changeImportedDetails }) => (
				<form className='d-flex justify-content-between'>
					<input type={"file"} accept={".csv"} onChange={handleOnChange} />
					<Button
						color='info'
						onClick={(e) => handleOnSubmit(e, changeImportedDetails)}
					>
						IMPORT CSV
					</Button>
				</form>
			)}
		</UserAndRecordsContext.Consumer>
	);
}
