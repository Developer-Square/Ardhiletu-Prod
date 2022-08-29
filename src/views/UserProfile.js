import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";
import React, { useContext } from "react";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardText,
	FormGroup,
	Form,
	Input,
	Row,
	Col,
} from "reactstrap";

function UserProfile() {
	const { loggedInUser } = useContext(UserAndRecordsContext);
	return (
		<>
			<div className='content'>
				<Row>
					<Col md='8'>
						<Card>
							<CardHeader>
								<h5 className='title'>Edit Profile</h5>
							</CardHeader>
							<CardBody>
								<Form>
									<Row>
										<Col className='pr-md-1' md='5'>
											<FormGroup>
												<label>Company (disabled)</label>
												<Input
													defaultValue='Creative Code Inc.'
													disabled
													placeholder='Company'
													type='text'
												/>
											</FormGroup>
										</Col>
										<Col className='px-md-1' md='3'>
											<FormGroup>
												<label>Username</label>
												<Input
													defaultValue={`${loggedInUser.fullName}`}
													placeholder='Username'
													type='text'
												/>
											</FormGroup>
										</Col>
										<Col className='pl-md-1' md='4'>
											<FormGroup>
												<label htmlFor='exampleInputEmail1'>
													Email address
												</label>
												<Input
													placeholder={`${loggedInUser.fullName}@email.com`}
													type='email'
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col className='pr-md-1' md='6'>
											<FormGroup>
												<label>First Name</label>
												<Input
													defaultValue='Mike'
													placeholder='Company'
													type='text'
												/>
											</FormGroup>
										</Col>
										<Col className='pl-md-1' md='6'>
											<FormGroup>
												<label>Last Name</label>
												<Input
													defaultValue='Andrew'
													placeholder='Last Name'
													type='text'
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col md='12'>
											<FormGroup>
												<label>Address</label>
												<Input
													defaultValue='Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09'
													placeholder='Home Address'
													type='text'
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col className='pr-md-1' md='4'>
											<FormGroup>
												<label>City</label>
												<Input
													defaultValue='Nairobi'
													placeholder='City'
													type='text'
												/>
											</FormGroup>
										</Col>
										<Col className='px-md-1' md='4'>
											<FormGroup>
												<label>Country</label>
												<Input
													defaultValue='Kenya'
													placeholder='Country'
													type='text'
												/>
											</FormGroup>
										</Col>
										<Col className='pl-md-1' md='4'>
											<FormGroup>
												<label>Postal Code</label>
												<Input placeholder='ZIP Code' type='number' />
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col md='8'>
											<FormGroup>
												<label>About Me</label>
												<Input
													cols='80'
													defaultValue='Looking for love in this cruel city!'
													placeholder='Here can be your description'
													rows='4'
													type='textarea'
												/>
											</FormGroup>
										</Col>
									</Row>
								</Form>
							</CardBody>
							<CardFooter>
								<Button className='btn-fill' color='primary' type='submit'>
									Save
								</Button>
							</CardFooter>
						</Card>
					</Col>
					<Col md='4'>
						<Card className='card-user'>
							<CardBody>
								<CardText />
								<div className='author'>
									<div className='block block-one' />
									<div className='block block-two' />
									<div className='block block-three' />
									<div className='block block-four' />
									<a href='#pablo' onClick={(e) => e.preventDefault()}>
										<img
											alt='...'
											className='avatar'
											src={require("assets/img/anime3.png")}
										/>
										<h5 className='title'>{loggedInUser.fullName}</h5>
									</a>
									<p className='description'>{loggedInUser.role}</p>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default UserProfile;
