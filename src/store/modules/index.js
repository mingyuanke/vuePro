import {default as listPanel ,listPanelTypes } from './listPanel'
import * as comps from './comTypes'
export default {
  [comps.LIST_PANEL]:listPanel
}
export const type={
  ...listPanelTypes
};
