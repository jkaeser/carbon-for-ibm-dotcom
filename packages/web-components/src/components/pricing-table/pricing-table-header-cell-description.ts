/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './pricing-table.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: ddsPrefix } = settings;

@customElement(`${ddsPrefix}-pricing-table-header-cell-description`)
class DDSPricingTableHeaderCellDescription extends StableSelectorMixin(
  LitElement
) {
  render() {
    return html` <slot></slot> `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-header-cell-description`;
  }

  static styles = styles;
}

export default DDSPricingTableHeaderCellDescription;
