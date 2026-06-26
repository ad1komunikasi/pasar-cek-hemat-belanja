import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getAiAnalysis = createServerFn({ method: "POST" })
  .validator(
    z.object({
      customPrompt: z.string().optional(),
      apiKey: z.string().optional(),
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
    const apiKey = data.apiKey || process.env.GEMINI_API_KEY;
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

    const models = ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-pro"];
    let lastError: any = null;

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 8192,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(`Model ${model} failed with status ${response.status}:`, errorText);
          lastError = new Error(`Gemini API error (${model}): ${response.statusText} (${errorText})`);
          continue; // Try next model
        }

        const resJson = await response.json();
        const textResponse = resJson.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResponse) {
          console.warn(`Model ${model} returned empty response.`);
          lastError = new Error(`Empty response from model ${model}`);
          continue; // Try next model
        }

        // Successfully got a response!
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
        console.warn(`Failed call with model ${model}:`, error);
        lastError = error;
        // Continue to next model
      }
    }

    // If all models failed:
    throw new Error(`Gagal menghubungi AI. Layanan sedang padat atau kunci API tidak valid. Detail: ${lastError?.message || "Tidak diketahui"}`);
  });

export const getAiProductSuggestions = createServerFn({ method: "POST" })
  .validator(
    z.object({
      query: z.string(),
      existingProducts: z.array(
        z.object({
          name: z.string(),
          category: z.string(),
          unit: z.string(),
        })
      ),
      apiKey: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    const apiKey = data.apiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables.");
    }

    const { query, existingProducts } = data;

    const prompt = `Anda adalah asisten AI untuk PasarCek, sebuah platform komparasi harga bahan pokok (sembako) di Indonesia.
Admin ingin mencari/mengidentifikasi jenis produk baru yang belum tersedia di database untuk ditambahkan.

Daftar produk yang sudah ada di database kami:
${existingProducts.map((p) => `- ${p.name} (Kategori: ${p.category}, Satuan: ${p.unit})`).join("\n")}

Query pencarian admin: "${query}"

Tugas Anda:
1. Analisis apakah ada produk dalam query pencarian admin yang sudah ada di database atau mirip sekali.
2. Cari dan rekomendasikan beberapa jenis produk (maksimal 5) yang cocok dengan query tersebut.
3. Untuk setiap produk hasil pencarian, berikan:
   - name: Nama produk standar (bahasa Indonesia, capitalize, contoh: "Minyak Goreng Curah", "Buncis Organik", "Telur Bebek")
   - category: Kategori produk. Usahakan mencocokkan dengan kategori yang sudah ada jika relevan (misal: "Sayur", "Beras", "Daging", "Bumbu", "Ikan", "Minyak", "Telur", "Susu", dll.). Jika tidak ada yang cocok, buat kategori baru yang tepat dan singkat.
   - unit: Satuan standar yang umum digunakan di pasar (contoh: "kg", "liter", "butir", "pcs", "ikat", "bungkus").
   - description: Penjelasan singkat kegunaan atau deskripsi produk tersebut.
   - status: Tentukan apakah "Belum Tersedia" (jika tidak ada produk sejenis/mirip di database) atau "Sudah Tersedia" (jika ada produk yang sama atau sangat mirip di database).
   - similarity: Jika statusnya "Sudah Tersedia", sebutkan nama produk di database kami yang mirip tersebut. Jika "Belum Tersedia", kosongkan atau null.

Kembalikan respon hanya dalam format JSON array yang valid. Jangan sertakan format markdown lain seperti \`\`\`json. Pastikan output Anda berupa raw JSON array yang valid dengan format berikut:
[
  {
    "name": "Nama Produk",
    "category": "Kategori",
    "unit": "Satuan",
    "description": "Deskripsi singkat",
    "status": "Belum Tersedia" | "Sudah Tersedia",
    "similarity": "Nama produk mirip"
  }
]`;

    const models = ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-pro"];
    let lastError: any = null;

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: prompt }],
                },
              ],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(`Model ${model} failed with status ${response.status}:`, errorText);
          lastError = new Error(`Gemini API error (${model}): ${response.statusText} (${errorText})`);
          continue;
        }

        const resJson = await response.json();
        const textResponse = resJson.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResponse) {
          console.warn(`Model ${model} returned empty response.`);
          lastError = new Error(`Empty response from model ${model}`);
          continue;
        }

        try {
          const parsed = JSON.parse(textResponse.trim());
          return parsed;
        } catch (e: any) {
          console.error("Failed to parse AI response as JSON:", textResponse);
          lastError = new Error(`Failed to parse AI response as JSON: ${e.message}`);
          continue;
        }
      } catch (error: any) {
        console.warn(`Failed call with model ${model}:`, error);
        lastError = error;
      }
    }

    throw new Error(`Gagal menghubungi AI. Layanan sedang padat atau kunci API tidak valid. Detail: ${lastError?.message || "Tidak diketahui"}`);
  });

