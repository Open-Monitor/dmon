import React from 'react';

import {Nav, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignal} from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/free-regular-svg-icons";

import './header.css';

export default () => (
  <div>
    <div className="sideBar d-none d-sm-flex">
      <Nav className="flex-column pt-3">
        <NavItem className="text-center nav-profile">
          <Nav.Link href="/live">
          <h4 className="nav-profile-inner mb-0">
            <FontAwesomeIcon icon={faSignal} className="mr-2" />
            <span>Live</span>
          </h4>
          </Nav.Link>
        </NavItem>
        <NavItem className="nav-category mt-3">
          <span>Main Menu</span>
        </NavItem>
        <NavItem>
          <Nav.Link>
            <span className="menu-title">
            <FontAwesomeIcon icon={faCircle} className="mr-3 fa-circle" />
              Server List
            </span>
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link>
            <span className="menu-title">
            <FontAwesomeIcon icon={faCircle} className="mr-3 fa-circle" />
              CPU Useage
            </span>
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link>
            <span className="menu-title">
            <FontAwesomeIcon icon={faCircle} className="mr-3 fa-circle" />
              Memory Used
            </span>
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link>
            <span className="menu-title">
            <FontAwesomeIcon icon={faCircle} className="mr-3 fa-circle" />
              Memory Avaliable
            </span>
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link>
            <span className="menu-title">
            <FontAwesomeIcon icon={faCircle} className="mr-3 fa-circle" />
              Outbound Bytes
            </span>
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link>
            <span className="menu-title">
            <FontAwesomeIcon icon={faCircle} className="mr-3 fa-circle" />
              Inbound Bytes
            </span>
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link>
            <span className="menu-title">
            <FontAwesomeIcon icon={faCircle} className="mr-3 fa-circle" />
              Outbound Packets
            </span>
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link>
            <span className="menu-title">
            <FontAwesomeIcon icon={faCircle} className="mr-3 fa-circle" />
              Inbound Packets
            </span>
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link>
            <span className="menu-title">
            <FontAwesomeIcon icon={faCircle} className="mr-3 fa-circle" />
              PIDS
            </span>
          </Nav.Link>
        </NavItem>
      </Nav>
    </div>
  </div>
);
