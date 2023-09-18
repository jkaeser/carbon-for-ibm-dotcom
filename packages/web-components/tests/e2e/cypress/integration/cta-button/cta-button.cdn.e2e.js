/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-button-cta (cdn)', () => {
  it('should load the default cds-button-cta example (cdn)', () => {
    cy.visit('/cta-button/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-button-cta | cdn | default');
  });
});
