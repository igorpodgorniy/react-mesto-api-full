import Popup from './Popup';
import iconDone from '../images/icon-done.svg';
import iconFail from '../images/icon-fail.svg';

function InfoTooltip({isOpen, onClose, ariaLabel, isDone, textSuccess}) {
  return(
    <Popup isOpen={isOpen} name='infoTooltip' ariaLabel={ariaLabel} onClose={onClose}>
      <div className="popup__container">
        {isDone
          ? <>
              <img className="popup__icon" src={iconDone} alt="Иконка успешно отправленного запроса"/>
              <h2 className="popup__title popup__title_center">{textSuccess}</h2>
            </>
          : <>
              <img className="popup__icon" src={iconFail} alt="Иконка успешно отправленного запроса"/>
              <h2 className="popup__title popup__title_center">Что-то пошло не так! Попробуйте ещё раз.</h2>
            </>
        }
      </div>
    </Popup>
  );
}

export default InfoTooltip;