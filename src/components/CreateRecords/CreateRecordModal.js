import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";

import CreateMultipleRecord from "./CreateMultipleRecord";
import CreateSingleRecord from "./CreateSingleRecord";
import { toast } from "react-toastify";

export default function CreateRecordModal({
	showModal,
	setShowModal,
	modalType,
	createdRecords,
	setCreatedRecords,
}) {
	const [landTitle, setLandTitle] = useState("");
	const [landSize, setLandSize] = useState("");
	const [price, setPrice] = useState("");

	const baseURL = "http://localhost:3500/";

	const clearFields = () => {
		setLandTitle();
		setLandSize();
		setPrice();
	};

	const handleSubmit = () => {
		const postURL = `${baseURL}landRecords`;
		axios
			.post(postURL, {
				referenceNumber: landTitle,
				size: landSize,
				price: parseInt(price),
			})
			.then((res) => {
				if (res.status === 201) {
					toast.success(res.data.message);
					clearFields();
					setCreatedRecords(createdRecords + 1);
					setShowModal(false);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	const handleClose = () => {
		clearFields();
		setShowModal(false);
	};
	return (
		<Modal isOpen={showModal} toggle={setShowModal}>
			<div className='modal-header'>
				<h3 className='modal-title' id='exampleModalLabel'>
					Create a Single Record
				</h3>
				<button
					type='button'
					className='close'
					data-dismiss='modal'
					aria-hidden='true'
					onClick={() => handleClose()}
				>
					<i className='tim-icons icon-simple-remove' />
				</button>
			</div>
			<ModalBody>
				{modalType === "single" ? (
					<CreateSingleRecord
						landSize={landSize}
						landTitle={landTitle}
						price={price}
						setLandSize={setLandSize}
						setLandTitle={setLandTitle}
						setPrice={setPrice}
					/>
				) : (
					<CreateMultipleRecord
						setShowModal={setShowModal}
						setCreatedRecords={setCreatedRecords}
					/>
				)}
			</ModalBody>
			{modalType === "single" ? (
				<ModalFooter className='m-3 d-flex justify-content-end'>
					<Button
						color='primary'
						className='modal-body-text'
						onClick={handleSubmit}
					>
						Save changes
					</Button>
				</ModalFooter>
			) : (
				<></>
			)}
		</Modal>
	);
}
