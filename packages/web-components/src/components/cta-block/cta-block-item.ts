/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, html, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DContentItem from '../content-item/content-item';

import styles from './cta-block.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  media: '_hasMedia',
  statistic: '_hasStatistic',
  footer: '_hasFooter',
};

/**
 * The CTA BLOCK ITEM component
 *
 * @element c4d-cta-block-item
 * @slot statistics
 * @slot media
 * @slot heading
 * @slot .
 * @slot footer
 */
@customElement(`${c4dPrefix}-cta-block-item`)
class C4DCTABlockItem extends StableSelectorMixin(C4DContentItem) {
  /**
   * `true` if there are CTA media in the content item area.
   */
  @state()
  protected _hasMedia = false;

  /**
   * `true` if there are CTA statistic in the content item area.
   */
  @state()
  protected _hasStatistic = false;

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   * @param event.target The event target.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this[slotExistencePropertyNames[name] || '_hasStatistic'] = hasContent;
  }

  /**
   * @returns The statistic content items
   */
  protected _renderStatistic(): TemplateResult | string | void {
    const { _hasStatistic: hasStatistic, _handleSlotChange: handleSlotChange } =
      this;
    return html`
      <div
        ?hidden="${!hasStatistic}"
        class="${prefix}--cta-block-item__statitics"
        part="statistics">
        <slot name="statistics" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The media content items
   */
  protected _renderMedia(): TemplateResult | string | void {
    const { _hasMedia: hasMedia, _handleSlotChange: handleSlotChange } = this;

    return html`
      <div
        ?hidden="${!hasMedia}"
        class="${prefix}--cta-block-item__media"
        part="media">
        <slot name="media" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  render() {
    return html`
      ${this._renderStatistic()} ${this._renderMedia()}
      <slot name="heading"></slot>
      ${super._renderBody()}${super._renderFooter()}
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--cta-block-item`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

console.warn(
  'The cta-block-item component has been deprecated in favor of the content-section/block and content-item components. ' +
    'See content-section/block and content-items documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCTABlockItem;
