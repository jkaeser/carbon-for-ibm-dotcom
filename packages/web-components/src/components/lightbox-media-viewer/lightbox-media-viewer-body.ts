/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, TemplateResult } from 'lit';
import FocusMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/focus.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './lightbox-media-viewer.scss';

const { prefix, stablePrefix: ddsPrefix } = settings;

/**
 * Media viewer modal body.
 */
abstract class DDSLightboxMediaViewerBody extends FocusMixin(LitElement) {
  /**
   * @returns The description content.
   */
  abstract _renderDescription(): TemplateResult | string | void;

  /**
   * @returns The media content.
   */
  abstract _renderMedia(): TemplateResult | string | void;

  /**
   * @returns The title content.
   */
  abstract _renderTitle(): TemplateResult | string | void;

  render() {
    return html`
      <div class="${prefix}--lightbox-media-viewer__container">
        <div class="${prefix}--lightbox-media-viewer__row">
          <div
            class="${prefix}--lightbox-media-viewer__media ${prefix}--no-gutter">
            ${this._renderMedia()}
          </div>
          <div
            class="${prefix}--lightbox-media-viewer__media-description ${prefix}--no-gutter">
            <div class="${prefix}--lightbox-media-viewer__content">
              <div
                part="title"
                class="${prefix}--lightbox-media-viewer__content__title"
                data-autoid="${ddsPrefix}--lightbox-media-viewer__content__title">
                ${this._renderTitle()}
              </div>
              <div
                part="description"
                class="${prefix}--lightbox-media-viewer__content__desc"
                data-autoid="${ddsPrefix}--lightbox-media-viewer__content__desc">
                ${this._renderDescription()}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLightboxMediaViewerBody;
