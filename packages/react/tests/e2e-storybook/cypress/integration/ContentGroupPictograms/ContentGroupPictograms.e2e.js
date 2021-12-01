/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Content Group Pictograms Default)
 *
 * @type {string}
 * @private
 */
const _pathDefault =
  '/iframe.html?id=components-content-group-pictograms--default';

/**
 * Sets parameters to render Pictogram Items with CTA
 *
 * @type {string}
 * @private
 */
const _withCTA =
  '&knob-Number%20of%20PictogramItems_ContentGroupPictograms=3&knob-Item%202%20CTA%20(items.cta)_ContentGroupPictograms=true&knob-Item%201%20CTA%20(items.cta)_ContentGroupPictograms=true&knob-Item%203%20CTA%20(items.cta)_ContentGroupPictograms=true';

/**
 * Sets parameters to render Pictogram Items with custom pictograms
 *
 * @type {string}
 * @private
 */
const _withCustomPictograms =
  '&knob-Number%20of%20PictogramItems_ContentGroupPictograms=3&knob-Item%201%20Pictogram%20(pictogram)_ContentGroupPictograms=TouchScreen&knob-Item%202%20Pictogram%20(pictogram)_ContentGroupPictograms=Touch&knob-Item%203%20Pictogram%20(pictogram)_ContentGroupPictograms=Pattern';

