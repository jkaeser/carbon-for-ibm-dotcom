/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined.js';
import { html, customElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import Chat20 from '../../internal/vendor/@carbon/web-components/icons/chat/20.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';
import DDSMastheadProfile from './masthead-profile';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The contact button UI in the masthead.
 *
 * @element dds-masthead-contact
 */
@customElement(`${ddsPrefix}-masthead-contact`)
class DDSMastheadContact extends DDSMastheadProfile {
  /**
   * The `aria-label` attribute for the trigger button.
   */
  @property({ attribute: 'trigger-label' })
  triggerLabel = 'Contact';

  /**
   * Handles `cm-app-pane-displayed` event fired by CM_APP.
   *
   * @see DOCUMENT_EVENTS live-advisor/cm-app/js/helpers/otherConstants.js
   *   - https://github.ibm.com/live-advisor/cm-app/blob/master/js/helpers/otherConstants.js
   */
  @HostListener('document:cm-app-pane-displayed')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleCMAppOpened(event: CustomEvent) {
    this.triggerLabel = 'Close chat window';
  }

  /**
   * Handles `cm-app-pane-displayed` event fired by CM_APP.
   *
   * @see DOCUMENT_EVENTS live-advisor/cm-app/js/helpers/otherConstants.js
   *   - https://github.ibm.com/live-advisor/cm-app/blob/master/js/helpers/otherConstants.js
   */
  @HostListener('document:cm-app-pane-hidden')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleCMAppClosed(event: CustomEvent) {
    this.triggerLabel = 'Open chat window';
  }

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

export default DDSMastheadContact;
