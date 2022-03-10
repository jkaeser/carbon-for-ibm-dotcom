/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import BXHeaderName from 'carbon-web-components/es/components/ui-shell/header-name.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';
import DDSLeftNav from './left-nav';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The brand name UI in left nav.
 *
 * @element dds-left-nav-name
 */
@customElement(`${ddsPrefix}-left-nav-name`)
class DDSLeftNavName extends BXHeaderName {
  /**
   * Set slot name property.
   */
  @property({ type: String, attribute: 'slot', reflect: true })
  slot = '';

  connectedCallback() {
    super.connectedCallback();
    if (this.parentElement instanceof DDSLeftNav) {
      this.slot = 'platform-id';
    }
  }

  render() {
    const { href, prefix: namePrefix } = this;
    const namePrefixPart = !namePrefix
      ? undefined
      : html`
          <span class="${prefix}--header__name--prefix">${namePrefix}</span>&nbsp;
        `;
    return html`
      <a class="${prefix}--side-nav__submenu ${prefix}--side-nav__submenu-platform" href="${ifNonNull(href)}">
        ${namePrefixPart}
        <slot></slot>
      </a>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNavName;
