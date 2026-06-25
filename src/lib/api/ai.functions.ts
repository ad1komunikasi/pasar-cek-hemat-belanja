import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getAiAnalysis = createServerFn({ method: "POST" })
  .validator(
    z.object({
      customPrompt: z.string().optional(),
      history: z
        .array(
          z.object({
            role: z.enum(["user", "model"]),
            parts: z.array(z.object({ text: z.string() })),
          })
        )
        .optional(),
      metricsData: z.object({
        totalUsers: z.number(),
        freeUsers: z.number(),
        premiumUsers: z.number(),
        adminUsers: z.number(),
        totalRevenue: z.number(),
        totalOrders: z.number(),
        packageSummary: z.array(
          z.object({
            name: z.string(),
            price: z.number(),
            activeUsers: z.number(),
            totalOrders: z.union([z.number(), z.string()]),
            successOrders: z.union([z.number(), z.string()]),
            revenue: z.number(),
          })
        ),
        totalBaskets: z.number(),
        popularProducts: z.array(
          z.object({
            name: z.string(),
            category: z.string(),
            count: z.number(),
            quantity: z.number(),
          })
        ),
      }),
    })
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables.");
    }

    const { customPrompt, history, metricsData } = data;

    // Build the payload for the Gemini API call
    let contents = history ? [...history] : [];

    if (contents.length === 0) {
      // First message: Context setup + prompt
      const prompt = `Anda adalah tim konsultan profesional terkemuka yang terdiri dari:
1. Business Analyst Expert: Menganalisis metrik penjualan, kontribusi pendapatan paket, dan profitabilitas.
2. Marketing Insight Strategist: Merumuskan strategi promosi, kampanye konversi gratis-ke-premium, dan penargetan pasar.
3. Consumer Insight Analyst: Memahami perilaku pengguna berdasarkan data riwayat simulasi "Smart Basket" dan item terpopuler.
4. IT Consultant & Web App Developer Expert: Memberikan saran teknis untuk optimalisasi performa, UI/UX, dan pengembangan fitur baru yang relevan dengan kebutuhan pasar.
5. Strategic Planner: Menyusun peta jalan taktis dan strategi jangka panjang untuk keberlanjutan bisnis.

Berikut adalah data riwayat pengguna dan simulasi transaksi pada aplikasi PasarCek:
- Total Pengguna Terdaftar: ${metricsData.totalUsers}
- Distribusi Peran Pengguna:
  * Premium/Berbayar: ${metricsData.premiumUsers}
  * Free/Customer: ${metricsData.freeUsers}
  * Admin/Super Admin: ${metricsData.adminUsers}
- Total Pendapatan Sukses: Rp ${metricsData.totalRevenue.toLocaleString("id-ID")}
- Total Pesanan Sukses (Premium): ${metricsData.totalOrders}
- Ringkasan Penjualan Paket Berlangganan:
${metricsData.packageSummary
  .map(
    (pkg) =>
      `  * ${pkg.name} (Harga: Rp ${pkg.price.toLocaleString("id-ID")}): ${pkg.activeUsers} Pengguna Aktif, Total Pesanan: ${pkg.totalOrders}, Pesanan Sukses: ${pkg.successOrders}, Pendapatan: Rp ${pkg.revenue.toLocaleString("id-ID")}`
  )
  .join("\n")}
- Total Simulasi Smart Basket Dibuat: ${metricsData.totalBaskets}
- 10 Produk Terpopuler di Smart Basket (Paling Sering Disimulasikan):
${metricsData.popularProducts
  .map((p, idx) => `  ${idx + 1}. ${p.name} (Kategori: ${p.category}) - ${p.count}x ditambahkan, Total Qty: ${p.quantity}`)
  .join("\n")}

TUGAS:
Hasilkan laporan hasil brainstorming komprehensif dalam Bahasa Indonesia yang formal, sopan, tajam, dan profesional. Laporan harus terstruktur rapi menggunakan format Markdown dengan bagian-bagian berikut:

### I. Ringkasan Kinerja Bisnis (Business Analyst)
- Evaluasi kinerja penjualan paket premium saat ini.
- Analisis kontribusi pendapatan dan retensi.

### II. Wawasan Konsumen & Perilaku Belanja (Consumer Insight)
- Analisis mendalam terhadap 10 produk terpopuler di Smart Basket. Mengapa produk ini paling banyak disimulasikan?
- Apa arti preferensi produk ini bagi konsumen PasarCek?

### III. Strategi Pemasaran & Optimasi Konversi (Marketing Insight Strategist)
- Rekomendasi kampanye marketing khusus untuk menaikkan konversi pengguna Free menjadi Premium.
- Strategi penawaran harga atau bundling paket.

### IV. Rekomendasi Fitur Baru & Infrastruktur IT (Web App Developer & IT Consultant)
- Usulan perbaikan UI/UX pada fitur Smart Basket atau fitur pembanding harga.
- Fitur baru berbasis AI atau otomatisasi yang dapat meningkatkan nilai guna PasarCek (misal: notifikasi harga turun otomatis, smart shopping list prediction, dsb).

### V. Peta Jalan Strategis Masa Depan (Strategic Planner)
- Langkah strategis 3 bulan, 6 bulan, dan 1 tahun ke depan untuk menguasai pasar komparasi harga sembako.

Gunakan selalu nada bicara konsultan profesional ("kami" / "tim kami"), berikan analisis berbasis data di atas secara logis, jangan gunakan placeholder, dan buat saran sekonkret mungkin.`;

      contents.push({
        role: "user",
        parts: [{ text: prompt }],
      });
    } else if (customPrompt) {
      contents.push({
        role: "user",
        parts: [{ text: customPrompt }],
      });
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 3000,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error:", errorText);
        throw new Error(`Gemini API error: ${response.statusText} (${errorText})`);
      }

      const resJson = await response.json();
      const textResponse = resJson.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textResponse) {
        throw new Error("Invalid response from Gemini API.");
      }

      return {
        text: textResponse,
        updatedHistory: [
          ...contents,
          {
            role: "model",
            parts: [{ text: textResponse }],
          },
        ],
      };
    } catch (error: any) {
      console.error("Failed to generate AI analysis:", error);
      throw new Error(error.message || "Failed to contact AI service.");
    }
  });
