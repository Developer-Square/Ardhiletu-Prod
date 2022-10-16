import { UserAndRecordsContext } from 'contexts/UserAndRecordsContext';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreateMultipleRecord({
	setShowModal,
	setCreatedRecords,
}) {
	const [file, setFile] = useState();

	const fileReader = new FileReader();
	const baseURL = 'http://localhost:3500/';

	const handleOnChange = (e) => {
		setFile(e.target.files[0]);
	};

	const sendToBackend = (records, users) => {
		const postURL = `${baseURL}seed`;
		axios
			.post(postURL, {
				users,
				records,
			})
			.then((res) => {
				if (res.status === 201) {
					toast.success(res.data.message);
					setShowModal(false);
					setCreatedRecords(true);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message);
			});
	};

	const removeForwardSlash = (title) => {
		if (title) {
			const result = title.replaceAll('/', '');
			return result;
		}
	};

	const convertToRealPrice = (amount) => {
		// console.log({ amount });
		const actualPrice = parseFloat(amount) * 1000000;
		return actualPrice;
	};

	const csvFileToArray = (string, changeImportedDetails) => {
		const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
		const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

		const array = csvRows.map((i) => {
			const values = i.split(',');
			const obj = csvHeader.reduce((object, header, index) => {
				object[header] = values[index];
				return object;
			}, {});
			return obj;
		});
		const landDetails = [];
		const userDetails = [];
		array.map((land) => {
			landDetails.push({
				referenceNumber: removeForwardSlash(land['Land Title']),
				size: land['Land Size(Acres)'],
				price: convertToRealPrice(Object.values(land).slice(4, 5)),
				owner: land['Full Name'],
			});
			userDetails.push({
				name: land['Full Name'],
				credit: 5000000,
				role: 'buyer',
			});
			return null;
		});

		sendToBackend(landDetails, userDetails);
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
					<input type={'file'} accept={'.csv'} onChange={handleOnChange} />
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
