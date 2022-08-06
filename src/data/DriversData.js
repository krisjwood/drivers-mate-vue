const axios = require("axios");
import APIcreds from "./APIcreds";

const { rootUrl, headers } = APIcreds;
const driverUrl = `${rootUrl}/driver`;

export default {
    /** Get all available Drivers
   * @returns {Object} API response
   */
  async getDrivers() {
    const response = await axios
      .get(driverUrl, { headers })
      .then((response) => {
        return response;
      });
    return response;
  },

  
  // Phase 2 API calls:
  // async createDriver() {}
};
