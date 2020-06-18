import React from 'react';

class DangerFetch extends React.Component {
    render() {
        var r = Math.random();
        if (r < 0.2) {
            throw new Error ("Failed to fetch the data")
        }

        return (
            <div>Hämtade ett slumpmässigt tal från servern: {r}</div>
        );
    }
}

export default DangerFetch;