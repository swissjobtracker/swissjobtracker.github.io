const throwStatusTextIfNotOk = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

const getTimeseries = (keys) => {
  return (
    fetch(
      `https://datenservice.kof.ethz.ch/api/v1/public/ts?keys=${keys.join(
        ",",
      )}&df=Y-m-d`,
    )
      // TODO: Handle errors
      .then(throwStatusTextIfNotOk)
      .then((r) => r.json())
  );
};

export default {
  getTimeseries,
};
