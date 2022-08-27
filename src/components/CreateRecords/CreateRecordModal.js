import React from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import CreateMultipleRecord from "./CreateMultipleRecord";
import CreateSingleRecord from "./CreateSingleRecord";

export default function CreateRecordModal({
	showModal,
	setShowModal,
	modalType,
}) {
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
					onClick={() => setShowModal(false)}
				>
					<i className='tim-icons icon-simple-remove' />
				</button>
			</div>
			<ModalBody>
				{modalType === "single" ? (
					<CreateSingleRecord />
				) : (
					<CreateMultipleRecord setShowModal={setShowModal} />
				)}
			</ModalBody>
			{modalType === "single" ? (
				<ModalFooter className='m-3 d-flex justify-content-end'>
					<Button color='primary' className='modal-body-text'>
						Save changes
					</Button>
				</ModalFooter>
			) : (
				<></>
			)}
		</Modal>
	);
}
