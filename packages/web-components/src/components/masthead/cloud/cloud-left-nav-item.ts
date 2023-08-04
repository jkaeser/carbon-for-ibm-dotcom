/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BXSideNavLink from '../../../internal/vendor/@carbon/web-components/components/ui-shell/side-nav-link.js';
import settings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './cloud-masthead.scss';
import { carbonElement as customElement } from '../../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: ddsPrefix } = settings;

/**
 * Cloud-specific masthead left nav item.
 *
 * @element dds-cloud-left-nav-item
 */
@customElement(`${ddsPrefix}-cloud-left-nav-item`)
class DDSCloudLeftNavItem extends BXSideNavLink {
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCloudLeftNavItem;
