/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, query, customElement } from 'lit-element';
import BXHeaderMenu from '@carbon/web-components/es/components/ui-shell/header-menu.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead top nav submenu.
 *
 * @element dds-top-nav-menu
 */
@customElement(`${ddsPrefix}-top-nav-menu`)
class DDSTopNavMenu extends BXHeaderMenu {
  /**
   * The trigger button.
   */
  @query('[part="trigger"]')
  private _triggerNode?: HTMLAnchorElement;

  /**
   * `true` if this submenu should be in its active state.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('active')) {
      const { active, _triggerNode: triggerNode } = this;
      if (triggerNode) {
        triggerNode.setAttribute('data-selected', String(Boolean(active)));
      }
    }

    this.shadowRoot
      ?.querySelectorAll('[role="menuitem"]')
      .forEach((menuItem) => menuItem.removeAttribute('role'));
  }

  connectedCallback() {
    super.connectedCallback();
    this.removeAttribute('role');
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSTopNavMenu;
