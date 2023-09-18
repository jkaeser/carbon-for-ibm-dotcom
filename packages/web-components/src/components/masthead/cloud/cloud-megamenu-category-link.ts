/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import CDSLink from '../../../internal/vendor/@carbon/web-components/components/link/link.js';
import settings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './cloud-masthead.scss';
import { carbonElement as customElement } from '../../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Cloud MegaMenu category link
 *
 * @element c4d-cloud-megamenu-category-link
 */
@customElement(`${c4dPrefix}-cloud-megamenu-category-link`)
class C4DCloudMegaMenuCateoryLink extends CDSLink {
  /**
   * link title.
   */
  @property({ reflect: true })
  title = '';

  /**
   * @returns The inner content.
   */
  protected _renderInner() {
    const { title } = this;
    return html`
      <p>${title}</p>
      <span><slot></slot></span>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DCloudMegaMenuCateoryLink;
