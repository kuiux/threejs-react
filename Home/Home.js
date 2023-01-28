import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import useMousetrap from 'react-hook-mousetrap';
import ReactFlagsSelect from 'react-flags-select';
import { useTranslation } from 'react-i18next';
import GradientText from '../Common/GradientText';
import Button from '../Common/Button';
import SwitchTheme from '../Common/SwitchTheme';
import Animation, { ANIME_DURATION, ANIME_DELAY_PE } from '../Common/Animation';
import Store from 'electron-store';
import logoBlue from '../../assets/images/logo-blue.png';
import enter from '../../assets/images/enter.svg';

import './Home.scss';

const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [transOut, setTransOut] = useState(false);
  const store = new Store();
  const [selected, setSelected] = useState(store.get('language') || 'US');

  useMousetrap('enter', () => {
    navigate('/stepguide');
  });

  const changeHandler = (value) => {
    switch (value) {
      case 'US':
        i18n.changeLanguage('en');
        break;
      case 'KR':
        i18n.changeLanguage('kr');
        break;
      case 'CN':
        i18n.changeLanguage('cn');
        break;
      case 'JP':
        i18n.changeLanguage('jp');
        break;
      case 'RU':
        i18n.changeLanguage('ru');
        break;

      default:
        break;
    }

    setSelected(value);
    store.set('language', value);
  };

  const onContinue = () => {
    setTransOut(true);
    setTimeout(() => {
      navigate('/stepguide');
    }, ANIME_DELAY_PE * 5 + ANIME_DURATION);
  };

  return (
    <div className={classNames(['container-fluid', 'home'])}>
      <div
        className="row justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="col-5 text-center mt-5">
          <Animation transOut={transOut} type="fade" index={0}>
            <img src={logoBlue} alt="logo" className="home__logo" />
          </Animation>

          <Animation transOut={transOut} type="slide-down" index={1}>
            <GradientText className="title">{t('home.title')}</GradientText>
          </Animation>
          <Animation transOut={transOut} type="fade" index={2}>
            <div className="lang_box">
              <h6 className="text-left">{t('home.Select your Language')}</h6>
              <ReactFlagsSelect
                countries={['US', 'CN', 'RU']}
                customLabels={{
                  US: 'English [US]',
                  RU: 'Русский',
                  CN: 'Chinese',
                }}
                selected={selected}
                onSelect={changeHandler}
                className="menu_flags"
                selectButtonClassName="country_flags"
              />
            </div>
          </Animation>
          <Animation transOut={transOut} type="slide-right" index={3}>
            <div className="d-flex bottomOptions justify-content-between align-items-center mt-3">
              <Button className="d-block continueButton" onClick={onContinue}>
                {t('common.continue')}
              </Button>
              <GradientText className="bottomOptions__pressenter">
                {t('common.OR PRESS ENTER')}
              </GradientText>
              <img src={enter} alt="enter" />
            </div>
          </Animation>
        </div>
      </div>
      <Animation transOut={transOut} type="slide-right" index={4}>
        <SwitchTheme />
      </Animation>
    </div>
  );
};

export default Home;
