import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table, Button } from "reactstrap";
import axios from "axios";

import "./table-record.css";

export default function SingleTableRecord() {
	const [singleRecordData, setSingleRecordData] = useState([]);
	const [user, setUser] = useState({});
	const [purchasedLand, setPurchasedLand] = useState(false);
	const [noResults, setNoResults] = useState(false);
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

	return (
		<>
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
