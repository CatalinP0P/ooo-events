import React from 'react'
import './footer.Module.scss'
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import useWebsiteInfo from 'hooks/useWebsiteInfo'

export default function Footer() {
  const { data } = useWebsiteInfo()
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
              <label
                onClick={() => navigate('/termsAndConditions')}
                className="item__link"
              >
                T&Cs
              </label>
              <label
                onClick={() => navigate('/privacyPolicy')}
                className="item__link"
              >
                Privacy Policy
              </label>
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
              {data?.instagram != null && (
                <a
                  className="item__social"
                  target="_blank"
                  href={data.instagram}
                  rel="noreferrer"
                >
                  <Instagram fontSize="inherit" />
                </a>
              )}
              {data?.instagram != null && (
                <a
                  className="item__social"
                  target="_blank"
                  rel="noreferrer"
                  href={data.instagram}
                >
                  <Facebook fontSize="inherit" />
                </a>
              )}
              {data?.linkedin != null && (
                <a
                  className="item__social"
                  target="_blank"
                  href={data.linkedin}
                  rel="noreferrer"
                >
                  <LinkedIn fontSize="inherit" />
                </a>
              )}
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
