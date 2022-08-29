import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default function CreateSingleRecord({
	landSize,
	landTitle,
	price,
	setLandSize,
	setLandTitle,
	setPrice,
}) {
	return (
		<>
			<FormGroup>
				<Label for='land-title' className='form-title'>
					Land Title
				</Label>
				<Input
					type='text'
					name='land-title'
					id='land-title'
					value={landTitle}
					onChange={(e) => setLandTitle(e.target.value)}
					placeholder='Enter land title'
					className='form-title'
				/>
			</FormGroup>
			<FormGroup>
				<Label for='land-size' className='form-title'>
					Land Size
				</Label>
				<Input
					type='text'
					name='land-size'
					id='land-size'
					value={landSize}
					onChange={(e) => setLandSize(e.target.value)}
					placeholder='Enter land size(Acres)'
					className='form-title'
				/>
			</FormGroup>
			<FormGroup>
				<Label for='price' className='form-title'>
					Price
				</Label>
				<Input
					type='text'
					name='price'
					id='price'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder='Enter your price'
					className='form-title'
				/>
			</FormGroup>
		</>
	);
}
