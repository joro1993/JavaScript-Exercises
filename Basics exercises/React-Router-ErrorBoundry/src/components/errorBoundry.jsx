import React from 'react';

function refreshPage() {
    window.location.reload(false);
}

class ErrorBoundry extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

   

    render() {
        if(this.state.hasError) {
            return (
            <div>
            <h1>Något gick snett!</h1> 
            <button onClick = {refreshPage}>Ladda om sidan</button>
            </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundry;