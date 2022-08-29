import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
	Collapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	Input,
	NavbarBrand,
	Navbar,
	NavLink,
	Nav,
	Container,
	Modal,
	NavbarToggler,
	ModalHeader,
	InputGroup,
	Button,
} from "reactstrap";

import "./admin-navbar.css";
import { useHistory } from "react-router-dom";

function AdminNavbar(props) {
	const [collapseOpen, setcollapseOpen] = React.useState(false);
	const [modalSearch, setmodalSearch] = React.useState(false);
	const [color, setcolor] = React.useState("navbar-transparent");
	const history = useHistory();
	React.useEffect(() => {
		window.addEventListener("resize", updateColor);
		// Specify how to clean up after this effect:
		return function cleanup() {
			window.removeEventListener("resize", updateColor);
		};
	});

	React.useEffect(() => {
		// Open the search when the dashboard is first loaded.
		setmodalSearch(true);
	}, []);
	// function that adds color white/transparent to the navbar on resize (this is for the collapse)
	const updateColor = () => {
		if (window.innerWidth < 993 && collapseOpen) {
			setcolor("bg-white");
		} else {
			setcolor("navbar-transparent");
		}
	};
	// this function opens and closes the collapse on small devices
	const toggleCollapse = () => {
		if (collapseOpen) {
			setcolor("navbar-transparent");
		} else {
			setcolor("bg-white");
		}
		setcollapseOpen(!collapseOpen);
	};
	// this function is to open the Search modal
	const toggleModalSearch = () => {
		setmodalSearch(!modalSearch);
	};

	const handleSignOut = () => {
		props.changeUser("");
		history("/");
	};
	return (
		<>
			<Navbar className={classNames("navbar-absolute", color)} expand='lg'>
				<Container fluid>
					<div className='navbar-wrapper'>
						<div
							className={classNames("navbar-toggle d-inline", {
								toggled: props.sidebarOpened,
							})}
						>
							<NavbarToggler onClick={props.toggleSidebar}>
								<span className='navbar-toggler-bar bar1' />
								<span className='navbar-toggler-bar bar2' />
								<span className='navbar-toggler-bar bar3' />
							</NavbarToggler>
						</div>
						<NavbarBrand href='#pablo' onClick={(e) => e.preventDefault()}>
							{props.brandText}
						</NavbarBrand>
					</div>
					<NavbarToggler onClick={toggleCollapse}>
						<span className='navbar-toggler-bar navbar-kebab' />
						<span className='navbar-toggler-bar navbar-kebab' />
						<span className='navbar-toggler-bar navbar-kebab' />
					</NavbarToggler>
					<Collapse navbar isOpen={collapseOpen}>
						<Nav className='ml-auto here' navbar>
							<InputGroup className='search-bar'>
								<Button color='link' onClick={toggleModalSearch}>
									<i className='tim-icons icon-zoom-split' />
									<span className='d-lg-none d-md-block'>Search</span>
								</Button>
							</InputGroup>
							<UncontrolledDropdown nav>
								<DropdownToggle
									caret
									color='default'
									nav
									onClick={(e) => e.preventDefault()}
								>
									<div className='photo'>
										<img alt='...' src={require("assets/img/anime3.png")} />
									</div>
									<b className='caret d-none d-lg-block d-xl-block' />
									<p className='d-lg-none'>Log out</p>
								</DropdownToggle>
								<DropdownMenu className='dropdown-navbar' right tag='ul'>
									<NavLink tag='li'>
										<DropdownItem
											className={`nav-item ${
												props.user === "admin" ? "active" : ""
											}`}
											onClick={() => props.changeUser("admin")}
										>
											Admin
										</DropdownItem>
									</NavLink>
									<NavLink tag='li'>
										<DropdownItem
											className={`nav-item ${
												props.user === "buyer" ? "active" : ""
											}`}
											onClick={() => props.changeUser("buyer")}
										>
											Buyer
										</DropdownItem>
									</NavLink>
									<DropdownItem divider tag='li' />
									<NavLink tag='li'>
										<DropdownItem
											className={`nav-item ${
												props.user === "seller" ? "active" : ""
											}`}
											onClick={() => props.changeUser("seller")}
										>
											Seller
										</DropdownItem>
									</NavLink>
									<NavLink tag='li'>
										<DropdownItem onClick={() => handleSignOut()}>
											Sign Out
										</DropdownItem>
									</NavLink>
								</DropdownMenu>
							</UncontrolledDropdown>
							<li className='separator d-lg-none' />
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
			<Modal
				modalClassName='modal-search'
				isOpen={modalSearch}
				toggle={toggleModalSearch}
			>
				<ModalHeader>
					<Input placeholder='SEARCH' type='text' />
					<button
						aria-label='Close'
						className='close'
						onClick={toggleModalSearch}
					>
						<i className='tim-icons icon-simple-remove' />
					</button>
				</ModalHeader>
			</Modal>
		</>
	);
}

export default AdminNavbar;
