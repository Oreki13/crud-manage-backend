module.exports = {
  sql: (res, error) => {
    const formResponse = {
      status: "Email have registered",
    };
    res.json(formResponse);
  },
};
