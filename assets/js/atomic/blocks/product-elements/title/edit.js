/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Disabled, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import HeadingToolbar from '@woocommerce/block-components/heading-toolbar';

/**
 * Internal dependencies
 */
import Block from './block';
import withProductSelector from '../shared/with-product-selector';
import ContentPlaceholder from '../shared/content-placeholder';
import { BLOCK_TITLE, BLOCK_ICON } from './constants';

const Edit = ( { attributes, setAttributes } ) => {
	const { headingLevel, productLink } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
				>
					<p>{ __( 'Level', 'woo-gutenberg-products-block' ) }</p>
					<HeadingToolbar
						isCollapsed={ false }
						minLevel={ 1 }
						maxLevel={ 7 }
						selectedLevel={ headingLevel }
						onChange={ ( newLevel ) =>
							setAttributes( { headingLevel: newLevel } )
						}
					/>
					<ToggleControl
						label={ __(
							'Link to Product Page',
							'woo-gutenberg-products-block'
						) }
						help={ __(
							'Links the image to the single product listing.',
							'woo-gutenberg-products-block'
						) }
						checked={ productLink }
						onChange={ () =>
							setAttributes( {
								productLink: ! productLink,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<Disabled>
				<Block
					{ ...attributes }
					placeholder={
						<ContentPlaceholder
							label={ __(
								'The selected product does not have a title.',
								'woo-gutenberg-products-block'
							) }
						/>
					}
				/>
			</Disabled>
		</>
	);
};

export default withProductSelector( Edit, {
	icon: BLOCK_ICON,
	label: BLOCK_TITLE,
	description: __(
		"Choose a product to display it's title.",
		'woo-gutenberg-products-block'
	),
} );
