import React from 'react'

class ErrorBoundary extends React.Component<{}, any> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(){
        this.setState({hasError: true})
    }

    render() {

        if(this.state.hasError === false) {
            return this.props.children;
        }

        return <div>ERROR TRIGGERED</div>
    }
}

export default ErrorBoundary;