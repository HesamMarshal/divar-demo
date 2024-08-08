const { default: axios } = require("axios");
require("dotenv").config();
const getAddressDetail = async (lat, lng) => {
  // const result = await axios
  //   .get(`${process.env.MAP_IR_URL}?lat=${lat}&lng=${lng}`, {
  //     headers: {
  //       "x-api-key": process.env.MAP_IR_API_KEY,
  //     },
  //   })
  //   .then((res) => res.data);

  return {
    province: "فارس", //result.province,
    city: "شیراز", //result.city,
    district: "قدوسی", //result.region,
    address: "ارس، شیراز، محله قدوسی غربی، بلوار پاسداران، بلوار", // result.address,
    coordinate: [lat, lng],
  };
};

module.exports = { getAddressDetail };
