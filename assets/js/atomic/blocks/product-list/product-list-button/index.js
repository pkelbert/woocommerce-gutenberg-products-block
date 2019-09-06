/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ProductListButton } from '../../../components/product-list';
import sharedConfig from '../shared-config';

/**
 * Register and run the "All Products" block.
 */
const blockConfig = {
	title: __( 'Product Button', 'woo-gutenberg-products-block' ),
	description: __(
		'Shows the read more/add to cart button for a product within a product grid.',
		'woo-gutenberg-products-block'
	),
	edit( props ) {
		const { className, attributes } = props;

		return (
			<Disabled>
				<ProductListButton className={ className } product={ attributes.product } />
			</Disabled>
		);
	},
};

registerBlockType( 'woocommerce/product-list-button', {
	...sharedConfig,
	...blockConfig,
} );