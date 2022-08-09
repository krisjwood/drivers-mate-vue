const axios = require("axios");
import APIcreds from "./APIcreds";

const { rootUrl, headers } = APIcreds;
const tripUrl = `${rootUrl}/trip`;

export default {
  /** Get all available Trips
   * @returns {Object} API response
   */
  async getTrips() {
    const response = await axios
      .get(tripUrl, { headers })
      .then((response) => {
        return response;
      });
    return response;
  },
  /** Get specific Trips
   * @param {String} id of trip
   * @returns {Object} API response
   */
  async getTrip(id) {
    const response = await axios
      .get(`${tripUrl}/${id}`, { headers })
      .then((response) => {
        return response;
      });
    return response;
  },
};
