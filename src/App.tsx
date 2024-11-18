import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { Switch } from '@alfalab/core-components/switch';
import { Typography } from '@alfalab/core-components/typography';
import { useState } from 'react';
import wallet from './assets/wallet.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [checkedItems, setCheckedItem] = useState({
    'Советы по ипотеке': false,
    'Рекомендации по накоплениям': false,
    'Полезные уведомления': false,
    'Полезные привычки': false,
    'Финансовый прогноз': false,
    'Финансовые советы': false,
  });

  const submit = () => {
    setLoading(true);
    window.gtag('event', '3872_continue_click');
    sendDataToGA({
      advices: Number(checkedItems['Финансовые советы']) as 1 | 0,
      forecast: Number(checkedItems['Финансовый прогноз']) as 1 | 0,
      habits: Number(checkedItems['Полезные привычки']) as 1 | 0,
      mortage_tips: Number(checkedItems['Советы по ипотеке']) as 1 | 0,
      notifications: Number(checkedItems['Полезные уведомления']) as 1 | 0,
      recommendations: Number(checkedItems['Рекомендации по накоплениям']) as 1 | 0,
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <img src={wallet} width="100%" height={233} style={{ objectFit: 'contain' }} />
          <Typography.TitleResponsive tag="h1" view="medium" font="system" weight="semibold">
            Персональный финансовый ассистент
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium">Настройте рекомендации от банка</Typography.Text>
        </div>

        <Typography.TitleResponsive tag="h1" view="small" font="system" weight="semibold">
          Выберите, что вам интересно
        </Typography.TitleResponsive>

        <div className={appSt.boxswitchers}>
          <Switch
            block
            reversed
            checked={checkedItems['Советы по ипотеке']}
            label="Советы по ипотеке"
            hint="Узнайте, как быстрее погасить основной долг"
            onChange={() => setCheckedItem({ ...checkedItems, 'Советы по ипотеке': !checkedItems['Советы по ипотеке'] })}
            className={appSt.switchItem}
          />
          <Switch
            block
            reversed
            checked={checkedItems['Рекомендации по накоплениям']}
            label="Рекомендации по накоплениям"
            hint="Расскажем, как копить и приумножать доход"
            onChange={() =>
              setCheckedItem({
                ...checkedItems,
                'Рекомендации по накоплениям': !checkedItems['Рекомендации по накоплениям'],
              })
            }
            className={appSt.switchItem}
          />
          <Switch
            block
            reversed
            checked={checkedItems['Полезные уведомления']}
            label="Полезные уведомления"
            hint="Предупредим о превышении лимита и похвалим за экономию"
            onChange={() =>
              setCheckedItem({ ...checkedItems, 'Полезные уведомления': !checkedItems['Полезные уведомления'] })
            }
            className={appSt.switchItem}
          />
        </div>

        <Typography.TitleResponsive tag="h1" view="small" font="system" weight="semibold">
          Финансовые помощники
        </Typography.TitleResponsive>

        <div className={appSt.boxswitchers}>
          <Switch
            block
            reversed
            checked={checkedItems['Полезные привычки']}
            label="Полезные привычки"
            hint="Покажем, где траты выше, и дадим советы по оптимизации"
            onChange={() => setCheckedItem({ ...checkedItems, 'Полезные привычки': !checkedItems['Полезные привычки'] })}
            className={appSt.switchItem}
          />
          <Switch
            block
            reversed
            checked={checkedItems['Финансовый прогноз']}
            label="Финансовый прогноз"
            hint="Прогноз расходов, доходов и свободного остатка"
            onChange={() => setCheckedItem({ ...checkedItems, 'Финансовый прогноз': !checkedItems['Финансовый прогноз'] })}
            className={appSt.switchItem}
          />
          <Switch
            block
            reversed
            checked={checkedItems['Финансовые советы']}
            label="Финансовые советы"
            hint="Подскажем, как выгоднее использовать деньги"
            onChange={() => setCheckedItem({ ...checkedItems, 'Финансовые советы': !checkedItems['Финансовые советы'] })}
            className={appSt.switchItem}
          />
        </div>
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile loading={loading} block view="primary" onClick={submit}>
          Продолжить
        </ButtonMobile>
      </div>
    </>
  );
};
