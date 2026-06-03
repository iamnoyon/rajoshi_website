import React, { useState } from 'react';

/**
 * ThreeDotMenu Component
 * A reusable dropdown menu component with three-dot icon
 * 
 * @param {Object} object - The data object associated with this menu
 * @param {Array} actions - Array of action objects with label, onClick, and isDisabled properties
 * @param {Boolean} isDisabled - Whether the entire menu is disabled
 */
const ThreeDotMenu = ({ object, actions = [], isDisabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = (e) => {
        e.stopPropagation();
        if (!isDisabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleActionClick = (action, e) => {
        e.stopPropagation();
        if (!action.isDisabled && action.onClick) {
            action.onClick(object);
            setIsOpen(false);
        }
    };

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => setIsOpen(false);
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isOpen]);

    return (
        <div className="relative inline-block">
            {/* Three-dot button */}
            <button
                onClick={handleMenuToggle}
                disabled={isDisabled}
                className={`p-2 rounded hover:bg-gray-100 focus:outline-none transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                title="More options"
            >
                <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-1">
                        {actions.length > 0 ? (
                            actions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => handleActionClick(action, e)}
                                    disabled={action.isDisabled}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${action.isDisabled
                                            ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                                            : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                                        }`}
                                >
                                    {action.label}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                                No actions available
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThreeDotMenu;
