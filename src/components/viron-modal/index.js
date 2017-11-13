import ObjectAssign from 'object-assign';
import riot from 'riot';
import { constants as actions } from '../../store/actions';
import { constants as getters } from '../../store/getters';
import { constants as states } from '../../store/states';

export default function() {
  const store = this.riotx.get();

  let tag;

  const fadeIn = () => {
    setTimeout(() => {
      this.isVisible = true;
      this.update();
    }, 100);
  };

  const fadeOut = () => {
    this.isVisible = false;
    this.update();
    setTimeout(() => {
      store.action(actions.MODALS_REMOVE, this.opts.id);
    }, 1000);
  };

  this.layoutType = store.getter(getters.LAYOUT_TYPE);
  this.listen(states.LAYOUT, () => {
    this.layoutType = store.getter(getters.LAYOUT_TYPE);
    this.update();
  });

  this.on('mount', () => {
    tag = riot.mount(this.refs.content, this.opts.tagname, ObjectAssign({
      isModal: true,
      modalCloser: fadeOut
    }, this.opts.tagopts))[0];
    fadeIn();
    window.addEventListener('keydown', this.handleKeyDown);
  }).on('before-unmount', () => {
    tag.unmount(true);
  }).on('unmount', () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  });

  this.handleTap = () => {
    fadeOut();
  };

  this.handleFrameTap = e => {
    // 内部イベントを外部に伝播させない。
    e.stopPropagation();
  };

  this.handleCloseButtonTap = () => {
    fadeOut();
  };

  this.handleKeyDown = e => {
    switch (e.keyCode) {
    case 27: // Esc
      fadeOut();
      break;
    default:
      break;
    }
  };
}