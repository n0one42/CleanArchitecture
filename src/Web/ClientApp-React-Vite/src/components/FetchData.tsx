import { Component } from "react";
import followIfLoginRedirect from "./api-authorization/followIfLoginRedirect";
import { WeatherForecast, WeatherForecastsClient } from "../web-api-client";

// Assuming the shape of your forecast data here
interface Forecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

// Define state interface
interface FetchDataState {
  forecasts: Forecast[];
  loading: boolean;
}

export class FetchData extends Component<
  Record<string, never>,
  FetchDataState
> {
  static displayName = "FetchData";

  constructor(props: Record<string, never>) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts: Forecast[]) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast) => (
            <tr key={forecast.date}>
              <td>{new Date(forecast.date).toLocaleDateString()}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    const contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderForecastsTable(this.state.forecasts)
    );

    return (
      <div>
        <h1 id="tableLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const client = new WeatherForecastsClient();
    const data = await client.getWeatherForecasts();

    // Convert data to match the Forecast interface, handling undefined values appropriately.
    const forecasts: Forecast[] = data.map((forecast: WeatherForecast) => ({
      // Convert date to string. Adjust according to how you want to handle the undefined case.
      date: forecast.date ? forecast.date.toString() : "",
      // Provide fallback values for temperatureC, temperatureF, and summary if undefined.
      temperatureC:
        forecast.temperatureC !== undefined ? forecast.temperatureC : 0, // Assuming 0 as fallback.
      temperatureF:
        forecast.temperatureF !== undefined ? forecast.temperatureF : 0, // Assuming 0 as fallback.
      summary: forecast.summary !== undefined ? forecast.summary : "No summary", // Assuming 'No summary' as fallback.
    }));

    this.setState({ forecasts, loading: false });
  }

  async populateWeatherDataOld() {
    const response = await fetch("weatherforecast");
    followIfLoginRedirect(response);
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
