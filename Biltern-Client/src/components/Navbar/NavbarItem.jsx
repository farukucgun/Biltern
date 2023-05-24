import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavbarItem.module.css';

/**
 * @author Faruk Uçgun
 * @date 08.05.2023
 * TODO: change style of the active page
 */


const NavbarItem = (props) => {
    const { to, name, index } = props;
    
    // const curNavLink = document.getElementById(`navbarItem-${index}`);
    // const curInnerNavLink = document.getElementById(`innerNavbarItem-${index}`);

    // if (curNavLink.classList.contains(classes.active)) {
    //     curInnerNavLink.classList.toggle(classes.active);
    // }

    return (
        <NavLink 
            onClick={props.onClick}
            to={to} 
            className={classes.item_outer}
            // id={`navbarItem-${index}`}
            relative='path'
        >
            <button 
                className={classes.item_inner}
                // id={`innerNavbarItem-${index}`}
            >    
                {name}
            </button>
        </NavLink>
    );
}

export default NavbarItem;