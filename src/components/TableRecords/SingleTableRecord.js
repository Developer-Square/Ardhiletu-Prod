import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";

import "./table-record.css";

export default function SingleTableRecord() {
	const [singleRecordData, setSingleRecordData] = useState([]);
	const [user, setUser] = useState({});
	const [purchasedLand, setPurchasedLand] = useState(false);
	const [noResults, setNoResults] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const { singeRecordId, changeId, singleRecordBalance } = useContext(
		UserAndRecordsContext
	);

	const baseURL = "http://localhost:3500/";

	const fetchUser = (id) => {
		const getURL = `${baseURL}users/${id}`;
		axios
			.get(getURL)
			.then((res) => {
				if (res.status === 200) {
					const { user } = res.data;
					setUser(user);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	const cleanSingleRecordData = (data) => {
		const cleanedResults = [];
		// If the data length is one then the land has not yet been
		// purchased hence set no results.
		if (data.length > 1) {
			data.map((record, index) => {
				if (index + 1 < data.length) {
					cleanedResults.push({
						event: index === 0 ? "Minted" : "Transfer",
						from: record.owner,
						to: data[index + 1].owner,
						date: data[index + 1].timestamp,
					});
				}
				return null;
			});
			const reversedArray = cleanedResults.reverse();
			setSingleRecordData(reversedArray);
		} else {
			setNoResults(true);
		}
	};

	useEffect(() => {
		if (singeRecordId !== "") {
			const getURL = `${baseURL}landRecords/${singeRecordId}`;
			axios
				.get(getURL)
				.then((res) => {
					if (res.status === 200) {
						toast.success("Successfully fetched single record");
						cleanSingleRecordData(res.data.records);
					}
				})
				.catch((err) => {
					toast.error(err.response.data.message);
				});
		}
		const userId = localStorage.getItem("currentUser");
		fetchUser(userId);
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
			toast.error("Purchased failed, kindly check your balance");
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
			hours > 11 ? "PM" : "AM"
		}`;
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
							<span className='title'>Date</span>{" "}
							<span className='text'>
								{singleRecordData.length
									? extractDate(singleRecordData.slice(0, 1)[0].date)
									: null}
							</span>
						</div>
						<div className='body-text'>
							<span className='title'>Time</span>{" "}
							<span className='text'>
								{singleRecordData.length
									? extractTime(singleRecordData.slice(0, 1)[0].date)
									: null}
							</span>
						</div>
						<div className='body-text'>
							<span className='title'>Status</span>{" "}
							<span className='text'>Success</span>
						</div>
					</div>
					<div className='body-text-2 mt-5 mb-4'>
						<div className='d-flex flex-column'>
							<span className='title'>From</span>{" "}
							<span className='text'>
								{singleRecordData.length
									? singleRecordData.slice(0, 1)[0].from
									: null}
							</span>
						</div>
						<div className='d-flex flex-column'>
							<span className='title'>To</span>{" "}
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
					{noResults ? (
						<tr className='no-results'>No Results...</tr>
					) : singleRecordData.length > 0 ? (
						singleRecordData.map((record, index) => (
							<tr key={index}>
								{Object.values(record).map((item, index) => (
									<td key={index}>{item === null ? "NullAddress" : item}</td>
								))}
							</tr>
						))
					) : null}
				</tbody>
			</Table>
			<div className='d-flex justify-content-end mt-4'>
				<Button
					color='danger'
					className='animation-on-hover'
					onClick={() => changeId("")}
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
