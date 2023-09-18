/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import CDSModal, {
  MODAL_SIZE,
} from '../../internal/vendor/@carbon/web-components/components/modal/modal.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './leaving-ibm.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Leaving IBM Modal.
 *
 * @element c4d-leaving-ibm-modal
 */
@customElement(`${c4dPrefix}-leaving-ibm-modal`)
class C4DLeavingIbmModal extends StableSelectorMixin(CDSModal) {
  /**
   * The unique ID for ID ref.
   */
  private _uniqueId = `__${c4dPrefix}-leaving-ibm-modal__${Math.random()
    .toString(36)
    .slice(2)}`;

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  @HostListener('shadowRoot:slotchange')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleSlotChange = (event: Event) => {
    const { selectorHeading } = this.constructor as typeof C4DLeavingIbmModal;
    if (!this.hasAttribute('aria-labelledby')) {
      const headingNode = (event.target as HTMLSlotElement)
        .assignedNodes()
        .reduce((acc, node) => {
          if ((node as Element).matches?.(selectorHeading)) {
            acc.push(node);
          } else {
            acc.push(
              ...((node as Element).querySelectorAll?.(selectorHeading) ?? [])
            );
          }
          return acc;
        }, [] as Node[])[0] as Element | void;
      if (headingNode) {
        if (!headingNode.id) {
          const { id, _uniqueId: uniqueId } = this;
          headingNode.id = id || uniqueId;
        }
        if (headingNode.id) {
          this.setAttribute('aria-labelledby', headingNode.id);
        }
      }
    }
  };

  /**
   * Modal size.
   */
  @property({ reflect: true })
  size = MODAL_SIZE.SMALL;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'dialog');
    }
    super.connectedCallback();
  }

  /**
   * A selector selecting the heading.
   */
  static get selectorHeading() {
    return `${c4dPrefix}-leaving-ibm-modal-heading`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader

  static get stableSelector() {
    return `${c4dPrefix}--leaving-ibm-modal`;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLeavingIbmModal;
