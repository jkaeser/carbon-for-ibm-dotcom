/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './masthead.scss';
import StickyHeader from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/StickyHeader/StickyHeader';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: ddsPrefix } = settings;

/**
 * Masthead.
 *
 * @element dds-masthead
 * @slot brand - The left hand area.
 * @slot nav - The nav content.
 * @slot profile - The right hand area.
 */
@customElement(`${ddsPrefix}-masthead`)
class DDSMasthead extends StableSelectorMixin(LitElement) {
  firstUpdated() {
    StickyHeader.global.masthead = this;
  }

  render() {
    return html`
      <div class="${prefix}--masthead__l0">
        <div class="${prefix}--header">
          <slot name="brand"></slot>
          <div class="${prefix}--header__search">
            <div class="${prefix}--header__nav-container">
              <slot></slot>
            </div>
            <slot name="search"></slot>
          </div>
          <slot name="profile"></slot>
        </div>
      </div>
      <slot name="masthead-l1"></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--masthead`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSMasthead;