describe('dds-content-group-pictograms | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
  });

  it('should load content group heading and copy before the pictograms', () => {
    cy.get(`[data-autoid="dds--content-group__children"]`).then(() => {
      cy.get(`[data-autoid="dds--content-group"]`)
        .find(`[data-autoid="dds--content-group__title"]`)
        .should('be.visible');

      cy.get(`[data-autoid="dds--content-group"]`)
        .find(`div.bx--content-group__copy p`)
        .should('be.visible');
    });

    cy.takeSnapshots();
  });

  it('should load pictogram item and content', () => {
    cy.visit(`/${_pathDefault}${_withCTA}`);
    cy.viewport(1280, 780);

    cy.wait(100);

    cy.get(
      `[data-autoid="dds--content-group__children"] .bx--pictogram-item`
    ).each($item => {
      cy.wrap($item).within(() => {
        cy.get('[data-autoid="dds--pictogram-item__pictogram"]').should(
          'be.visible'
        );

        cy.get('[data-autoid="dds--content-item__heading"]').should(
          'be.visible'
        );

        cy.get('[data-autoid="dds--content-item__copy"]').should('be.visible');

        cy.get('[data-autoid="dds--link-with-icon"]').should('be.visible');
      });
    });

    cy.takeSnapshots();
  });

  it('should have CTA Link with icon loaded and clickable for each pictogram', () => {
    cy.visit(`/${_pathDefault}${_withCTA}`);
    cy.viewport(1280, 780);

    cy.get(
      `[data-autoid="dds--content-group__children"] .bx--pictogram-item`
    ).each($item => {
      cy.wrap($item).within(() => {
        cy.get('[data-autoid="dds--link-with-icon"]')
          .find('a')
          .each($link => {
            const url = $link.prop('href');
            expect(url).not.to.be.empty;
          });
      });
    });

    cy.takeSnapshots();
  });

  it('should have customizable pictogram SVG', () => {
    cy.visit(`/${_pathDefault}${_withCustomPictograms}`);
    cy.viewport(1280, 780);

    cy.get(
      `[data-autoid="dds--content-group__children"] .bx--pictogram-item:nth-child(1) svg path`
    ).then($pictogram => {
      expect($pictogram).to.have.attr(
        'd',
        'M13.002,30.36c-2.405,0-4.362-2.027-4.362-4.519V15.037c0-0.771,0.609-1.397,1.358-1.397	s1.358,0.626,1.358,1.397l0.003,3.354c0.191-0.105,0.409-0.166,0.641-0.166c0.51,0,0.956,0.291,1.188,0.72	c0.227-0.174,0.509-0.277,0.813-0.277c0.596,0,1.104,0.397,1.286,0.948c0.208-0.133,0.453-0.21,0.715-0.21	c0.749,0,1.358,0.627,1.358,1.397v5.039C17.36,28.333,15.405,30.36,13.002,30.36z M9.998,14.36c-0.352,0-0.638,0.304-0.638,0.677	v10.805c0,2.095,1.634,3.798,3.643,3.798c2.006,0,3.638-1.703,3.638-3.798v-5.039c0-0.373-0.286-0.677-0.638-0.677	s-0.638,0.304-0.638,0.677v1.196c0,0.198-0.161,0.359-0.359,0.36l0,0c-0.198,0-0.359-0.161-0.36-0.359l-0.005-1.935	c0-0.374-0.286-0.678-0.638-0.678c-0.354,0-0.642,0.304-0.642,0.677l0.004,1.934c0,0.199-0.16,0.36-0.359,0.361l0,0	c-0.199,0-0.359-0.161-0.36-0.359l-0.005-2.378v-0.001c0-0.373-0.286-0.676-0.638-0.676s-0.638,0.303-0.638,0.676v2.378	c0,0.199-0.161,0.36-0.36,0.36s-0.36-0.161-0.36-0.36l-0.005-6.961C10.636,14.664,10.35,14.36,9.998,14.36z M31,29.36h-9	c-0.199,0-0.36-0.161-0.36-0.36v-7.64H19v-0.72h6.64v-2.28H19v-0.72h6.64V2.36H1.36v15.28H7v0.721H1.36v2.279H7v0.721H1	c-0.199,0-0.36-0.161-0.36-0.36V2c0-0.199,0.161-0.36,0.36-0.36h25c0.199,0,0.36,0.161,0.36,0.36v10.64H31	c0.199,0,0.36,0.161,0.36,0.36v16C31.36,29.199,31.199,29.36,31,29.36z M22.36,28.64h8.279v-2.28H22.36V28.64z M22.36,25.64h8.279	V13.36H26.36V21c0,0.199-0.161,0.36-0.36,0.36h-3.64V25.64z'
      );
    });

    cy.get(
      `[data-autoid="dds--content-group__children"] .bx--pictogram-item:nth-child(2) svg path`
    ).then($pictogram => {
      expect($pictogram).to.have.attr(
        'd',
        'M19.77,31.36c-5.067,0-7.409-2.218-10.404-5.602c-0.844-0.953-3.435-3.76-3.435-3.76L5.43,21.444	c-1.217-1.339-1.79-2.018-1.79-2.459c0-0.541,0.374-1.022,1.052-1.357c1.188-0.586,3.129-0.646,4.319,0.269	c0.895,0.688,2.677,2.611,3.629,3.663V7c0-1.388,0.968-2.357,2.354-2.36c0,0,0,0,0.001,0c0,0,0.001,0,0.003,0	c0.001,0,0.002,0,0.003,0C16.391,4.643,17.36,5.612,17.36,7v7.64h6.552c2.536,0,4.448,1.778,4.448,4.136v4.01	C28.36,27.239,27.319,31.36,19.77,31.36z M6.465,21.516c0.002,0.002,2.595,2.811,3.44,3.767c2.865,3.236,5.099,5.357,9.865,5.357	c6.532,0,7.87-3.14,7.87-7.854v-4.01c0-1.948-1.603-3.417-3.728-3.417H17c-0.199,0-0.36-0.161-0.36-0.36V7	c0-0.98-0.66-1.639-1.642-1.64C14.019,5.361,13.36,6.02,13.36,7v15.5c0,0.149-0.092,0.283-0.232,0.337	c-0.139,0.054-0.298,0.015-0.397-0.099c-0.03-0.033-2.983-3.368-4.158-4.271c-0.925-0.709-2.589-0.673-3.562-0.192	c-0.413,0.203-0.65,0.463-0.65,0.711c0.057,0.274,1.063,1.38,1.603,1.975L6.465,21.516z M10.755,11.729	C9.407,10.535,8.634,8.811,8.634,7c0-3.507,2.853-6.36,6.36-6.36s6.36,2.853,6.36,6.36c0,1.811-0.773,3.534-2.121,4.729	l-0.479-0.539c1.194-1.058,1.879-2.585,1.879-4.19c0-3.11-2.529-5.64-5.64-5.64c-3.11,0-5.64,2.53-5.64,5.64	c0,1.605,0.685,3.133,1.879,4.19L10.755,11.729z'
      );
    });

    cy.get(
      `[data-autoid="dds--content-group__children"] .bx--pictogram-item:nth-child(3) svg path`
    ).then($pictogram => {
      expect($pictogram).to.have.attr(
        'd',
        'M29,31.36H13c-1.301,0-2.36-1.059-2.36-2.36v-7.64H3c-1.301,0-2.36-1.059-2.36-2.36V3	c0-1.301,1.059-2.36,2.36-2.36h16c1.302,0,2.36,1.059,2.36,2.36v7.64H29c1.302,0,2.36,1.059,2.36,2.36v16	C31.36,30.302,30.302,31.36,29,31.36z M11.36,21.36V29c0,0.904,0.736,1.64,1.64,1.64h16c0.904,0,1.64-0.735,1.64-1.64V13	c0-0.904-0.735-1.64-1.64-1.64h-7.64V19c0,1.302-1.059,2.36-2.36,2.36H11.36z M19,18.36c-0.353,0-0.64,0.287-0.64,0.64v1	c0,0.353,0.287,0.64,0.64,0.64c0.904,0,1.64-0.735,1.64-1.64c0-0.353-0.287-0.64-0.64-0.64H19z M11,20.64h6.8	c-0.102-0.19-0.16-0.408-0.16-0.64v-1c0-0.75,0.61-1.36,1.36-1.36h1c0.231,0,0.449,0.059,0.64,0.16v-7.6	c-0.19,0.103-0.408,0.16-0.64,0.16h-1c-0.75,0-1.36-0.61-1.36-1.36V8c0-0.75,0.61-1.36,1.36-1.36h1c0.231,0,0.449,0.058,0.64,0.16V3	c0-0.904-0.735-1.64-1.64-1.64h-3.8c0.103,0.191,0.16,0.409,0.16,0.64v1c0,0.75-0.61,1.36-1.36,1.36h-1c-0.75,0-1.36-0.61-1.36-1.36	V2c0-0.231,0.058-0.449,0.16-0.64H4.2C4.302,1.551,4.36,1.769,4.36,2v1c0,0.75-0.61,1.36-1.36,1.36H2	c-0.231,0-0.449-0.058-0.64-0.16v7.6c0.191-0.103,0.409-0.16,0.64-0.16h1c0.75,0,1.36,0.61,1.36,1.36v1c0,0.75-0.61,1.36-1.36,1.36	H2c-0.231,0-0.449-0.058-0.64-0.16V19c0,0.904,0.736,1.64,1.64,1.64h3.8C6.697,20.45,6.64,20.232,6.64,20v-1	c0-0.75,0.61-1.36,1.36-1.36h1c0.75,0,1.36,0.61,1.36,1.36v1c0,0.231-0.058,0.449-0.16,0.64H11z M8,18.36	c-0.353,0-0.64,0.287-0.64,0.64v1c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64v-1c0-0.353-0.287-0.64-0.64-0.64H8z M1.36,14c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64v-1c0-0.353-0.287-0.64-0.64-0.64H2	c-0.353,0-0.64,0.287-0.64,0.64V14z M19,7.36c-0.353,0-0.64,0.287-0.64,0.64v1c0,0.353,0.287,0.64,0.64,0.64h1	c0.353,0,0.64-0.287,0.64-0.64V8c0-0.353-0.287-0.64-0.64-0.64H19z M13,1.36c-0.353,0-0.64,0.287-0.64,0.64v1	c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64V2c0-0.353-0.287-0.64-0.64-0.64H13z M1.36,3	c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64V2c0-0.353-0.287-0.64-0.64-0.64C2.096,1.36,1.36,2.096,1.36,3z M14,15.36h-1c-0.75,0-1.36-0.61-1.36-1.36v-1c0-0.75,0.61-1.36,1.36-1.36h1c0.75,0,1.36,0.61,1.36,1.36v1	C15.36,14.75,14.75,15.36,14,15.36z M13,12.36c-0.353,0-0.64,0.287-0.64,0.64v1c0,0.353,0.287,0.64,0.64,0.64h1	c0.353,0,0.64-0.287,0.64-0.64v-1c0-0.353-0.287-0.64-0.64-0.64H13z M9,10.36H8c-0.75,0-1.36-0.61-1.36-1.36V8	c0-0.75,0.61-1.36,1.36-1.36h1c0.75,0,1.36,0.61,1.36,1.36v1C10.36,9.75,9.75,10.36,9,10.36z M8,7.36C7.647,7.36,7.36,7.647,7.36,8	v1c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64V8c0-0.353-0.287-0.64-0.64-0.64H8z'
      );
    });

    cy.takeSnapshots();
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);

    cy.carbonThemesScreenshot();
  });
});

