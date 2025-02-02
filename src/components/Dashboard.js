import React, { Component } from "react";

import classnames from "classnames";

//import Loading from "./Loading";

import Panel from "./Panel";

//state = { loading: true }

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {
  
  state = {
    loading: false,
    focused: null
  };

  selectPanel = id => {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
  };

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
    });

    const panels = (this.state.focused ? data.filter(panel => this.state.
      focused === panel.id) : data).map(panel => (<Panel
                                                        key={panel.id}
                                                        label={panel.label}
                                                        value={panel.value}
                                                        onSelect={event => this.selectPanel(panel.id)}/>
    ));

    return <main className={dashboardClasses}>{panels}</main>	 
  }
}

export default Dashboard;