/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import Chat20 from '../../internal/vendor/@carbon/web-components/icons/chat/20.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import styles from './masthead.scss';
import C4DMastheadProfile from './masthead-profile';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * The contact button UI in the masthead.
 *
 * @element c4d-masthead-contact
 */
@customElement(`${c4dPrefix}-masthead-contact`)
class C4DMastheadContact extends C4DMastheadProfile {
  /**
   * The `aria-label` attribute for the trigger button.
   */
  @property({ attribute: 'trigger-label' })
  triggerLabel = 'Contact';

  /**
   * Handles cm-app-pane-displayed event fired by CM_APP.
   *
   * @see DOCUMENT_EVENTS live-advisor/cm-app/js/helpers/otherConstants.js
   *   - https://github.ibm.com/live-advisor/cm-app/blob/master/js/helpers/otherConstants.js
   */
  @HostListener('document:cm-app-pane-displayed')
  protected _handleCMAppDisplayed = (_event: CustomEvent) => {
    this.triggerLabel = 'Close contact window';
  };

  /**
   * Handles cm-app-pane-hidden event fired by CM_APP.
   *
   * @see DOCUMENT_EVENTS live-advisor/cm-app/js/helpers/otherConstants.js
   *   - https://github.ibm.com/live-advisor/cm-app/blob/master/js/helpers/otherConstants.js
   */
  @HostListener('document:cm-app-pane-hidden')
  protected _handleCMAppHidden = (_event: CustomEvent) => {
    this.triggerLabel = 'Show contact window';
  };

  render() {
    const { triggerLabel, _handleClick: handleClick } = this;
    return html`
      <a
        href="javascript:void 0"
        class="${prefix}--header__menu-item ${prefix}--header__menu-title"
        aria-label="${ifDefined(triggerLabel)}"
        @click=${handleClick}>
        ${Chat20()}
      </a>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DMastheadContact;
