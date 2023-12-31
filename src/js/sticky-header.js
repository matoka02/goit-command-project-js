import { refs } from '../index';

const stickyHeader = (window.onscroll = function showHeader() {
  if (window.pageYOffset > 200) {
    refs.stickyHeader.classList.add('home-header__sticky');
  } else {
    refs.stickyHeader.classList.remove('home-header__sticky')
  }
});

export default stickyHeader;