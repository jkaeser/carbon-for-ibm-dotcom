/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './masthead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import { MEGAMENU_LAYOUT_SCHEME } from './defs';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * MegaMenu
 *
 * @element c4d-megamenu
 */
@customElement(`${c4dPrefix}-megamenu`)
class C4DMegaMenu extends StableSelectorMixin(LitElement) {
  @property({ reflect: true })
  layout?: MEGAMENU_LAYOUT_SCHEME;

  @property({ reflect: true, type: Boolean })
  overflowing = false;

  protected mutationObserver = new MutationObserver(
    this._setOverflowing.bind(this)
  );

  protected resizeObserver = new ResizeObserver(
    this._setOverflowing.bind(this)
  );

  /**
   * Determine if any navigation columns are taller than megamenu.
   */
  protected _setOverflowing() {
    const { navLeftSelector, navRightSelector, navColumnInnerSelector } = this
      .constructor as typeof C4DMegaMenu;
    const navColumns = this.querySelectorAll(`
      ${navLeftSelector},
      ${
        this.layout === MEGAMENU_LAYOUT_SCHEME.TAB
          ? `[role="tabpanel"] > ${navRightSelector}`
          : navRightSelector
      }
    `);
    const columnHeights: Array<number | undefined> = [];
    navColumns.forEach((column) => {
      const height = navColumnInnerSelector
        ? column.shadowRoot?.querySelector(navColumnInnerSelector)?.scrollHeight
        : column.scrollHeight;
      columnHeights.push(height);
    });
    this.overflowing = columnHeights.some((height) =>
      height ? height > this.scrollHeight : false
    );
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
    this.resizeObserver.observe(this);
    super.connectedCallback();
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
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
    return `${c4dPrefix}-megamenu-left-navigation`;
  }

  static get navRightSelector() {
    return `${c4dPrefix}-megamenu-right-navigation`;
  }

  static get navColumnInnerSelector() {
    return `.${prefix}--masthead__megamenu-container-inner`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--masthead__megamenu`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DMegaMenu;
