import React from "react";
import css from "./t.module.scss";
import icon from "../../assets/local_phone_black_18x18.png" ;
export const ThankYou: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.close_button} onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
        </svg>
      </div>
      <div className={css.header}>
        <h3>
          <strong>Thanks, you're all set.</strong>
        </h3>
      </div>
      <div className={css.content}>
        <p>For more information please click on the call business button.</p>
        <div>
          <a className={css.call_button} href="tel:+919072677575">
            <span className={css.call_button_icon}>
              <img src={icon} alt="Call Icon"/>
            </span>
            <span className={css.call_button_label}>Call Business</span>
          </a>
        </div>
      </div>
    </div>
  );
};
