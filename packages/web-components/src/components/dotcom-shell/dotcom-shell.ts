/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './dotcom-shell.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Dotcom shell.
 *
 * @element c4d-dotcom-shell
 */
@customElement(`${c4dPrefix}-dotcom-shell`)
class C4DDotcomShell extends StableSelectorMixin(LitElement) {
  render() {
    return html`
      <div class="${prefix}--dotcom-shell__content" part="content">
        <slot></slot>
      </div>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--dotcom-shell`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DDotcomShell;
