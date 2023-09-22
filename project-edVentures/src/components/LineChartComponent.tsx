import React, { Component, RefObject } from 'react';
import Chart from 'chart.js/auto';

interface Props {
  labels: string[];
  values: number[];
}

class LineChartComponent extends Component<Props> {
  private chartRef: RefObject<HTMLCanvasElement>;
  private chartInstance: Chart | null = null;

  constructor(props: Props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const ctx = this.chartRef.current!.getContext('2d');

    // Destroy any existing chart instance if it exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }


    this.chartInstance = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: this.props.labels,
        datasets: [
          {
            label: 'Demand Line',
            data: this.props.values,
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            borderWidth: 2,
            fill: false, 
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year', // Set the label for the x-axis
            },
          },
          y: {
            title: {
              display: true,
              text: 'Demand Increase(%)', // Set the label for the y-axis
            },
          },
        },
      },
    });
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default LineChartComponent;
