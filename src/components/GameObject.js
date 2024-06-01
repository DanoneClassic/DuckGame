import React, { forwardRef } from 'react';

const GameObject = forwardRef(({ className, style, children }, ref) => {
    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
});

export default GameObject;