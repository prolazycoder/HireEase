import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `✅ Backend deployed at: ${process.env.YOUR_BACKEND_URL || "Not Set"}`
  );
}); 