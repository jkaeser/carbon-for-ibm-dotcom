/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Footer)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-footer--default';

/**
 * Sets the correct path (Short language only)
 *
 * @type {string}
 * @private
 */
const _pathShortLanguageOnly =
  '/iframe.html?id=components-footer--short-language-only';

/**
 * Sets the correct path (Micro language only)
 *
 * @type {string}
 * @private
 */
const _pathMicroLanguageOnly =
  '/iframe.html?id=components-footer--micro-language-only';

describe('Footer | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="dds--footer-logo__link"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load locale modal', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.screenshot();
  });

  it('should load the Americas region with its languages and locations', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.get('[data-region="am"]').click();

    cy.get('.bx--locale-modal__locales').should('have.length', 35);

    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('Footer | Americas region selected', {
      widths: [1280],
    });
  });

  it('should be able to search with keywords for locations and languages', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.get('[data-region="am"]').click();
    cy.get('[data-autoid="dds--locale-modal__filter"]').type('mexico', {
      force: true,
    });

    cy.get(
      '.bx--locale-modal__locales:not(.bx--locale-modal__locales-hidden) > div'
    )
      .first()
      .then(e => {
        expect(e.text()).to.equal('Mexico');
      });

    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('Footer | Mexico locale found', {
      widths: [1280],
    });
  });

  it('should load all the 38 navigation links', () => {
    cy.get(`[data-autoid="dds--footer-nav-group__link"]`).should(
      'have.length',
      38
    );
    cy.screenshot();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).should('have.length', 4);

    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });
});

describe('Footer | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="dds--footer-logo__link"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load locale modal', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.screenshot();
  });

  it('should load the Americas region with its languages and locations', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.get('[data-region="am"]').click();

    cy.get('.bx--locale-modal__locales').should('have.length', 35);

    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('Footer | Americas region selected', {
      widths: [1280],
    });
  });

  it('should be able to search with keywords for locations and languages', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.get('[data-region="am"]').click();
    cy.get('[data-autoid="dds--locale-modal__filter"]').type('mexico', {
      force: true,
    });

    cy.get(
      '.bx--locale-modal__locales:not(.bx--locale-modal__locales-hidden) > div'
    )
      .first()
      .then(e => {
        expect(e.text()).to.equal('Mexico');
      });

    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('Footer | Mexico locale found', {
      widths: [1280],
    });
  });

  it('should load all the 38 navigation links', () => {
    cy.get(`[data-autoid="dds--footer-nav-group__link"]`).should(
      'have.length',
      38
    );
    cy.screenshot();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).should('have.length', 4);

    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });
});

describe('Footer | Short language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
    cy.viewport(1280, 780);
  });

  it('should load IBM logo and and be interactive', () => {
    const footerLogo = cy.get('[data-autoid="dds--footer-logo"]');
    footerLogo.should('have.length', 1);
    footerLogo.find('a').each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load language selector dropdown', () => {
    cy.get(`[data-autoid="dds--language-selector"]`).click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Footer | Short language only | desktop dropdown', {
      widths: [1280],
    });
  });

  it('should be able to select a language from combo box', () => {
    cy.get(`[data-autoid="dds--language-selector"]`).click();
    cy.get(`[data-autoid="dds--footer"]`)
      .find(
        `.bx--list-box__menu > .bx--list-box__menu-item:nth-of-type(1) .bx--list-box__menu-item__option`
      )
      .click();
    cy.get(`[data-autoid="dds--language-selector"]`).should(
      'have.value',
      'Arabic / عربية'
    );

    cy.screenshot();
    cy.percySnapshot('Footer | Short language only | desktop combo box', {
      widths: [1280],
    });
  });
});

describe('Footer | Micro language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
    cy.viewport(1280, 780);
  });

  it('should load language selector dropdown', () => {
    cy.get(`[data-autoid="dds--language-selector"]`).click();

    cy.screenshot();
    cy.percySnapshot('Footer | Micro language only | desktop dropdown', {
      widths: [1280],
    });
  });

  it('should be able to select a language from combo box', () => {
    cy.get(`[data-autoid="dds--language-selector"]`).click();
    cy.get(`[data-autoid="dds--footer"]`)
      .find(
        `.bx--list-box__menu > .bx--list-box__menu-item:nth-of-type(1) .bx--list-box__menu-item__option`
      )
      .click();
    cy.get(`[data-autoid="dds--language-selector"]`).should(
      'have.value',
      'Arabic / عربية'
    );

    cy.screenshot();
    cy.percySnapshot('Footer | Micro language only | desktop combobox', {
      widths: [1280],
    });
  });
});

describe('Footer | Short language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
    cy.viewport(320, 780);
  });

  it('should load language selector and be interactive', () => {
    cy.get('[data-autoid="dds--language-selector__select"]').should(
      'have.length',
      1
    );

    const languageSelector = cy.get(
      '[data-autoid="dds--language-selector__select"]'
    );
    languageSelector.select('Arabic / عربية');
    languageSelector.should('have.value', 'ar');

    cy.screenshot();
    cy.percySnapshot('Footer | Short language only | desktop interactive', {
      widths: [320],
    });
  });
});

describe('Footer | Micro language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
    cy.viewport(320, 780);
  });

  it('should load language selector and be interactive', () => {
    cy.get('[data-autoid="dds--language-selector__select"]').should(
      'have.length',
      1
    );

    const languageSelector = cy.get(
      '[data-autoid="dds--language-selector__select"]'
    );
    languageSelector.select('Arabic / عربية');
    languageSelector.should('have.value', 'ar');

    cy.screenshot();
    cy.percySnapshot('Footer | Micro language only | mobile interactive', {
      widths: [320],
    });
  });
});
