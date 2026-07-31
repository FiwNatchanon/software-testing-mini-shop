import { app } from "./app.js";
import { seedDemoData } from "./store/db.js";

const PORT = process.env.PORT || 4000;

seedDemoData();

app.listen(PORT, () => {
  console.log(`Mini Shop API is running on http://localhost:${PORT}`);
});
