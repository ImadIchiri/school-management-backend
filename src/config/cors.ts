const corsConfig = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // If we use cookies or authorization headers
};

export default corsConfig;
