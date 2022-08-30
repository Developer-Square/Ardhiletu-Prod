import React, { useState } from "react";
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
import axios from "axios";
import { toast } from "react-toastify";

import "./admin-navbar.css";
import { useHistory } from "react-router-dom";

function AdminNavbar({ brandText, sidebarOpened, toggleSidebar }) {
	const [collapseOpen, setcollapseOpen] = React.useState(false);
	const [modalSearch, setmodalSearch] = React.useState(false);
	const [role, setRole] = useState("");
	const [color, setcolor] = React.useState("navbar-transparent");
	const history = useHistory();

	const baseURL = "http://localhost:3500/";

	React.useEffect(() => {
		window.addEventListener("resize", updateColor);
		// Specify how to clean up after this effect:
		return function cleanup() {
			window.removeEventListener("resize", updateColor);
		};
	});

	const fetchUser = (id) => {
		const getURL = `${baseURL}users/${id}`;
		axios
			.get(getURL)
			.then((res) => {
				if (res.status === 200) {
					const { role } = res.data.user;
					setRole(role);
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	React.useEffect(() => {
		// Open the search when the dashboard is first loaded.
		setmodalSearch(true);
		const user = localStorage.getItem("currentUser");
		fetchUser(user);
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

	const setUser = (name, role) => {
		const userData = {
			name,
			role,
			credit: 5000000,
		};
		localStorage.setItem("currentUser", JSON.stringify(userData));
	};

	const handleSignOut = () => {
		localStorage.clear();
		history.push("/");
	};
	return (
		<>
			<Navbar className={classNames("navbar-absolute", color)} expand='lg'>
				<Container fluid>
					<div className='navbar-wrapper'>
						<div
							className={classNames("navbar-toggle d-inline", {
								toggled: sidebarOpened,
							})}
						>
							<NavbarToggler onClick={toggleSidebar}>
								<span className='navbar-toggler-bar bar1' />
								<span className='navbar-toggler-bar bar2' />
								<span className='navbar-toggler-bar bar3' />
							</NavbarToggler>
						</div>
						<NavbarBrand href='#pablo' onClick={(e) => e.preventDefault()}>
							{brandText}
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
											className={`nav-item ${role === "admin" ? "active" : ""}`}
											onClick={() => setUser("Anthony Kimani", "admin")}
										>
											Admin
										</DropdownItem>
									</NavLink>
									<NavLink tag='li'>
										<DropdownItem
											className={`nav-item ${role === "buyer" ? "active" : ""}`}
											onClick={() => setUser("Linton Wambua", "buyer")}
										>
											Buyer
										</DropdownItem>
									</NavLink>
									<DropdownItem divider tag='li' />
									<NavLink tag='li'>
										<DropdownItem
											className={`nav-item ${
												role === "seller" ? "active" : ""
											}`}
											onClick={() => setUser("Mary Waithaka", "seller")}
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
