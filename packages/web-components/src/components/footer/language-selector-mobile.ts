/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import CDSSelect from '../../internal/vendor/@carbon/web-components/components/select/select.js';
import { INPUT_SIZE } from '../../internal/vendor/@carbon/web-components/components/text-input/text-input.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './footer.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: ddsPrefix } = settings;

/**
 * Language selector component - mobile version.
 * The API for language selection is still subject to change.
 *
 * @element dds-language-selector-mobile
 * @internal
 */
@customElement(`${ddsPrefix}-language-selector-mobile`)
class DDSLanguageSelectorMobile extends CDSSelect {
  /**
   * Property that specifies the Select to have size xl
   *
   * @internal
   */
  @property()
  size = INPUT_SIZE.EXTRA_LARGE;

  /**
   * The shadow slot this language-selector should be in.
   */
  @property({ reflect: true })
  slot = 'language-selector';

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLanguageSelectorMobile;
