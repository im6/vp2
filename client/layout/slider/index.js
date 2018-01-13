import 'style-loader!css-loader!slideout/index.css';
import './style.scss';
import Slideout from 'slideout';

var slideout = new Slideout({
  'panel': document.getElementsByTagName('main')[0],
  'menu': document.getElementsByTagName('nav')[0],
  'padding': 210,
  'tolerance': 70
});

// Toggle button
document.querySelector('.toggle-button').addEventListener('click', function() {
  slideout.toggle();
});