/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = settings;

/**
 * Cloud Megamenu category link group
 *
 * @element dds-megamenu-category-link-group
 */
@customElement(`${ddsPrefix}-megamenu-category-link-group`)
class DDSMegaMenuCategoryLinkGroup extends LitElement {
  render() {
    return html` <slot></slot> `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMegaMenuCategoryLinkGroup;
