import React, { useContext, useEffect, useState } from "react";
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

import SingleTableRecord from "components/TableRecords/SingleTableRecord";
import TableRecords from "components/TableRecords/TableRecords";
import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";

import "./dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import CreateRecordModal from "components/CreateRecords/CreateRecordModal";

function Dashboard() {
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("");
	const { userBalance, changeBalance, loggedInUser } = useContext(
		UserAndRecordsContext
	);
	console.log(loggedInUser);

	const handleModal = (type) => {
		setShowModal(true);
		setModalType(type);
	};

	useEffect(() => {
		changeBalance("2,200,343");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<UserAndRecordsContext.Consumer>
			{({ records, importedHeaders, importedTableContent, changeRecords }) => (
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
					/>
					<Row className='d-flex justify-content-between'>
						<Col md='4'>
							<Card className='card-chart'>
								<CardHeader>
									<h3 className='mb-2'>Credit Balance</h3>
									<CardTitle tag='h3'>
										<i className='tim-icons icon-send text-success' />
										{userBalance}
									</CardTitle>
								</CardHeader>
							</Card>
						</Col>
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
									{records.name === "" ? (
										<TableRecords
											headers={importedHeaders}
											tableContent={importedTableContent}
											changeRecords={changeRecords}
										/>
									) : (
										<SingleTableRecord
											records={records}
											changeRecords={changeRecords}
										/>
									)}
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			)}
		</UserAndRecordsContext.Consumer>
	);
}

export default Dashboard;
