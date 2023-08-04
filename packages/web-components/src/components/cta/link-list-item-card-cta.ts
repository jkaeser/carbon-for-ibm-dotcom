/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, html } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSCardCTA from './card-cta';
import styles from '../link-list/link-list.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: ddsPrefix } = settings;

/**
 * Link list item card CTA.
 *
 * @element dds-link-list-item-card-cta
 */
@customElement(`${ddsPrefix}-link-list-item-card-cta`)
class DDSLinkListItemCardCTA extends DDSCardCTA {
  protected _renderImage() {
    // Link list doesn't show video thumbnail in card
    return html`
      <slot name="image" @slotchange="${this._handleSlotChange}"></slot>
    `;
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  static get stableSelector() {
    return `${ddsPrefix}--link-list-item-card-cta`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLinkListItemCardCTA;
