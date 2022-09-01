import React, { useContext, useEffect, useMemo, useState } from "react";
// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Row,
	Col,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { toast } from "react-toastify";

import SingleTableRecord from "components/TableRecords/SingleTableRecord";
import TableRecords from "components/TableRecords/TableRecords";
import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";

import "./dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import CreateRecordModal from "components/CreateRecords/CreateRecordModal";

function Dashboard() {
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("");
	const [user, setUser] = useState({});
	const [records, setRecords] = useState([]);
	const [purchasedLand, setPurchasedLand] = useState(false);
	const [createdRecords, setCreatedRecords] = useState(0);
	const [sellerLands, setSellerLands] = useState([]);
	const { importedTableContent, changeImportedDetails, singeRecordId } =
		useContext(UserAndRecordsContext);

	const handleModal = (type) => {
		setShowModal(true);
		setModalType(type);
	};

	const baseURL = "http://localhost:3500/";

	const extractTableContent = (data) => {
		const results = data.slice(1);
		const cleanedResults = [];
		results.map((item) => {
			cleanedResults.push({
				referenceNumber: item.referenceNumber,
				size: item.size,
				price: item.price,
			});
			return null;
		});
		// Remove all the duplicates
		const uniqueResults = [
			...new Map(
				cleanedResults.map((result) => [result.referenceNumber, result])
			).values(),
		];
		changeImportedDetails(uniqueResults);
	};

	const extractOwnedLands = () => {
		const results = records.slice(1);
		const ownedLands = [];
		results.map((record) => {
			if (record.ownerId === user._id) {
				ownedLands.push({
					referenceNumber: record.referenceNumber,
					size: record.size,
					price: record.price,
				});
			}
			return null;
		});
		setSellerLands(ownedLands);
	};

	const fetchLandRecords = () => {
		const postURL = `${baseURL}landRecords`;
		axios
			.get(postURL)
			.then((res) => {
				if (res.status === 200) {
					toast.success("Successfully fetched records");
					extractTableContent(res.data.records);
					setRecords(res.data.records);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

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

	useMemo(() => {
		if (user.role === "seller") {
			extractOwnedLands();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		const result = localStorage.getItem("currentUser");
		fetchUser(result);
		if (importedTableContent.length === 0 || createdRecords || purchasedLand) {
			fetchLandRecords();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createdRecords, purchasedLand]);

	return (
		<UserAndRecordsContext.Consumer>
			{({ records, importedTableContent, changeRecords }) => (
				<div className='content'>
					<ToastContainer
						position='top-right'
						autoClose={4000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
					<CreateRecordModal
						showModal={showModal}
						setShowModal={setShowModal}
						modalType={modalType}
						createdRecords={createdRecords}
						setCreatedRecords={setCreatedRecords}
					/>
					<Row className='d-flex justify-content-between'>
						<Col md='4'>
							<Card className='card-chart'>
								<CardHeader>
									<h3 className='mb-2'>Credit Balance</h3>
									<CardTitle tag='h3'>
										<i className='tim-icons icon-send text-success' />
										{user.credit}
									</CardTitle>
								</CardHeader>
							</Card>
						</Col>
						{user.role === "admin" ? (
							<Col md='4'>
								<UncontrolledDropdown group className='float-right'>
									<DropdownToggle caret color='info' data-toggle='dropdown'>
										Create
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem
											className='text-dark font-weight-bold'
											onClick={() => handleModal("multiple")}
										>
											Create Multiple
										</DropdownItem>
										<DropdownItem
											className='text-dark font-weight-bold'
											onClick={() => handleModal("single")}
										>
											Create Single
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</Col>
						) : null}
					</Row>
					<Row>
						<Col md='12'>
							<Card>
								<CardHeader>
									<CardTitle tag='h3' className='font-weight-bold'>
										Land Records
									</CardTitle>
								</CardHeader>
								<CardBody>
									{singeRecordId === "" ? (
										<TableRecords
											tableContent={importedTableContent}
											changeRecords={changeRecords}
										/>
									) : (
										<SingleTableRecord
											records={records}
											changeRecords={changeRecords}
											purchasedLand={purchasedLand}
											setPurchasedLand={setPurchasedLand}
											user={user}
										/>
									)}
								</CardBody>
							</Card>
							{user.role === "seller" && singeRecordId === "" ? (
								<Card>
									<CardHeader>
										<CardTitle tag='h3' className='font-weight-bold'>
											Owned Lands
										</CardTitle>
									</CardHeader>
									<CardBody>
										<div className='mt-5'>
											<TableRecords tableContent={sellerLands} />
										</div>
									</CardBody>
								</Card>
							) : null}
						</Col>
					</Row>
				</div>
			)}
		</UserAndRecordsContext.Consumer>
	);
}

export default Dashboard;
