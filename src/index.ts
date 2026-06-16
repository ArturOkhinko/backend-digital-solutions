import 'dotenv/config';
import app from './app';
import { seedItems, TOTAL_ITEMS } from './database/itemsDatabase';

const PORT = process.env.PORT ? Number(process.env.PORT) : 5003;

seedItems();
console.log(`Seeded in-memory database with ${TOTAL_ITEMS} items`);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
