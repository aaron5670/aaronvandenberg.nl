import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import {Link} from 'gatsby'
import {Wrapper} from './styles'

const NavbarLinks = ({desktop}) => {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <Wrapper desktop={desktop}>
            {pathname === '/login' ?
                <>
                    <Link to={'/'} replace>Home</Link>
                    <Link to="/#about" replace>About</Link>
                    <Link to="/#projects" replace>Projects</Link>
                    <Link to="/#contact" replace>Contact</Link>
                </>
                :
                <>
                    <AnchorLink href="#about">About</AnchorLink>
                    <AnchorLink href="#projects">Projects</AnchorLink>
                    <AnchorLink href="#contact">Contact</AnchorLink>
                </>
            }
        </Wrapper>
    );
}

export default NavbarLinks
