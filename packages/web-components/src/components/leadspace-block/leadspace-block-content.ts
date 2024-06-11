/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, html, TemplateResult } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import C4DContentBlock from '../content-block/content-block';
import styles from './leadspace-block.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * LeadSpace Block content Component.
 *
 * @element c4d-leadspace-block-content
 * @csspart children - The wrapper around child items. Usage: c4d-leadspace-block-content::part(children)
 */
@customElement(`${c4dPrefix}-leadspace-block-content`)
class C4DLeadSpaceBlockContent extends C4DContentBlock {
  protected _renderInnerBody(): TemplateResult | string | void {
    const { _hasContent: hasContent, _hasMedia: hasMedia } = this;
    return html`
      <div
        ?hidden="${!hasContent && !hasMedia}"
        class="${prefix}--content-block__children"
        part="children">
        ${this._renderMedia()}${this._renderContent()}
      </div>
    `;
  }

  connectedCallback() {
    /**
     * ensure link list heading is aria level 3 so that the headings in
     * leadspace block are hierarchical for accessibility purposes
     */
    const linkListHeading = this.querySelector('c4d-link-list-heading');
    if (linkListHeading) {
      linkListHeading.setAttribute('aria-level', '3');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <slot name="heading"></slot>
      ${this._renderBody()}
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--leadspace-block-content`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLeadSpaceBlockContent;
