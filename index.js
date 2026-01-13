import express from "express";
import "dotenv/config";
import prisma from "./lib/prisma.js";
import encodeBase62 from "./utils/base62.js";


const app = express();
app.use(express.json()); // Parse JSON bodies
const PORT = process.env.PORT || 3000; // Access variables via process.env

app.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).json({ error: "URL required" });
    }

    const record = await prisma.url.create({
        data: { longUrl , shortCode: "" }
    });

    const shortCode = encodeBase62(record.id);
    console.log("Record", record);

    await prisma.url.update({
        where: { id: record.id },
        data: { shortCode }
    });
    console.log("Shortcode generated:", shortCode);
    res.status(200).json({success: true, message: "Shortcode Generated" , shortCode });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const record = await prisma.url.findUnique({
        where: { shortCode: code }
    });

    if (!record) return res.status(404).send("Not found");

    await prisma.url.update({
        where: { shortCode: req.params.code },
        data: { clicks: { increment: 1 } }
    });

    res.redirect(record.longUrl);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
