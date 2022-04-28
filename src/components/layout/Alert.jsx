import { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

function Alert() {
  const { alert } = useContext(AlertContext); //obj contains

  //if alert is not equal to null then...
  return (
    alert !== null && (
      <p className="flex items-start mb-4">
        {alert.type === 'error' && (
          <svg
            className="w-10 h-6 flex-none mt-0.5 mr-5 ml-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        )}
          <strong className=" text-base font-semibold leading-7 text-white">
            {alert.msg}
          </strong>
      </p>
    )
  );
}

export default Alert;
