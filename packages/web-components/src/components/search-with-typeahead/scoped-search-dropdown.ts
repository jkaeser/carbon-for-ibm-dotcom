/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {} from 'lit-element';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSDropdown from '../footer/dropdown';
import styles from './search-with-typeahead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

export {
  DROPDOWN_COLOR_SCHEME,
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
} from '../footer/dropdown';

const { prefix, stablePrefix: ddsPrefix } = settings;

/**
 * Dropdown component to change search scope.
 *
 * @element dds-scoped-search-dropdown
 * @fires bx-select-selected - The custom event fired after the the dropdown value is changed upon a user gesture.
 */
@customElement(`${ddsPrefix}-scoped-search-dropdown`)
class DDSScopedSearchDropdown extends DDSDropdown {
  /**
   * Handles user-initiated selection of a dropdown item
   *
   * @param [item] The dropdown item user wants to select. Absense of this argument means clearing selection.
   */
  protected _handleUserInitiatedSelectItem(item?: any) {
    if (this._selectionShouldChange(item)) {
      const init = {
        bubbles: true,
        composed: true,
        detail: {
          appId: item.value,
        },
      };
      const constructor = this.constructor as typeof DDSScopedSearchDropdown;
      const beforeSelectEvent = new CustomEvent(constructor.eventBeforeSelect, {
        ...init,
        cancelable: true,
      });
      if (this.dispatchEvent(beforeSelectEvent)) {
        this._selectionDidChange(item);
        const afterSelectEvent = new CustomEvent(constructor.eventSelect, init);
        this.dispatchEvent(afterSelectEvent);
      }
    }
  }

  /**
   * The name of the custom event captured to retrieve the new search scope.
   */
  static get eventSelect() {
    return `${prefix}-select-selected`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSScopedSearchDropdown;
