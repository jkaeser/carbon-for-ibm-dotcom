/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import ArrowLeft20 from '../../internal/vendor/@carbon/web-components/icons/arrow--left/20.js';
import EarthFilled16 from '../../internal/vendor/@carbon/web-components/icons/earth--filled/16.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { selectorTabbable } from '../../internal/vendor/@carbon/web-components/globals/settings.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import C4DExpressiveModal from '../expressive-modal/expressive-modal';
import '../expressive-modal/expressive-modal-header';
import '../expressive-modal/expressive-modal-heading';
import '../expressive-modal/expressive-modal-close-button';
import C4DLocaleSearch from './locale-search';
import C4DRegionItem from './region-item';
import styles from './locale-modal.scss';
import { ICON_PLACEMENT } from '../link-with-icon/link-with-icon';
import StickyHeader from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/StickyHeader/StickyHeader';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Locale modal.
 *
 * @element c4d-locale-modal
 * @slot regions-selector - The area for the regions selector.
 * @slot locales-selector - The area for the locales selector.
 */
@customElement(`${c4dPrefix}-locale-modal`)
// `CDSModal` extends `HostListenerMixin`
class C4DLocaleModal extends C4DExpressiveModal {
  /**
   * The current region.
   */
  @state()
  private _currentRegion?: string;

  /**
   * Handles `click` event on the back button.
   */
  private _handleClickBackButton(e) {
    this._currentRegion = undefined;
    e.preventDefault();
  }

  /**
   * Handles `click` event on a region card.
   *
   * @param event The event.
   */
  private _handleClickRegionSelector(event: MouseEvent) {
    const { disabled, name } = event.target as C4DRegionItem;
    if (!disabled) {
      this._currentRegion = name;
    }
  }

  @HostListener('eventClose')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleAfterClose() {
    this._currentRegion = undefined;
  }

  /**
   * @returns The heading content for the region selector page.
   */
  private _renderRegionSelectorHeading() {
    const { headerTitle, langDisplay } = this;
    return html`
      ${langDisplay &&
      html`
        <p class="${prefix}--modal-header__label ${prefix}--type-delta">
          ${langDisplay}${EarthFilled16({
            class: `${c4dPrefix}--locale-modal__label-globe`,
          })}
        </p>
      `}
      ${langDisplay &&
      headerTitle &&
      html`
        <p class="cds--modal-header__heading cds--type-beta">${headerTitle}</p>
      `}
    `;
  }

  /**
   * @returns The heading content for the locale selector page.
   */
  private _renderLocaleSelectorHeading() {
    const {
      headerTitle,
      _currentRegion: currentRegion,
      _handleClickBackButton: handleClickBackButton,
    } = this;
    return html`
      <c4d-link-with-icon
        icon-placement="${ICON_PLACEMENT.LEFT}"
        href="#"
        @click="${handleClickBackButton}">
        ${headerTitle}${ArrowLeft20({
          slot: 'icon',
          class: `${c4dPrefix}--locale-modal__label-arrow`,
        })}
      </c4d-link-with-icon>
      <p class="cds--modal-header__heading cds--type-beta" tabindex="0">
        ${currentRegion}
      </p>
    `;
  }

  /**
   * @returns The heading content.
   */
  private _renderHeading() {
    const { _currentRegion: currentRegion } = this;
    return !currentRegion
      ? this._renderRegionSelectorHeading()
      : this._renderLocaleSelectorHeading();
  }

  /**
   * @returns The body content for the region selector page.
   */
  private _renderRegionSelectorBody() {
    const { _handleClickRegionSelector: handleClickRegionSelector } = this;
    return html`
      <div
        class="${prefix}--modal-content ${c4dPrefix}--locale-modal"
        @click="${handleClickRegionSelector}">
        <slot name="regions-selector"></slot>
      </div>
    `;
  }

  /**
   * @returns The body content for the locale selector page.
   */
  // eslint-disable-next-line class-methods-use-this
  private _renderLocaleSelectorBody() {
    return html` <slot name="locales-selector"></slot> `;
  }

  protected _renderHeader() {
    const { closeButtonAssistiveText } = this;
    return html`
      <div id="${prefix}--modal-header">
        <c4d-expressive-modal-header>
          <c4d-expressive-modal-close-button
            assistive-text="${ifDefined(closeButtonAssistiveText)}">
          </c4d-expressive-modal-close-button>
          <c4d-expressive-modal-heading
            >${this._renderHeading()}</c4d-expressive-modal-heading
          >
        </c4d-expressive-modal-header>
      </div>
    `;
  }

  protected _renderBody() {
    const { _currentRegion: currentRegion } = this;
    return !currentRegion
      ? this._renderRegionSelectorBody()
      : this._renderLocaleSelectorBody();
  }

  /**
   * The assistive text for the close button.
   */
  @property({ attribute: 'close-button-assistive-text' })
  closeButtonAssistiveText?: string;

  /**
   * The header title.
   */
  @property({ attribute: 'header-title' })
  headerTitle = 'Select geographic area';

  /**
   * The language to show in the UI.
   */
  @property({ attribute: 'lang-display' })
  langDisplay?: string;

  firstUpdated() {
    StickyHeader.global.localeModal = this;
  }

  async updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('_currentRegion')) {
      const { selectorLocaleSearch } = this
        .constructor as typeof C4DLocaleModal;
      const localeSearch = this.querySelector(selectorLocaleSearch);
      if (localeSearch) {
        (localeSearch as C4DLocaleSearch).region = this._currentRegion ?? '';

        if (this.open) {
          (localeSearch as C4DLocaleSearch).reset();
          (localeSearch as HTMLElement).focus();
        }
      }

      // re-focus on first region-item when navigating back to the first modal pane
      const { selectorPrimaryFocus } = this
        .constructor as typeof C4DLocaleModal;
      const activeRegion = this.querySelector(selectorPrimaryFocus);
      if (activeRegion && this.open) {
        (activeRegion as HTMLElement).tabIndex = 0;
        (activeRegion as HTMLElement).focus();
      }
    }
  }

  /**
   * A selector selecting the locale search UI.
   */
  static get selectorLocaleSearch() {
    return `${c4dPrefix}-locale-search`;
  }

  /**
   * A selector selecting the nodes that should be focused when modal gets open.
   */
  static get selectorPrimaryFocus() {
    return `
      [data-modal-primary-focus],
      ${c4dPrefix}-region-item
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--locale-modal`;
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return `
      ${selectorTabbable},
      ${c4dPrefix}-expressive-modal,
      ${c4dPrefix}-expressive-modal-close-button,
      ${c4dPrefix}-region-item,
      ${prefix}-search,
      ${c4dPrefix}-locale-item
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DLocaleModal;
