/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './footer.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: ddsPrefix } = settings;

/**
 * Footer nav.
 *
 * @element dds-footer-nav
 */
@customElement(`${ddsPrefix}-footer-nav`)
class DDSFooterNav extends StableSelectorMixin(LitElement) {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'navigation');
    }
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', 'Footer navigation');
    }
    super.connectedCallback();
  }

  /**
   * Update the CSS selectors depending on the locale button being rendered or not.
   */
  @property({ type: Boolean, attribute: 'disable-locale-button' })
  disableLocaleButton = false;

  render() {
    const { disableLocaleButton } = this;
    const classes = {
      [`${prefix}--footer-nav__container`]: true,
      [`${prefix}--accordion`]: true,
      [`${prefix}--footer-nav__locale-button--disabled`]: disableLocaleButton,
    };

    return html`
      <ul class=${classMap(classes)}>
        <slot></slot>
      </ul>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--footer-nav`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFooterNav;
