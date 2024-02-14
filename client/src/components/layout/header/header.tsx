import React, { useState } from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import './header.Module.scss'
import { useNavigate } from 'react-router-dom'
import SideNav from '../sideNav/sideNav'
import logo from 'assets/images/logo.png'

const links = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/about',
    title: 'About',
  },
  {
    path: '/events',
    title: 'Events',
  },
  {
    path: '/clubs',
    title: 'Clubs',
  },
  {
    path: '/restaurants',
    title: 'Restaurants',
  },
  {
    path: '/corporate',
    title: 'Corporate',
  },
  {
    path: '/ambassadors',
    title: 'Ambassadors',
  },
  {
    path: '/services',
    title: 'Services',
  },

  {
    path: '/contact',
    title: 'Contact',
  },
]

export default function Header() {
  const [mobileVisibility, setMobileVisibility] = useState(false)

  const navigate = useNavigate()
  return (
    <div className="header">
      <div className="header__container">
        <img
          src={logo}
          className="header__logo"
          onClick={() => navigate('/')}
        />

        <div className="header__links">
          {links.map((link) => (
            <h4
              onClick={() => navigate(link.path)}
              className="header__link"
              key={link.path}
            >
              {link.title}
            </h4>
          ))}
        </div>
        <div className="header__mobile">
          <div
            className="header__mobile__button"
            onClick={() => setMobileVisibility(true)}
          >
            <MenuRoundedIcon fontSize="inherit" />
          </div>
          <SideNav
            visibility={mobileVisibility}
            setVisibility={setMobileVisibility}
          >
            <div className="mobile__body">
              {links.map((link) => (
                <h4
                  onClick={() => {
                    setMobileVisibility(false)
                    setTimeout(() => {
                      navigate(link.path)
                    }, 5)
                  }}
                  className={
                    'mobile__link ' +
                    (window.location.pathname == link.path
                      ? 'mobile__link__active'
                      : '')
                  }
                  key={link.path}
                >
                  {link.title}
                </h4>
              ))}
            </div>
          </SideNav>
        </div>
      </div>
    </div>
  )
}
