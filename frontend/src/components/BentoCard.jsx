import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './BentoCard.css';

/**
 * BentoCard - Core layout component for the new design system
 * Features depth, gradient borders, and hover effects
 */
const BentoCard = ({
    children,
    className,
    title,
    subtitle,
    icon,
    colSpan = 1,
    rowSpan = 1,
    onClick,
    interactive = false,
    variant = 'default' // default, primary, glass
}) => {
    const cardClasses = classNames(
        'bento-card',
        `col-span-${colSpan}`,
        `row-span-${rowSpan}`,
        {
            'interactive': interactive || onClick,
            [`variant-${variant}`]: variant
        },
        className
    );

    return (
        <div className={cardClasses} onClick={onClick}>
            {(title || icon) && (
                <div className="bento-header">
                    {icon && <span className="bento-icon">{icon}</span>}
                    <div className="bento-title-group">
                        {title && <h3 className="bento-title">{title}</h3>}
                        {subtitle && <p className="bento-subtitle">{subtitle}</p>}
                    </div>
                </div>
            )}
            <div className="bento-content">
                {children}
            </div>
        </div>
    );
};

BentoCard.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.node,
    colSpan: PropTypes.number,
    rowSpan: PropTypes.number,
    onClick: PropTypes.func,
    interactive: PropTypes.bool,
    variant: PropTypes.oneOf(['default', 'primary', 'glass'])
};

export default BentoCard;
