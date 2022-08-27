import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default function CreateSingleRecord() {
	return (
		<>
			<FormGroup>
				<Label for='name' className='form-title'>
					Name
				</Label>
				<Input
					type='text'
					name='name'
					id='name'
					placeholder='Enter full name'
					className='form-title'
				/>
			</FormGroup>
			<FormGroup>
				<Label for='id' className='form-title'>
					National Id
				</Label>
				<Input
					type='text'
					name='id'
					id='id'
					placeholder='Enter national id'
					className='form-title'
				/>
			</FormGroup>
			<FormGroup>
				<Label for='land-title' className='form-title'>
					Land Title
				</Label>
				<Input
					type='text'
					name='land-title'
					id='land-title'
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
					placeholder='Enter your price'
					className='form-title'
				/>
			</FormGroup>
		</>
	);
}
