import React, { Component, RefObject } from 'react';
import Chart from 'chart.js/auto';

interface Props {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string
  }[];
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
        datasets: this.props.datasets.map((dataset) => ({
          label: dataset.label,
          data: dataset.data,
          borderColor: dataset.borderColor,
          backgroundColor: dataset.borderColor,
          borderWidth: 2,
          fill: false,
        })),
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
            min: 0,    // Set the minimum value for the y-axis
            max: 100,  // Set the maximum value for the y-axis
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
