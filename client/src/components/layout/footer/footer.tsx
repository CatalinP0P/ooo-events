import React from 'react'
import './footer.Module.scss'
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__body">
          <div className="footer__item">
            <h4 className="item__title">Discover</h4>
            <div className="item__body">
              <label className="item__link" onClick={() => navigate('/about')}>
                About us
              </label>
              <label
                className="item__link"
                onClick={() => navigate('/newsletter')}
              >
                Newsletter
              </label>
            </div>
          </div>

          <div className="footer__item">
            <h4 className="item__title">Legal</h4>
            <div className="item__body">
              <label className="item__link">T&Cs</label>
              <label className="item__link">Privacy Policy</label>
            </div>
          </div>

          <div className="footer__item">
            <h4 className="item__title">Support</h4>
            <div className="item__body">
              <label
                className="item__link"
                onClick={() => navigate('/contact')}
              >
                Contact us
              </label>
              <label className="item__link" onClick={() => navigate('/FAQ')}>
                FAQ
              </label>
            </div>
          </div>

          <div className="footer__item">
            <h4 className="item__title">Find us</h4>
            <div className="item__body item__body--horizontal">
              <a
                className="item__social"
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61556215591565&mibextid=ZbWKwL"
                rel="noreferrer"
              >
                <Instagram fontSize="inherit" />
              </a>
              <a className="item__social" target="_blank">
                <Facebook fontSize="inherit" />
              </a>
              <a
                className="item__social"
                target="_blank"
                href="https://www.linkedin.com/in/out-of-office-events-bb94582b1/"
                rel="noreferrer"
              >
                <LinkedIn fontSize="inherit" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__bottom__container">
            <label className="footer__copyright">© All Rights Reserved</label>
          </div>
        </div>
      </div>
    </div>
  )
}
