/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

const FilterSubmitButton = ( { className, disabled, onClick } ) => {
	return (
		<button
			type="submit"
			className={ classNames(
				'wc-block-filter-submit-button',
				className
			) }
			disabled={ disabled }
			onClick={ onClick }
		>
			{ // translators: Submit button text for filters.
			__( 'Go', 'woo-gutenberg-products-block' ) }
		</button>
	);
};

FilterSubmitButton.propTypes = {
	className: PropTypes.string,
	/**
	 * Is the button disabled?
	 */
	disabled: PropTypes.bool,
	/**
	 * On click callback.
	 */
	onClick: PropTypes.func.isRequired,
};

FilterSubmitButton.defaultProps = {
	disabled: false,
};

export default FilterSubmitButton;