import constants from '../../core/constants';

import drawer from './drawer';
import dmc from './dmc';
import current from './current';
import page from './page';

export default {
  [constants.GETTER_DRAWER_OPENED]: drawer.opened,

  [constants.GETTER_DMC]: dmc.all,
  [constants.GETTER_DMC_PAGES]: dmc.pages,
  [constants.GETTER_DMC_NAME]: dmc.name,
  [constants.GETTER_DMC_DASHBOARD]: dmc.dashboard,
  [constants.GETTER_DMC_MANAGE]: dmc.manage,

  [constants.GETTER_CURRENT]: current.show,

  [constants.GETTER_PAGE_GET]: page.show,

};
