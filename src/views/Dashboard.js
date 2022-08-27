import React, { useState } from "react";
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

import SingleTableRecord from "components/TableRecords/SingleTableRecord";
import TableRecords from "components/TableRecords/TableRecords";
import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";

import "./dashboard.css";
import CreateRecordModal from "components/CreateRecords/CreateRecordModal";

function Dashboard() {
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("");

	const handleModal = (type) => {
		setShowModal(true);
		setModalType(type);
	};
	return (
		<UserAndRecordsContext.Consumer>
			{({ records, importedHeaders, importedTableContent, changeRecords }) => (
				<div className='content'>
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
										<i className='tim-icons icon-send text-success' /> Ksh
										1,200,100
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
									{records === "" ? (
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
