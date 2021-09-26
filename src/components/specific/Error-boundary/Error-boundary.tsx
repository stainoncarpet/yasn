import React from 'react';

//@ts-ignore
import clock from "./clock.png";

import Heading from '../../common/Heading/Heading';

import "./Error-boundary.scss";

interface State {
    hasError: boolean
}

class ErrorBoundary extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch = () => this.setState({ hasError: true });


    componentWillUnmount = () => this.setState({ hasError: false });

    render = () => {
        return this.state.hasError === false ? this.props.children : <div className="error-boundary p-1">
            <div className="container has-text-centered">
                <div className="error-image-container p-2">
                    <img src={clock} alt="broken-clock" />
                </div>
                <div className="error-text">
                    <Heading type={1}>Something went wrong</Heading>
                    <p>A broken clock is right twice a day. But if you just have one clock, it’s impossible to tell exactly when the clock is right. So it could be right at any moment. And that brings you to the crux of the conceptualization. What is time? Nothing but an abyss. Clocks are just false attempts to harness its power. It’s cruel really.
                        <a href="/"> Go back.</a>
                    </p>
                </div>
            </div>
        </div>
    }
}

export default ErrorBoundary;