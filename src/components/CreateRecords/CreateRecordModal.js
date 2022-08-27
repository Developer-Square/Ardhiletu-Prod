import React from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

export default function CreateRecordModal({ showModal, setShowModal }) {
	return (
		<Modal isOpen={showModal} toggle={setShowModal}>
			<div className='modal-header'>
				<h3 className='modal-title' id='exampleModalLabel'>
					Modal title
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
				<p className='modal-body-text'>Upload from computer</p>
			</ModalBody>
			<ModalFooter className='m-3 d-flex justify-content-end'>
				<Button color='primary'>Save changes</Button>
			</ModalFooter>
		</Modal>
	);
}
