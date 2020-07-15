/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { AddToCartFormContextProvider } from '@woocommerce/base-context';
import { useProductDataContext } from '@woocommerce/shared-context';
import { isEmpty } from 'lodash';
import { withProductDataContext } from '@woocommerce/shared-hocs';

/**
 * Internal dependencies
 */
import './style.scss';
import { AddToCartButton } from './shared';
import {
	SimpleProductForm,
	VariableProductForm,
	ExternalProductForm,
	GroupedProductForm,
} from './product-types';

/**
 * Product Add to Form Block Component.
 *
 * @param {Object} props                     Incoming props.
 * @param {string} [props.className]         CSS Class name for the component.
 * @param {boolean} [props.showFormElements] Should form elements be shown?
 * @return {*} The component.
 */
const Block = ( { className, showFormElements } ) => {
	const { product } = useProductDataContext();
	const componentClass = classnames(
		className,
		'wc-block-components-product-add-to-cart',
		{
			'wc-block-components-product-add-to-cart--placeholder': isEmpty(
				product
			),
		}
	);

	return (
		<AddToCartFormContextProvider
			product={ product || {} }
			showFormElements={ showFormElements }
		>
			<div className={ componentClass }>
				<>
					{ showFormElements ? (
						<AddToCartForm
							productType={ product?.type || 'simple' }
						/>
					) : (
						<AddToCartButton />
					) }
				</>
			</div>
		</AddToCartFormContextProvider>
	);
};

const AddToCartForm = ( { productType } ) => {
	if ( productType === 'variable' ) {
		return <VariableProductForm />;
	}
	if ( productType === 'grouped' ) {
		return <GroupedProductForm />;
	}
	if ( productType === 'external' ) {
		return <ExternalProductForm />;
	}
	if ( productType === 'simple' || productType === 'variation' ) {
		return <SimpleProductForm />;
	}
	return null;
};

Block.propTypes = {
	className: PropTypes.string,
};

export default withProductDataContext( Block );
