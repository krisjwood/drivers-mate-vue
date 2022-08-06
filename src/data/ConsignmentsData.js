const axios = require("axios");
import APIcreds from "./APIcreds";

const { rootUrl, headers } = APIcreds;
const consignmentUrl = `${rootUrl}/consignment`;

export default {
    /** Get all available Consignments
     * @returns {Object} API response
     */
    async getConsignments() {
      const response = await axios
        .get(consignmentUrl, { headers })
        .then((response) => {
          return response;
        });
      return response;
    },
    /** Get specific Consignment
     * @param {String} id
     * @returns {Object} API response
     */
     async getConsignment(id) {
      const response = await axios
        .get(`${consignmentUrl}/${id}`, { headers })
        .then((response) => {
          return response;
        })
      return response;
     },
  }


    // Phase 2 API calls:
    // async createConsignment() {},
    // async updateConsignment(id) {},
    // async allocateConsignmentToTrip() {},