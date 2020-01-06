import * as React from "react";

export interface IButtonProperties {
  label: string;
  onClick: () => void;
}

export interface IButtonState {
  toggle: boolean;
}

export class Button extends React.Component<IButtonProperties, IButtonState> {

  public constructor(props: IButtonProperties) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  public render(): JSX.Element {
    return (<div>
      <h2>{ !this.state.toggle ? "1" : "2"}</h2>
      <button className="btn btn-primary"
      onClick={ (event: React.MouseEvent<HTMLButtonElement>): void => { this.handleClick(event); } }>
        {this.props.label}
      </button>
    </div>);
  }

  protected handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    this.props.onClick();
    this.setState({
      toggle: !this.state.toggle,
    });
  }
}
