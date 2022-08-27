import React from "react";

// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Table,
	Row,
	Col,
} from "reactstrap";

function Dashboard() {
	return (
		<>
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
								<Table className='tablesorter' responsive>
									<thead className='text-primary'>
										<tr>
											<th>Name</th>
											<th>National ID</th>
											<th>Land Reference No.</th>
											<th className='text-center'>Size(Acres)</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Dakota Rice</td>
											<td>Niger</td>
											<td>Oud-Turnhout</td>
											<td className='text-center'>$36,738</td>
										</tr>
										<tr>
											<td>Minerva Hooper</td>
											<td>Curaçao</td>
											<td>Sinaai-Waas</td>
											<td className='text-center'>$23,789</td>
										</tr>
										<tr>
											<td>Sage Rodriguez</td>
											<td>Netherlands</td>
											<td>Baileux</td>
											<td className='text-center'>$56,142</td>
										</tr>
										<tr>
											<td>Philip Chaney</td>
											<td>Korea, South</td>
											<td>Overland Park</td>
											<td className='text-center'>$38,735</td>
										</tr>
										<tr>
											<td>Doris Greene</td>
											<td>Malawi</td>
											<td>Feldkirchen in Kärnten</td>
											<td className='text-center'>$63,542</td>
										</tr>
										<tr>
											<td>Mason Porter</td>
											<td>Chile</td>
											<td>Gloucester</td>
											<td className='text-center'>$78,615</td>
										</tr>
										<tr>
											<td>Jon Porter</td>
											<td>Portugal</td>
											<td>Gloucester</td>
											<td className='text-center'>$98,615</td>
										</tr>
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default Dashboard;