describe('dds-content-group-pictograms | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should load content group heading and copy before the pictograms', () => {
    cy.get(`[data-autoid="dds--content-group__children"]`).then(() => {
      cy.get(`[data-autoid="dds--content-group"]`)
        .find(`[data-autoid="dds--content-group__title"]`)
        .should('be.visible');

      cy.get(`[data-autoid="dds--content-group"]`)
        .find(`div.bx--content-group__copy p`)
        .should('be.visible');
    });

    cy.takeSnapshots('mobile');
  });

  it('should load pictogram item and content', () => {
    cy.visit(`/${_pathDefault}${_withCTA}`);
    cy.viewport(320, 780);

    cy.wait(100);

    cy.get(
      `[data-autoid="dds--content-group__children"] .bx--pictogram-item`
    ).each($item => {
      cy.wrap($item).within(() => {
        cy.get('[data-autoid="dds--pictogram-item__pictogram"]').should(
          'be.visible'
        );

        cy.get('[data-autoid="dds--content-item__heading"]').should(
          'be.visible'
        );

        cy.get('[data-autoid="dds--content-item__copy"]').should('be.visible');

        cy.get('[data-autoid="dds--link-with-icon"]').should('be.visible');
      });
    });

    cy.takeSnapshots('mobile');
  });

  it('should have CTA Link with icon loaded and clickable for each pictogram', () => {
    cy.visit(`/${_pathDefault}${_withCTA}`);
    cy.viewport(320, 780);

    cy.get(
      `[data-autoid="dds--content-group__children"] .bx--pictogram-item`
    ).each($item => {
      cy.wrap($item).within(() => {
        cy.get('[data-autoid="dds--link-with-icon"]')
          .find('a')
          .each($link => {
            const url = $link.prop('href');
            expect(url).not.to.be.empty;
          });
      });
    });

    cy.takeSnapshots('mobile');
  });

  it('should have customizable pictogram SVG', () => {
    // TODO d. Pictogram item can be customized (desktop, touch, pattern)

    cy.visit(`/${_pathDefault}${_withCustomPictograms}`);
    cy.viewport(320, 780);

    cy.get(
      `[data-autoid="dds--content-group__children"] .bx--pictogram-item:nth-child(1) svg path`
    ).then($pictogram => {
      expect($pictogram).to.have.attr(
        'd',
        'M13.002,30.36c-2.405,0-4.362-2.027-4.362-4.519V15.037c0-0.771,0.609-1.397,1.358-1.397	s1.358,0.626,1.358,1.397l0.003,3.354c0.191-0.105,0.409-0.166,0.641-0.166c0.51,0,0.956,0.291,1.188,0.72	c0.227-0.174,0.509-0.277,0.813-0.277c0.596,0,1.104,0.397,1.286,0.948c0.208-0.133,0.453-0.21,0.715-0.21	c0.749,0,1.358,0.627,1.358,1.397v5.039C17.36,28.333,15.405,30.36,13.002,30.36z M9.998,14.36c-0.352,0-0.638,0.304-0.638,0.677	v10.805c0,2.095,1.634,3.798,3.643,3.798c2.006,0,3.638-1.703,3.638-3.798v-5.039c0-0.373-0.286-0.677-0.638-0.677	s-0.638,0.304-0.638,0.677v1.196c0,0.198-0.161,0.359-0.359,0.36l0,0c-0.198,0-0.359-0.161-0.36-0.359l-0.005-1.935	c0-0.374-0.286-0.678-0.638-0.678c-0.354,0-0.642,0.304-0.642,0.677l0.004,1.934c0,0.199-0.16,0.36-0.359,0.361l0,0	c-0.199,0-0.359-0.161-0.36-0.359l-0.005-2.378v-0.001c0-0.373-0.286-0.676-0.638-0.676s-0.638,0.303-0.638,0.676v2.378	c0,0.199-0.161,0.36-0.36,0.36s-0.36-0.161-0.36-0.36l-0.005-6.961C10.636,14.664,10.35,14.36,9.998,14.36z M31,29.36h-9	c-0.199,0-0.36-0.161-0.36-0.36v-7.64H19v-0.72h6.64v-2.28H19v-0.72h6.64V2.36H1.36v15.28H7v0.721H1.36v2.279H7v0.721H1	c-0.199,0-0.36-0.161-0.36-0.36V2c0-0.199,0.161-0.36,0.36-0.36h25c0.199,0,0.36,0.161,0.36,0.36v10.64H31	c0.199,0,0.36,0.161,0.36,0.36v16C31.36,29.199,31.199,29.36,31,29.36z M22.36,28.64h8.279v-2.28H22.36V28.64z M22.36,25.64h8.279	V13.36H26.36V21c0,0.199-0.161,0.36-0.36,0.36h-3.64V25.64z'
      );
    });

    cy.get(
      `[data-autoid="dds--content-group__children"] .bx--pictogram-item:nth-child(2) svg path`
    ).then($pictogram => {
      expect($pictogram).to.have.attr(
        'd',
        'M19.77,31.36c-5.067,0-7.409-2.218-10.404-5.602c-0.844-0.953-3.435-3.76-3.435-3.76L5.43,21.444	c-1.217-1.339-1.79-2.018-1.79-2.459c0-0.541,0.374-1.022,1.052-1.357c1.188-0.586,3.129-0.646,4.319,0.269	c0.895,0.688,2.677,2.611,3.629,3.663V7c0-1.388,0.968-2.357,2.354-2.36c0,0,0,0,0.001,0c0,0,0.001,0,0.003,0	c0.001,0,0.002,0,0.003,0C16.391,4.643,17.36,5.612,17.36,7v7.64h6.552c2.536,0,4.448,1.778,4.448,4.136v4.01	C28.36,27.239,27.319,31.36,19.77,31.36z M6.465,21.516c0.002,0.002,2.595,2.811,3.44,3.767c2.865,3.236,5.099,5.357,9.865,5.357	c6.532,0,7.87-3.14,7.87-7.854v-4.01c0-1.948-1.603-3.417-3.728-3.417H17c-0.199,0-0.36-0.161-0.36-0.36V7	c0-0.98-0.66-1.639-1.642-1.64C14.019,5.361,13.36,6.02,13.36,7v15.5c0,0.149-0.092,0.283-0.232,0.337	c-0.139,0.054-0.298,0.015-0.397-0.099c-0.03-0.033-2.983-3.368-4.158-4.271c-0.925-0.709-2.589-0.673-3.562-0.192	c-0.413,0.203-0.65,0.463-0.65,0.711c0.057,0.274,1.063,1.38,1.603,1.975L6.465,21.516z M10.755,11.729	C9.407,10.535,8.634,8.811,8.634,7c0-3.507,2.853-6.36,6.36-6.36s6.36,2.853,6.36,6.36c0,1.811-0.773,3.534-2.121,4.729	l-0.479-0.539c1.194-1.058,1.879-2.585,1.879-4.19c0-3.11-2.529-5.64-5.64-5.64c-3.11,0-5.64,2.53-5.64,5.64	c0,1.605,0.685,3.133,1.879,4.19L10.755,11.729z'
      );
    });

    cy.get(
      `[data-autoid="dds--content-group__children"] .bx--pictogram-item:nth-child(3) svg path`
    ).then($pictogram => {
      expect($pictogram).to.have.attr(
        'd',
        'M29,31.36H13c-1.301,0-2.36-1.059-2.36-2.36v-7.64H3c-1.301,0-2.36-1.059-2.36-2.36V3	c0-1.301,1.059-2.36,2.36-2.36h16c1.302,0,2.36,1.059,2.36,2.36v7.64H29c1.302,0,2.36,1.059,2.36,2.36v16	C31.36,30.302,30.302,31.36,29,31.36z M11.36,21.36V29c0,0.904,0.736,1.64,1.64,1.64h16c0.904,0,1.64-0.735,1.64-1.64V13	c0-0.904-0.735-1.64-1.64-1.64h-7.64V19c0,1.302-1.059,2.36-2.36,2.36H11.36z M19,18.36c-0.353,0-0.64,0.287-0.64,0.64v1	c0,0.353,0.287,0.64,0.64,0.64c0.904,0,1.64-0.735,1.64-1.64c0-0.353-0.287-0.64-0.64-0.64H19z M11,20.64h6.8	c-0.102-0.19-0.16-0.408-0.16-0.64v-1c0-0.75,0.61-1.36,1.36-1.36h1c0.231,0,0.449,0.059,0.64,0.16v-7.6	c-0.19,0.103-0.408,0.16-0.64,0.16h-1c-0.75,0-1.36-0.61-1.36-1.36V8c0-0.75,0.61-1.36,1.36-1.36h1c0.231,0,0.449,0.058,0.64,0.16V3	c0-0.904-0.735-1.64-1.64-1.64h-3.8c0.103,0.191,0.16,0.409,0.16,0.64v1c0,0.75-0.61,1.36-1.36,1.36h-1c-0.75,0-1.36-0.61-1.36-1.36	V2c0-0.231,0.058-0.449,0.16-0.64H4.2C4.302,1.551,4.36,1.769,4.36,2v1c0,0.75-0.61,1.36-1.36,1.36H2	c-0.231,0-0.449-0.058-0.64-0.16v7.6c0.191-0.103,0.409-0.16,0.64-0.16h1c0.75,0,1.36,0.61,1.36,1.36v1c0,0.75-0.61,1.36-1.36,1.36	H2c-0.231,0-0.449-0.058-0.64-0.16V19c0,0.904,0.736,1.64,1.64,1.64h3.8C6.697,20.45,6.64,20.232,6.64,20v-1	c0-0.75,0.61-1.36,1.36-1.36h1c0.75,0,1.36,0.61,1.36,1.36v1c0,0.231-0.058,0.449-0.16,0.64H11z M8,18.36	c-0.353,0-0.64,0.287-0.64,0.64v1c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64v-1c0-0.353-0.287-0.64-0.64-0.64H8z M1.36,14c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64v-1c0-0.353-0.287-0.64-0.64-0.64H2	c-0.353,0-0.64,0.287-0.64,0.64V14z M19,7.36c-0.353,0-0.64,0.287-0.64,0.64v1c0,0.353,0.287,0.64,0.64,0.64h1	c0.353,0,0.64-0.287,0.64-0.64V8c0-0.353-0.287-0.64-0.64-0.64H19z M13,1.36c-0.353,0-0.64,0.287-0.64,0.64v1	c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64V2c0-0.353-0.287-0.64-0.64-0.64H13z M1.36,3	c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64V2c0-0.353-0.287-0.64-0.64-0.64C2.096,1.36,1.36,2.096,1.36,3z M14,15.36h-1c-0.75,0-1.36-0.61-1.36-1.36v-1c0-0.75,0.61-1.36,1.36-1.36h1c0.75,0,1.36,0.61,1.36,1.36v1	C15.36,14.75,14.75,15.36,14,15.36z M13,12.36c-0.353,0-0.64,0.287-0.64,0.64v1c0,0.353,0.287,0.64,0.64,0.64h1	c0.353,0,0.64-0.287,0.64-0.64v-1c0-0.353-0.287-0.64-0.64-0.64H13z M9,10.36H8c-0.75,0-1.36-0.61-1.36-1.36V8	c0-0.75,0.61-1.36,1.36-1.36h1c0.75,0,1.36,0.61,1.36,1.36v1C10.36,9.75,9.75,10.36,9,10.36z M8,7.36C7.647,7.36,7.36,7.647,7.36,8	v1c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64V8c0-0.353-0.287-0.64-0.64-0.64H8z'
      );
    });

    cy.takeSnapshots('mobile');
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);

    cy.carbonThemesScreenshot(
      {},
      {
        widths: [320],
      }
    );
  });
});
