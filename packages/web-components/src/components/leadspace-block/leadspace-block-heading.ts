/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import C4DLeadspaceHeading from '../leadspace/leadspace-heading';
import styles from './leadspace-block.scss';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Heading content in leadspace block.
 *
 * @element c4d-leadspace-block-heading
 */
@customElement(`${c4dPrefix}-leadspace-block-heading`)
class C4DLeadspaceBlockHeading extends StableSelectorMixin(
  C4DLeadspaceHeading
) {
  static get stableSelector() {
    return `${c4dPrefix}--leadspace-block__heading`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLeadspaceBlockHeading;
