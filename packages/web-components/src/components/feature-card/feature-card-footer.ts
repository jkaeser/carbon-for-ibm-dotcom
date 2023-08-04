/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import DDSCardFooter from '../card/card-footer';
import styles from './feature-card.scss';

const { prefix, stablePrefix: ddsPrefix } = settings;

/**
 * Feature card footer.
 *
 * @element dds-feature-card-footer
 */
@customElement(`${ddsPrefix}-feature-card-footer`)
class DDSFeatureCardFooter extends DDSCardFooter {
  updated() {
    super.updated();
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.remove(`${prefix}--link-with-icon`);
    }
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFeatureCardFooter;
