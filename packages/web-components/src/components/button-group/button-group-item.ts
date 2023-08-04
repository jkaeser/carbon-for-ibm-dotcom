/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './button-group.scss';
import DDSButtonExpressive from '../button/button';

const { stablePrefix: ddsPrefix } = settings;

/**
 * Button group item.
 *
 * @element dds-button-group-item
 */
@customElement(`${ddsPrefix}-button-group-item`)
class DDSButtonGroupItem extends DDSButtonExpressive {
  static get stableSelector() {
    return `${ddsPrefix}--button-group-item`;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSButtonGroupItem;
