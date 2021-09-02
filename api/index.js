const app = require('./server');

const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`express server started and listening at port ${port}`));