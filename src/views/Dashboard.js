import SingleTableRecord from "components/TableRecords/SingleTableRecord";
import TableRecords from "components/TableRecords/TableRecords";
import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";
import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

function Dashboard() {
	return (
		<UserAndRecordsContext.Consumer>
			{({ records, changeRecords }) => (
				<div className='content'>
					<Row>
						<Col lg='4'>
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
										<TableRecords changeRecords={changeRecords} />
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
