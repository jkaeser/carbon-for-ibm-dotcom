/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSAccordion from '../../internal/vendor/@carbon/web-components/components/accordion/accordion.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import './filter-panel-input-select';
import styles from './filter-panel.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: ddsPrefix } = settings;

/**
 * Filter group renders the entire accordion group.
 *
 * @element dds-filter-group
 */
@customElement(`${ddsPrefix}-filter-group`)
class DDSFilterGroup extends StableSelectorMixin(CDSAccordion) {
  /**
   * Extends CDSAccordion component
   */
  static get stableSelector() {
    return `${ddsPrefix}-filter-group`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFilterGroup;
