import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 5003;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
