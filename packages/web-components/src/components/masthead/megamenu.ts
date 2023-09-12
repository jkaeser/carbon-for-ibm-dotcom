/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, property } from 'lit-element';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './masthead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import { MEGAMENU_LAYOUT_SCHEME } from './defs';

const { prefix, stablePrefix: ddsPrefix } = settings;

/**
 * MegaMenu
 *
 * @element dds-megamenu
 */
@customElement(`${ddsPrefix}-megamenu`)
class DDSMegaMenu extends StableSelectorMixin(LitElement) {
  @property({ reflect: true })
  layout?: MEGAMENU_LAYOUT_SCHEME;

  @property({ reflect: true, type: Boolean })
  overflowing = false;

  protected mutationObserver = new MutationObserver(
    this._setOverflowing.bind(this)
  );

  /**
   * Determine if any navigation columns are taller than megamenu.
   */
  protected _setOverflowing() {
    const { navLeftSelector, navRightSelector } = this
      .constructor as typeof DDSMegaMenu;
    const navColumns = this.querySelectorAll(`
      ${navLeftSelector},
      ${
        this.layout === MEGAMENU_LAYOUT_SCHEME.TAB
          ? `[role="tabpanel"]:not([hidden]) > ${navRightSelector}`
          : navRightSelector
      }
    `);
    const overflows: boolean[] = [];
    navColumns.forEach((column) => {
      overflows.push(column.scrollHeight > this.scrollHeight);
    });
    this.overflowing = overflows.some((column) => column === true);
  }

  connectedCallback() {
    const sharedOptions = {
      childList: true,
      subtree: true,
      attributes: true,
    };
    const options =
      this.layout === MEGAMENU_LAYOUT_SCHEME.TAB
        ? {
            ...sharedOptions,
            attributeFilter: ['selected'],
          }
        : sharedOptions;
    this.mutationObserver.observe(this, options);
    super.connectedCallback();
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class="${prefix}--masthead__megamenu__container">
        <div
          class="${prefix}--masthead__megamenu__container--row ${prefix}--masthead__megamenu__container--row--${this
            .layout}">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get navLeftSelector() {
    return `${ddsPrefix}-megamenu-left-navigation`;
  }

  static get navRightSelector() {
    return `${ddsPrefix}-megamenu-right-navigation`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--masthead__megamenu`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMegaMenu;
