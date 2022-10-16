import { UserAndRecordsContext } from 'contexts/UserAndRecordsContext';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

import './table-record.css';

export default function SingleTableRecord({
	user,
	purchasedLand,
	setPurchasedLand,
}) {
	const [singleRecordData, setSingleRecordData] = useState([]);
	const [successModal, setSuccessModal] = useState(false);
	const { singeRecordId, changeId, singleRecordBalance } = useContext(
		UserAndRecordsContext
	);

	const baseURL = 'http://localhost:3500/';

	const cleanSingleRecordData = (data) => {
		const cleanedResults = [];
		// If the data length is one then the land has not yet been
		// purchased hence set no results.
		if (data.length) {
			data.map((record, index) => {
				if (index + 1 <= data.length) {
					cleanedResults.push({
						event: index === 0 ? 'Minted' : 'Transfer',
						from: index === 0 ? 'Null Address' : data[index - 1].owner,
						to: data[index].owner,
						date: data[index].timestamp,
					});
				}
				return null;
			});
			const reversedArray = cleanedResults.reverse();
			setSingleRecordData(reversedArray);
		}
	};

	useEffect(() => {
		if (singeRecordId !== '') {
			const getURL = `${baseURL}landRecords/${singeRecordId}`;
			axios
				.get(getURL)
				.then((res) => {
					if (res.status === 200) {
						toast.success('Successfully fetched single record');
						cleanSingleRecordData(res.data.records);
					}
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.response.data.message);
				});
		}
	}, [singeRecordId, purchasedLand]);

	const buyLand = () => {
		const postURL = `${baseURL}transfer/${singeRecordId}/${user._id}`;
		axios
			.post(postURL)
			.then((res) => {
				if (res.status === 200) {
					toast.success(res.data.message);
					setPurchasedLand(true);
					setSuccessModal(true);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	const handleLandBuy = () => {
		if (user.credit > singleRecordBalance) {
			// TODO: Set up api for deducting user credit from buyers.
			buyLand();
		} else {
			toast.error('Purchased failed, kindly check your balance');
		}
	};

	const extractDate = (timestamp) => {
		const date = new Date(timestamp);
		return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
	};

	const extractTime = (timestamp) => {
		const date = new Date(timestamp);
		const hours = date.getHours();
		return `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()} ${
			hours > 11 ? 'PM' : 'AM'
		}`;
	};

	const convertToTimeAgo = (item) => {
		if (typeof item === 'string') {
			return item;
		}

		var seconds = Math.floor((new Date() - item) / 1000);

		var interval = seconds / 31536000;

		if (interval > 1) {
			return Math.floor(interval) + ' years';
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + ' months';
		}
		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + ' days';
		}
		interval = seconds / 3600;
		if (interval > 1) {
			return Math.floor(interval) + ' hours';
		}
		interval = seconds / 60;
		if (interval > 1) {
			return Math.floor(interval) + ' minutes';
		}
		return Math.floor(seconds) + ' seconds';
	};

	return (
		<>
			<Modal isOpen={successModal} toggle={setSuccessModal}>
				<ModalHeader>
					Transaction Complete
					<button
						aria-label='Close'
						className='close'
						onClick={() => setSuccessModal(false)}
					>
						<i className='tim-icons icon-simple-remove' />
					</button>
				</ModalHeader>
				<ModalBody>
					<div className='transaction-code'>
						<span>
							tx:
							4a60e1ae4e69d786f4f33c8622858a9293fea7995f9eaefc7469f99f9a344c1e
						</span>
					</div>
					<div className='body-container mt-5'>
						<div className='body-text'>
							<span className='title'>Date</span>{' '}
							<span className='text'>
								{singleRecordData.length
									? extractDate(singleRecordData.slice(0, 1)[0].date)
									: null}
							</span>
						</div>
						<div className='body-text'>
							<span className='title'>Time</span>{' '}
							<span className='text'>
								{singleRecordData.length
									? extractTime(singleRecordData.slice(0, 1)[0].date)
									: null}
							</span>
						</div>
						<div className='body-text'>
							<span className='title'>Status</span>{' '}
							<span className='text'>Success</span>
						</div>
					</div>
					<div className='body-text-2 mt-5 mb-4'>
						<div className='d-flex flex-column'>
							<span className='title'>From</span>{' '}
							<span className='text'>
								{singleRecordData.length
									? singleRecordData.slice(0, 1)[0].from
									: null}
							</span>
						</div>
						<div className='d-flex flex-column'>
							<span className='title'>To</span>{' '}
							<span className='text'>
								{singleRecordData.length
									? singleRecordData.slice(0, 1)[0].to
									: null}
							</span>
						</div>
					</div>
				</ModalBody>
			</Modal>

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
					{singleRecordData.length > 0
						? singleRecordData.map((record, index) => (
								<tr key={index}>
									{Object.values(record).map((item, index) => (
										<td key={index}>
											{item === null ? 'NullAddress' : convertToTimeAgo(item)}
										</td>
									))}
								</tr>
						  ))
						: null}
				</tbody>
			</Table>
			<div className='d-flex justify-content-end mt-4'>
				<Button
					color='danger'
					className='animation-on-hover'
					onClick={() => {
						changeId('');
						setPurchasedLand(false);
					}}
				>
					Go Back
				</Button>
				<Button
					color='success'
					className='animation-on-hover'
					onClick={handleLandBuy}
				>
					Buy
				</Button>
			</div>
		</>
	);
}
