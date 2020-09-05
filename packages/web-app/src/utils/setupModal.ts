import { Item } from '@zaino/shared/';
import Modal from 'react-modal';
import { history } from '../routers/AppRouter';

export default (item?: Item): [string, () => void] => {
  const title = item ? `${item.name} | Zaino` : 'Add item';
  document.title = title;
  Modal.setAppElement('#app');

  const closeModal = () => {
    // restore title after closing
    document.title = 'Zaino';
    history.push('/dashboard');
  };

  return [title, closeModal];
};