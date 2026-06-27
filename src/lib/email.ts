import { supabase } from "@/integrations/supabase/client";

interface OrderData {
  id: string;
  order_number: string;
  amount: number;
  recipient_name: string;
  recipient_email: string;
  created_at: string;
  payment_method?: {
    name: string;
    account_number?: string | null;
    account_name?: string | null;
    instructions?: string | null;
  } | null;
}

export const EmailService = {
  /**
   * Log email delivery to the database for auditing and trace logs.
   */
  async logEmail(recipientEmail: string, subject: string, body: string, orderId: string) {
    // Print formatted email details to console for local developers to review
    console.log("%c📧 [EMAIL SENT SIMULATION]", "background: #1e3a8a; color: #fff; padding: 4px; font-weight: bold;");
    console.log(`To: ${recipientEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body Snippet: ${body.substring(0, 300)}...`);
    console.log("-----------------------------------------");

    // Insert record in the database email_logs table
    try {
      await supabase.from("email_logs").insert({
        recipient_email: recipientEmail,
        subject,
        body,
        order_id: orderId,
        status: "sent",
      });
    } catch (e) {
      console.error("Failed to log email to database:", e);
    }

    // Fallback: If Resend API Key is defined, make actual API delivery call
    const resendKey = import.meta.env.VITE_RESEND_API_KEY;
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "PasarCek <noreply@pasarcek.com>",
            to: [recipientEmail],
            subject,
            html: body,
          }),
        });
      } catch (err) {
        console.error("Actual Resend API delivery failed:", err);
      }
    }
  },

  /**
   * Send Order Invoice/Instructions Email
   */
  async sendOrderCreatedEmail(order: OrderData, packageName: string) {
    const origin = window.location.origin;
    const orderLink = `${origin}/orders/${order.id}`;
    
    const subject = `[PasarCek] Tagihan Pemesanan Paket ${packageName} #${order.order_number}`;
    
    const methodDetails = order.payment_method 
      ? `
        <div style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="margin: 5px 0;"><strong>Metode:</strong> ${order.payment_method.name}</p>
          ${order.payment_method.account_number ? `<p style="margin: 5px 0;"><strong>No. Rekening:</strong> <code style="font-size: 14px; background: #eaeaea; padding: 2px 5px; border-radius: 3px;">${order.payment_method.account_number}</code></p>` : ""}
          ${order.payment_method.account_name ? `<p style="margin: 5px 0;"><strong>Nama Pemilik:</strong> ${order.payment_method.account_name}</p>` : ""}
          <p style="margin: 5px 0; color: #111; font-size: 16px;"><strong>Nominal Transfer:</strong> <span style="color: #1e3a8a; font-weight: bold;">Rp ${order.amount.toLocaleString("id-ID")}</span></p>
        </div>
      `
      : "";

    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #424242; line-height: 1.6;">
        <h2 style="color: #1e3a8a; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">Tagihan Pembelian Paket PasarCek</h2>
        <p>Halo, <strong>${order.recipient_name}</strong>,</p>
        <p>Terima kasih telah memilih paket <strong>${packageName}</strong> di PasarCek. Pesanan Anda telah dibuat dengan nomor pesanan <strong>${order.order_number}</strong>.</p>
        
        <p>Selesaikan pembayaran Anda sebelum 24 jam dengan detail transfer berikut:</p>
        
        ${methodDetails}
        
        ${order.payment_method?.instructions ? `<p style="font-size: 13px; color: #757575;"><em>Catatan: ${order.payment_method.instructions}</em></p>` : ""}

        <div style="margin: 25px 0; text-align: center;">
          <a href="${orderLink}" style="background-color: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Upload Bukti Pembayaran Sekarang</a>
        </div>
        
        <p style="font-size: 13px; color: #757575;">Jika tombol di atas tidak bekerja, salin link berikut ke browser Anda:<br/>
        <a href="${orderLink}">${orderLink}</a></p>
        
        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="font-size: 12px; color: #bdbdbd;">Email ini dikirim secara otomatis oleh PasarCek. Jangan membalas email ini.</p>
      </div>
    `;

    await this.logEmail(order.recipient_email, subject, body, order.id);
  },

  /**
   * Send Transfer Proof Upload Confirmation Email
   */
  async sendPaymentUploadedEmail(order: OrderData) {
    const origin = window.location.origin;
    const orderLink = `${origin}/orders/${order.id}`;
    
    const subject = `[PasarCek] Bukti Pembayaran Diterima #${order.order_number}`;
    
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #424242; line-height: 1.6;">
        <h2 style="color: #127a79; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">Bukti Pembayaran Diterima</h2>
        <p>Halo, <strong>${order.recipient_name}</strong>,</p>
        <p>Kami informasikan bahwa bukti transfer untuk pesanan <strong>#${order.order_number}</strong> telah kami terima.</p>
        
        <p>Admin kami sedang melakukan verifikasi manual terhadap transaksi Anda. Proses ini biasanya memakan waktu **10 s.d. 60 menit**. Anda akan menerima email notifikasi lain segera setelah paket Premium Anda diaktifkan.</p>
        
        <div style="margin: 25px 0; text-align: center;">
          <a href="${orderLink}" style="background-color: #127a79; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Pantau Status Pesanan</a>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="font-size: 12px; color: #bdbdbd;">Email ini dikirim secara otomatis oleh PasarCek. Jangan membalas email ini.</p>
      </div>
    `;

    await this.logEmail(order.recipient_email, subject, body, order.id);
  },

  /**
   * Send Subscription Activated/Approved Email
   */
  async sendOrderApprovedEmail(order: OrderData, packageName: string) {
    const origin = window.location.origin;
    const dashboardLink = `${origin}/dashboard`;
    
    const subject = `[PasarCek] Selamat! Paket Premium ${packageName} Anda Telah Aktif 🎉`;
    
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #424242; line-height: 1.6;">
        <h2 style="color: #65c32d; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">Paket Premium Aktif!</h2>
        <p>Halo, <strong>${order.recipient_name}</strong>,</p>
        <p>Kabar gembira! Pembayaran untuk nomor pesanan <strong>#${order.order_number}</strong> telah berhasil diverifikasi oleh admin.</p>
        
        <p>Akun Anda secara resmi telah ditingkatkan ke paket <strong>Premium (${packageName})</strong>. Sekarang Anda dapat menggunakan semua fitur Premium tanpa batasan:</p>
        
        <ul style="padding-left: 20px;">
          <li>Unlimited Price Alert</li>
          <li>Prediksi Harga Sembako Masa Depan</li>
          <li>Analitik Penghematan Belanja</li>
          <li>Simulasi Smart Basket Tanpa Batas</li>
        </ul>
        
        <div style="margin: 25px 0; text-align: center;">
          <a href="${dashboardLink}" style="background-color: #2e7d32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Masuk ke Dashboard Premium</a>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="font-size: 12px; color: #bdbdbd;">Email ini dikirim secara otomatis oleh PasarCek. Jangan membalas email ini.</p>
      </div>
    `;

    await this.logEmail(order.recipient_email, subject, body, order.id);
  },

  /**
   * Send Payment Rejected Email
   */
  async sendOrderRejectedEmail(order: OrderData, reason: string) {
    const origin = window.location.origin;
    const orderLink = `${origin}/orders/${order.id}`;
    
    const subject = `[PasarCek] Bukti Pembayaran Ditolak #${order.order_number}`;
    
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #424242; line-height: 1.6;">
        <h2 style="color: #d32f2f; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">Pemberitahuan: Pembayaran Ditolak</h2>
        <p>Halo, <strong>${order.recipient_name}</strong>,</p>
        <p>Kami menginformasikan bahwa bukti transfer untuk nomor pesanan <strong>#${order.order_number}</strong> ditolak oleh admin dengan alasan:</p>
        
        <div style="background-color: #ffebee; border-left: 4px solid #d32f2f; padding: 15px; border-radius: 4px; margin: 15px 0; color: #c62828;">
          <strong>Alasan Penolakan:</strong><br/>
          ${reason}
        </div>
        
        <p>Harap pastikan Anda telah mentransfer nominal yang sesuai ke rekening tujuan yang benar, kemudian silakan unggah ulang bukti transfer yang valid melalui link di bawah ini.</p>
        
        <div style="margin: 25px 0; text-align: center;">
          <a href="${orderLink}" style="background-color: #d32f2f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Upload Ulang Bukti Pembayaran</a>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="font-size: 12px; color: #bdbdbd;">Email ini dikirim secara otomatis oleh PasarCek. Jangan membalas email ini.</p>
      </div>
    `;

    await this.logEmail(order.recipient_email, subject, body, order.id);
  },

  /**
   * Send Email Notification when promoted to Admin
   */
  async sendAdminPromotionEmail(recipientEmail: string, recipientName: string) {
    const origin = window.location.origin;
    const dashboardLink = `${origin}/admin`;
    
    const subject = `[PasarCek] Selamat! Anda Telah Diangkat Menjadi Admin Dashboard PasarCek 🎉`;
    
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #424242; line-height: 1.6;">
        <h2 style="color: #1e3a8a; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">Akses Admin Aktif!</h2>
        <p>Halo, <strong>${recipientName}</strong>,</p>
        <p>Kami dengan senang hati menginformasikan bahwa akun Anda dengan email <strong>${recipientEmail}</strong> telah disetujui untuk menjadi <strong>Admin Dashboard PasarCek</strong> oleh Super Admin.</p>
        
        <p>Anda sekarang dapat mengakses Panel Admin dan berkontribusi penuh untuk memantau harga, laporan, dan data pasar terdekat secara real-time.</p>
        
        <div style="margin: 25px 0; text-align: center;">
          <a href="${dashboardLink}" style="background-color: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Masuk ke Admin Panel</a>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="font-size: 12px; color: #bdbdbd;">Email ini dikirim secara otomatis oleh PasarCek. Jangan membalas email ini.</p>
      </div>
    `;

    await this.logEmail(recipientEmail, subject, body, "promotion");
  },
};
