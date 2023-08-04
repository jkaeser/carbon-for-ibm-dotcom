/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CDSModalHeading from '../../internal/vendor/@carbon/web-components/components/modal/modal-heading.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: ddsPrefix } = settings;

/**
 * Extends the CDSModalHeading
 *
 * @element dds-filter-modal-heading
 */
@customElement(`${ddsPrefix}-filter-modal-heading`)
class DDSFilterModalHeading extends StableSelectorMixin(CDSModalHeading) {
  static get stableSelector() {
    return `${ddsPrefix}-filter-modal-heading`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFilterModalHeading;
