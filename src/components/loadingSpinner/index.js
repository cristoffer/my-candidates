import React from "react";
import './style.scss';

export default function LoadingSpinner ({ isLoading }) {

	if (isLoading) {
		return (
			<div className="loadingSpinner">
				<div className="loadingSpinner__spinner"></div>
			</div>
		)
	} else {
		return '';
	}
}