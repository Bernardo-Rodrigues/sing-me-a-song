/* eslint no-console: 0 */
import app from "./app.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
