const throwStatusTextIfNotOk = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

const getTimeseries = (keys) => {
  return (
    fetch(
      `https://tsdb-api.kof.ethz.ch/v2/ts?keys=${keys.join(
        ",",
      )}&access_type=public`,
    )
      // TODO: Handle errors
      .then(throwStatusTextIfNotOk)
      .then((r) => r.json())
  );
};

export default {
  getTimeseries,
};
