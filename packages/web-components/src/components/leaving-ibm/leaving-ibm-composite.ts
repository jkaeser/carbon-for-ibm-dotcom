/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import CDSModal from '../../internal/vendor/@carbon/web-components/components/modal/modal.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import {
  LeavingIBMLabels,
  Translation,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import './leaving-ibm-modal';
import './leaving-ibm-modal-body';
import './leaving-ibm-modal-heading';
import './leaving-ibm-modal-supplemental';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import '../../internal/vendor/@carbon/web-components/components/modal/modal-header.js';
import '../../internal/vendor/@carbon/web-components/components/modal/modal-close-button.js';
import '../../internal/vendor/@carbon/web-components/components/modal/modal-footer.js';
import '../../internal/vendor/@carbon/web-components/components/button/button.js';
import styles from './leaving-ibm.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Component that renders leaving IBM modal component.
 *
 * @element c4d-leaving-ibm-composite
 */
@customElement(`${c4dPrefix}-leaving-ibm-composite`)
class C4DLeavingIbmComposite extends HostListenerMixin(
  ModalRenderMixin(LitElement)
) {
  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage?: (string) => void;

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in.
   *
   * @internal
   */
  _loadTranslation?: (language?: string) => Promise<Translation>;

  /**
   * Leaving IBM modal copy
   */
  @property({ attribute: false })
  leavingIbmCopy: LeavingIBMLabels = {
    LEAVING001: '',
    LEAVING002: '',
    LEAVING003: '',
  };

  /**
   * Leaving IBM modal button label
   */
  @property({ attribute: false })
  leavingIbmButtonLabel = '';

  /**
   * The language used for query.
   */
  @property()
  language?: string;

  /**
   * `true` to open the modal.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * external url triggering the leaving ibm modal.
   */
  @property({ reflect: true })
  href = '';

  @HostListener('document:click')
  protected _handleDocumentClick = (event: PointerEvent): void => {
    const { attributeLeaving } = this
      .constructor as typeof C4DLeavingIbmComposite;
    if (!this.open) {
      const { target } = event;
      const linkTarget =
        target instanceof HTMLAnchorElement
          ? target
          : (event.composedPath().find((pathTarget) => {
              return pathTarget instanceof HTMLAnchorElement;
            }) as HTMLAnchorElement | undefined);

      if (linkTarget) {
        const linkIsExternal = linkTarget.hasAttribute(attributeLeaving);
        const targetIsExternal =
          target instanceof Element && target.hasAttribute(attributeLeaving);

        if (linkIsExternal || targetIsExternal) {
          event.preventDefault();
          this.href = linkTarget.href;
          this.open = true;
        }
      }
    }
  };

  @HostListener(`document:${CDSModal.eventClose}`)
  protected handleEventClose = (): void => {
    this.open = false;
    this.href = '';
  };

  firstUpdated() {
    const { language } = this;
    if (language) {
      this._setLanguage?.(language);
    }
    this._loadTranslation?.(language).catch(() => {}); // The error is logged in the Redux store
  }

  updated(changedProperties) {
    if (changedProperties.has('language')) {
      const { language } = this;
      if (language) {
        this._setLanguage?.(language);
      }
    }
  }

  renderModal() {
    const { open, leavingIbmCopy, leavingIbmButtonLabel, href } = this;
    return html`
      <c4d-leaving-ibm-modal ?open="${open}">
        <cds-modal-header>
          <cds-modal-close-button></cds-modal-close-button>
          <c4d-leaving-ibm-modal-heading
            >${leavingIbmCopy?.LEAVING001}</c4d-leaving-ibm-modal-heading
          >
        </cds-modal-header>
        <c4d-leaving-ibm-modal-body href="${href}">
          <p>${leavingIbmCopy?.LEAVING002}</p>
          <c4d-leaving-ibm-modal-supplemental
            >${leavingIbmCopy?.LEAVING003}</c4d-leaving-ibm-modal-supplemental
          >
        </c4d-leaving-ibm-modal-body>
        <cds-modal-footer>
          <cds-button
            data-autoid="${c4dPrefix}--leaving-ibm-cta"
            href="${href}"
            kind="primary"
            >${leavingIbmButtonLabel}</cds-button
          >
        </cds-modal-footer>
      </c4d-leaving-ibm-modal>
    `;
  }

  /**
   * Attribute that triggers Leaving IBM modal on click.
   */
  static get attributeLeaving() {
    return 'data-leaving-ibm';
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLeavingIbmComposite;
