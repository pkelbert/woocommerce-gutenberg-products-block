/**
 * External dependencies
 */
import {
	clickButton,
	findSidebarPanelToggleButtonWithTitle,
	getAllBlocks,
	insertBlock,
	openDocumentSettingsSidebar,
	switchUserToAdmin,
} from '@wordpress/e2e-test-utils';

import { visitBlockPage } from '@woocommerce/blocks-test-utils';

const block = {
	name: 'Cart',
	slug: 'woocommerce/cart',
	class: '.wc-block-cart',
};

if ( process.env.WP_VERSION < 5.3 || process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );

	it( 'can only be inserted once', async () => {
		await insertBlock( block.name );
		expect( await getAllBlocks() ).toHaveLength( 1 );
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );

	it( 'can toggle Shipping calculator', async () => {
		await openDocumentSettingsSidebar();
		// we focus on the block
		await page.click( block.class );
		await page.click(
			'.components-base-control:first-child .components-form-toggle__input'
		);
		await expect( page ).not.toMatchElement(
			`${ block.class } .wc-block-components-totals-shipping__change-address-button`
		);
		await page.click(
			'.components-base-control:first-child .components-form-toggle__input'
		);
		await expect( page ).toMatchElement(
			`${ block.class } .wc-block-components-totals-shipping__change-address-button`
		);
	} );

	it( 'can toggle shipping costs', async () => {
		await openDocumentSettingsSidebar();
		// we focus on the block
		await page.click( block.class );
		const shippingCostsButton = await findSidebarPanelToggleButtonWithTitle(
			'Hide shipping costs until an address is entered'
		);
		await shippingCostsButton.click( 'button' );
		await expect( page ).toMatchElement(
			`${ block.class } .wc-block-components-totals-shipping__fieldset`
		);
		await shippingCostsButton.click( 'button' );
		await expect( page ).not.toMatchElement(
			`${ block.class } .wc-block-components-totals-shipping__fieldset`
		);
	} );

	it( 'shows empty cart when changing the view', async () => {
		await openDocumentSettingsSidebar();
		// we focus on the block
		await page.click( block.class );
		await clickButton( 'Empty Cart' );
		expect( page ).toMatchElement( '.wc-block-cart__empty-cart__title' );
		await clickButton( 'Full Cart' );
		expect( page ).not.toMatchElement(
			'.wc-block-cart__empty-cart__title'
		);
	} );
} );
