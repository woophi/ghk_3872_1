import { Typography } from '@alfalab/core-components/typography';
import rocket from '../assets/rocket.png';
import { thxSt } from './style.css';

export const ThxLayout = () => {
  return (
    <>
      <div className={thxSt.container}>
        <img src={rocket} width={135} className={thxSt.rocket} />
        <Typography.TitleResponsive font="system" tag="h1" view="large" defaultMargins weight="bold">
          Хотим угадывать ваши интересы
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          Мы стремимся удивлять вас и радовать новыми идеями каждый день. Сервис финансовых советов ещё в разработке,
          сообщим, когда можно будет им воспользоваться.
        </Typography.Text>
      </div>
    </>
  );
};
