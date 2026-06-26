import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/app-shell";
import { idr } from "@/lib/format";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, Brain, Bot, User, Loader2, HelpCircle, RefreshCw, BarChart2, Save, Download, ChevronDown, FileText, Clipboard, Printer, Trash2, Key, AlertTriangle, Copy, Check } from "lucide-react";
import { getAiAnalysis } from "@/lib/api/ai.functions";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/_authenticated/admin/reports")({ component: AdminReports });

function AdminReports() {
  const { data } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      // 1. Fetch all packages sorted by sort_order
      const { data: packages } = await supabase
        .from("packages")
        .select("id, name, price, slug, is_active")
        .order("sort_order");

      // 2. Fetch all orders (with amount, status, package_id, created_at)
      const { data: orders } = await supabase
        .from("orders")
        .select("amount, created_at, status, package_id");

      // 3. Fetch active subscriptions to count active premium users
      const { data: activeSubs } = await supabase
        .from("subscriptions")
        .select("package_id, user_id")
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString());

      // 4. Fetch total profiles count to deduce "free" users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });

      // Daily revenue chart calculation (same as before)
      const byDay = new Map<string, number>();
      (orders ?? [])
        .filter((o: any) => o.status === "active" || o.status === "paid")
        .forEach((o: any) => {
          const k = o.created_at.slice(0, 10);
          byDay.set(k, (byDay.get(k) ?? 0) + Number(o.amount));
        });
      const series = Array.from(byDay.entries())
        .sort()
        .map(([d, v]) => ({ date: d.slice(5), revenue: v }));
      const total = series.reduce((s, r) => s + r.revenue, 0);

      // --- Aggregation logic for packages ---
      // Map active subscriptions count per package
      const activeSubsCountByPackage = new Map<string, number>();
      const activeSubscribedUsers = new Set<string>();
      (activeSubs ?? []).forEach((sub: any) => {
        activeSubsCountByPackage.set(sub.package_id, (activeSubsCountByPackage.get(sub.package_id) ?? 0) + 1);
        activeSubscribedUsers.add(sub.user_id);
      });

      const totalUsersCount = totalUsers ?? 0;
      const activePremiumCount = activeSubscribedUsers.size;
      const activeFreeCount = Math.max(0, totalUsersCount - activePremiumCount);

      // Aggregate order statistics by package_id
      const statsByPackage = new Map<string, { totalOrders: number; successOrders: number; revenue: number }>();
      (orders ?? []).forEach((order: any) => {
        const pkgId = order.package_id;
        if (!pkgId) return;
        const current = statsByPackage.get(pkgId) ?? { totalOrders: 0, successOrders: 0, revenue: 0 };
        current.totalOrders += 1;
        if (order.status === "active" || order.status === "paid") {
          current.successOrders += 1;
          current.revenue += Number(order.amount);
        }
        statsByPackage.set(pkgId, current);
      });

      // Map to package rows (include free package, premium bulanan, premium tahunan)
      const packageRows = (packages ?? []).map((pkg: any) => {
        const isFree = pkg.price === 0 || pkg.slug === "free";
        const pkgStats = statsByPackage.get(pkg.id) ?? { totalOrders: 0, successOrders: 0, revenue: 0 };

        let activeUsers = 0;
        if (isFree) {
          activeUsers = activeFreeCount;
        } else {
          activeUsers = activeSubsCountByPackage.get(pkg.id) ?? 0;
        }

        return {
          id: pkg.id,
          name: pkg.name,
          slug: pkg.slug,
          price: pkg.price,
          totalOrders: isFree ? "-" : pkgStats.totalOrders,
          successOrders: isFree ? "-" : pkgStats.successOrders,
          revenue: isFree ? 0 : pkgStats.revenue,
          activeUsers,
        };
      });

      // 5. Fetch all profiles and calculate user role distributions
      const { data: userRoles } = await supabase
        .from("user_roles")
        .select("role");

      // 6. Fetch total smart baskets count
      const { count: totalBaskets } = await supabase
        .from("smart_baskets")
        .select("id", { count: "exact", head: true });

      // 7. Fetch all basket items and products to aggregate popular items
      const { data: basketItems } = await supabase
        .from("basket_items")
        .select("product_id, quantity, product:products(name, category)");

      // Aggregate popular products
      const productCounts: Record<string, { name: string; category: string; count: number; quantity: number }> = {};
      (basketItems ?? []).forEach((item: any) => {
        if (!item.product) return;
        const key = item.product_id;
        if (!productCounts[key]) {
          productCounts[key] = {
            name: item.product.name,
            category: item.product.category,
            count: 0,
            quantity: 0
          };
        }
        productCounts[key].count += 1;
        productCounts[key].quantity += Number(item.quantity);
      });

      const popularProducts = Object.values(productCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return {
        series,
        total,
        count: orders?.length ?? 0,
        packageRows,
        aiMetrics: {
          totalUsers: totalUsersCount,
          freeUsers: activeFreeCount,
          premiumUsers: activePremiumCount,
          adminUsers: (userRoles ?? []).filter((r: any) => r.role === "admin" || r.role === "super_admin").length,
          totalRevenue: total,
          totalOrders: orders?.filter((o: any) => o.status === "active" || o.status === "paid").length ?? 0,
          packageSummary: packageRows.map(row => ({
            name: row.name,
            price: row.price,
            activeUsers: row.activeUsers,
            totalOrders: row.totalOrders,
            successOrders: row.successOrders,
            revenue: row.revenue
          })),
          totalBaskets: totalBaskets ?? 0,
          popularProducts: popularProducts,
        }
      };
    },
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [reportText, setReportText] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [activeTab, setActiveTab] = useState("laporan");
  const [selectedReportId, setSelectedReportId] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [localApiKey, setLocalApiKey] = useState<string>("");
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("pasardeck_gemini_api_key") || "";
    setLocalApiKey(key);
  }, []);

  function handleSaveApiKey(key: string) {
    const trimmed = key.trim();
    localStorage.setItem("pasardeck_gemini_api_key", trimmed);
    setLocalApiKey(trimmed);
    toast.success(trimmed ? "Kunci API Gemini berhasil disimpan secara lokal!" : "Kunci API lokal dihapus. Menggunakan environment variable server.");
    setShowKeyInput(false);
  }

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function handleCopyText(text: string, index: number) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Jawaban konsultan berhasil disalin ke clipboard!");
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  }

  async function autoSaveChatHistory(updatedHistory: any[]) {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (selectedReportId) {
        // Update existing report
        if (userData?.user) {
          const { error } = await supabase
            .from("ai_reports")
            .update({ chat_history: updatedHistory })
            .eq("id", selectedReportId);
            
          if (error) {
            console.warn("Gagal auto-save ke database, mencoba lokal:", error.message);
            updateLocalStorageHistory(selectedReportId, updatedHistory);
          } else {
            refetchSavedReports();
          }
        } else {
          updateLocalStorageHistory(selectedReportId, updatedHistory);
        }
      } else {
        // Auto-create new report because they started chatting
        const reportId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
        const defaultTitle = `Diskusi Konsultasi ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}`;
        
        const newReport = {
          id: reportId,
          created_at: new Date().toISOString(),
          title: defaultTitle,
          report_text: reportText || "Sesi tanya jawab konsultan AI.",
          chat_history: updatedHistory,
          metrics_snapshot: data?.aiMetrics || {},
        };
        
        if (userData?.user) {
          const { error } = await supabase
            .from("ai_reports")
            .insert({
              id: reportId,
              title: defaultTitle,
              report_text: reportText || "Sesi tanya jawab konsultan AI.",
              chat_history: updatedHistory,
              metrics_snapshot: data?.aiMetrics || {},
              user_id: userData.user.id
            });
            
          if (error) {
            console.warn("Gagal auto-create ke database, mencoba lokal:", error.message);
            saveToLocalStorageQuietly(newReport);
          } else {
            setSelectedReportId(reportId);
            refetchSavedReports();
          }
        } else {
          saveToLocalStorageQuietly(newReport);
        }
      }
    } catch (err: any) {
      console.error("Gagal melakukan auto-save percakapan:", err);
    }
  }

  function updateLocalStorageHistory(id: string, updatedHistory: any[]) {
    try {
      const local = localStorage.getItem("pasardeck_ai_reports");
      if (local) {
        const list = JSON.parse(local);
        const idx = list.findIndex((r: any) => r.id === id);
        if (idx !== -1) {
          list[idx].chat_history = updatedHistory;
          localStorage.setItem("pasardeck_ai_reports", JSON.stringify(list));
          refetchSavedReports();
        }
      }
    } catch (e) {
      console.error("Gagal update history lokal:", e);
    }
  }

  function saveToLocalStorageQuietly(report: any) {
    try {
      const local = localStorage.getItem("pasardeck_ai_reports");
      const list = local ? JSON.parse(local) : [];
      list.unshift(report);
      localStorage.setItem("pasardeck_ai_reports", JSON.stringify(list));
      setSelectedReportId(report.id);
      refetchSavedReports();
    } catch (e) {
      console.error("Gagal simpan lokal secara senyap:", e);
    }
  }

  // Fetch saved reports history from Supabase or localStorage fallback
  const { data: savedReportsList, refetch: refetchSavedReports } = useQuery({
    queryKey: ["admin-saved-reports"],
    queryFn: async () => {
      try {
        const { data: reports, error } = await supabase
          .from("ai_reports")
          .select("id, created_at, title")
          .order("created_at", { ascending: false });
        if (error) {
          throw error;
        }
        return reports ?? [];
      } catch (err: any) {
        console.warn("Supabase query failed, falling back to localStorage:", err.message);
        const local = localStorage.getItem("pasardeck_ai_reports");
        if (local) {
          try {
            return JSON.parse(local).map((r: any) => ({
              id: r.id,
              created_at: r.created_at,
              title: r.title
            }));
          } catch (e) {
            return [];
          }
        }
        return [];
      }
    }
  });

  const savedReports = savedReportsList ?? [];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isReplying]);

  useEffect(() => {
    if (!isAnalyzing) return;
    setAnalysisStep(1);
    
    const timers = [
      setTimeout(() => setAnalysisStep(2), 1000),
      setTimeout(() => setAnalysisStep(3), 2000),
      setTimeout(() => setAnalysisStep(4), 3000),
      setTimeout(() => setAnalysisStep(5), 4000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isAnalyzing]);

  async function handleStartAnalysis() {
    if (!data?.aiMetrics) {
      toast.error("Data transaksi belum siap. Silakan tunggu.");
      return;
    }
    setIsAnalyzing(true);
    setReportText("");
    setSelectedReportId("");
    
    try {
      const response = await getAiAnalysis({
        data: {
          metricsData: data.aiMetrics,
          apiKey: localApiKey || undefined,
        }
      });
      
      // Wait for steps to complete before showing the report
      setTimeout(() => {
        setReportText(response.text);
        const initialHistory = response.updatedHistory || [];
        setChatHistory(initialHistory);
        setIsAnalyzing(false);
        setActiveTab("laporan");
        toast.success("Analisis AI berhasil dirumuskan!");
      }, 4500);

    } catch (err: any) {
      setIsAnalyzing(false);
      if (err.message?.includes("GEMINI_API_KEY")) {
        setShowKeyInput(true);
        toast.error("Kunci API Gemini tidak ditemukan. Silakan isi API Key di panel pengaturan.");
      } else {
        toast.error("Gagal melakukan analisis: " + err.message);
      }
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!chatInput.trim() || isReplying || !data?.aiMetrics) return;

    const userMsg = chatInput.trim();
    setChatInput("");
    setIsReplying(true);
    
    const newHistory = [
      ...chatHistory,
      {
        role: "user" as const,
        parts: [{ text: userMsg }]
      }
    ];
    setChatHistory(newHistory);
    // Auto-save the user message immediately so it's persisted
    await autoSaveChatHistory(newHistory);

    try {
      const response = await getAiAnalysis({
        data: {
          customPrompt: userMsg,
          history: chatHistory.map(h => ({
            role: h.role,
            parts: h.parts
          })),
          metricsData: data.aiMetrics,
          apiKey: localApiKey || undefined,
        }
      });

      const updatedHistory = response.updatedHistory || [];
      setChatHistory(updatedHistory);
      // Auto-save the response
      await autoSaveChatHistory(updatedHistory);
    } catch (err: any) {
      if (err.message?.includes("GEMINI_API_KEY")) {
        setShowKeyInput(true);
        toast.error("Kunci API Gemini tidak ditemukan. Silakan isi API Key di panel pengaturan.");
      } else {
        toast.error("Gagal mengirim pesan: " + err.message);
      }
    } finally {
      setIsReplying(false);
    }
  }

  async function handleLoadSavedReport(id: string) {
    if (!id) {
      setReportText("");
      setChatHistory([]);
      setSelectedReportId("");
      return;
    }
    
    try {
      // First try from Supabase
      const { data: report, error } = await supabase
        .from("ai_reports")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (!error && report) {
        setReportText(report.report_text);
        setChatHistory(report.chat_history || []);
        setSelectedReportId(id);
        setActiveTab("laporan");
        toast.success("Laporan berhasil dimuat!");
        return;
      }
      
      // Try from localStorage fallback
      const local = localStorage.getItem("pasardeck_ai_reports");
      if (local) {
        const list = JSON.parse(local);
        const found = list.find((r: any) => r.id === id);
        if (found) {
          setReportText(found.report_text);
          setChatHistory(found.chat_history || []);
          setSelectedReportId(id);
          setActiveTab("laporan");
          toast.success("Laporan dimuat dari penyimpanan lokal!");
          return;
        }
      }
      
      toast.error("Laporan tidak ditemukan.");
    } catch (err: any) {
      toast.error("Terjadi kesalahan: " + err.message);
    }
  }

  function saveToLocalStorage(report: any) {
    try {
      const local = localStorage.getItem("pasardeck_ai_reports");
      const list = local ? JSON.parse(local) : [];
      list.unshift(report);
      localStorage.setItem("pasardeck_ai_reports", JSON.stringify(list));
      toast.success("Laporan disimpan lokal di browser Anda!");
      setSelectedReportId(report.id);
      refetchSavedReports();
    } catch (e: any) {
      toast.error("Gagal menyimpan lokal: " + e.message);
    }
  }

  async function handleSaveReport() {
    if (!reportText) {
      toast.error("Tidak ada laporan untuk disimpan.");
      return;
    }
    
    const defaultTitle = `Laporan Analisis ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
    const title = prompt("Masukkan judul laporan:", defaultTitle);
    if (title === null) return; // User cancelled
    
    const finalTitle = title.trim() || defaultTitle;
    setIsSaving(true);
    
    const reportId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    const newReport = {
      id: reportId,
      created_at: new Date().toISOString(),
      title: finalTitle,
      report_text: reportText,
      chat_history: chatHistory,
      metrics_snapshot: data?.aiMetrics || {},
    };
    
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        saveToLocalStorage(newReport);
        return;
      }

      const { error } = await supabase
        .from("ai_reports")
        .insert({
          id: reportId,
          title: finalTitle,
          report_text: reportText,
          chat_history: chatHistory,
          metrics_snapshot: data?.aiMetrics || {},
          user_id: userData.user.id
        });

      if (error) {
        console.warn("Database save failed, using local fallback:", error.message);
        saveToLocalStorage(newReport);
      } else {
        toast.success("Laporan disimpan ke database!");
        setSelectedReportId(reportId);
        refetchSavedReports();
      }
    } catch (err: any) {
      console.warn("Save failed, using local fallback:", err.message);
      saveToLocalStorage(newReport);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteReport(id: string, e: React.MouseEvent) {
    e.stopPropagation(); // Prevent select
    if (!confirm("Apakah Anda yakin ingin menghapus laporan ini?")) return;
    
    try {
      // Attempt database deletion (won't throw if table is missing, just returns error)
      await supabase
        .from("ai_reports")
        .delete()
        .eq("id", id);
      
      // Delete from localStorage
      const local = localStorage.getItem("pasardeck_ai_reports");
      if (local) {
        const list = JSON.parse(local);
        const filtered = list.filter((r: any) => r.id !== id);
        localStorage.setItem("pasardeck_ai_reports", JSON.stringify(filtered));
      }
      
      toast.success("Laporan berhasil dihapus!");
      if (selectedReportId === id) {
        setReportText("");
        setChatHistory([]);
        setSelectedReportId("");
      }
      refetchSavedReports();
    } catch (err: any) {
      toast.error("Terjadi kesalahan: " + err.message);
    }
  }

  function exportToPDF() {
    const printContent = document.getElementById("ai-report-print-area");
    if (!printContent) return;
    
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Pop-up diblokir. Harap izinkan pop-up untuk mencetak.");
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Laporan Analisa AI PasarCek</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6; }
            h1 { color: #1e3a8a; font-size: 24px; border-bottom: 2px solid #eaeaea; padding-bottom: 10px; margin-bottom: 5px; }
            h2 { color: #1e3a8a; font-size: 18px; margin-top: 30px; border-bottom: 1px solid #eaeaea; padding-bottom: 5px; }
            h3 { color: #111; font-size: 14px; margin-top: 20px; font-weight: bold; }
            p { font-size: 12px; margin: 10px 0; }
            ul { padding-left: 20px; margin: 10px 0; font-size: 12px; }
            li { margin-bottom: 5px; }
            strong { color: #111; font-weight: bold; background-color: #fffbeb; padding: 0 2px; }
            .footer { margin-top: 50px; font-size: 10px; color: #777; border-top: 1px solid #eaeaea; padding-top: 10px; text-align: center; }
          </style>
        </head>
        <body>
          <h1>Laporan Analisis Bisnis & Strategi Pemasaran PasarCek</h1>
          <div style="font-size: 11px; color: #555; margin-bottom: 30px;">
            Dicetak pada: ${new Date().toLocaleString('id-ID')} | PasarCek Admin AI Assistant
          </div>
          ${printContent.innerHTML}
          <div class="footer">Laporan Rahasia Internal PasarCek - Dibuat oleh Asisten AI & Konsultan Penjualan</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  function exportToWord() {
    const printContent = document.getElementById("ai-report-print-area");
    if (!printContent) return;
    
    const html = printContent.innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><title>Laporan Analisa AI PasarCek</title><style>body { font-family: Arial, sans-serif; }</style></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + html + footer;
    
    const blob = new Blob(['\\ufeff' + sourceHTML], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Laporan_Analisis_AI_PasarCek_${new Date().toISOString().slice(0,10)}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("File Word (.doc) berhasil diunduh!");
  }

  async function copyToGoogleDocs() {
    const printContent = document.getElementById("ai-report-print-area");
    if (!printContent) return;
    
    try {
      const type = "text/html";
      const blob = new Blob([printContent.innerHTML], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      await navigator.clipboard.write(data);
      toast.success("Format laporan disalin! Anda dapat menempelkannya langsung ke Google Docs.");
    } catch (err: any) {
      await navigator.clipboard.writeText(reportText);
      toast.success("Teks laporan disalin ke clipboard!");
    }
  }

  function renderMarkdown(text: string) {
    if (!text) return null;
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xs font-bold mt-4 mb-2 text-indigo-950 flex items-center gap-1.5 border-b pb-1 border-blue-100">
            <Brain className="h-3.5 w-3.5 shrink-0 text-blue-600" />
            {trimmed.slice(4)}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={i} className="text-sm font-extrabold mt-6 mb-3 text-indigo-950 flex items-center gap-1.5 border-b pb-1 border-blue-200">
            <Bot className="h-4 w-4 shrink-0 text-blue-600" />
            {trimmed.slice(3)}
          </h2>
        );
      }
      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={i} className="text-base font-black mt-8 mb-4 text-indigo-950">
            {trimmed.slice(2)}
          </h1>
        );
      }

      // Bold text parsing
      let parts: React.ReactNode[] = [];
      let remaining = line;
      let idx = 0;
      while (remaining.includes("**")) {
        const start = remaining.indexOf("**");
        const end = remaining.indexOf("**", start + 2);
        if (end === -1) break;
        
        parts.push(remaining.slice(0, start));
        parts.push(<strong key={idx++} className="font-semibold text-indigo-950 bg-amber-50 px-0.5 rounded">{remaining.slice(start + 2, end)}</strong>);
        remaining = remaining.slice(end + 2);
      }
      parts.push(remaining);

      // List item parsing
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const innerText = line.replace(/^\s*[-*]\s+/, "");
        let innerParts: React.ReactNode[] = [];
        let innerRemaining = innerText;
        let innerIdx = 0;
        while (innerRemaining.includes("**")) {
          const start = innerRemaining.indexOf("**");
          const end = innerRemaining.indexOf("**", start + 2);
          if (end === -1) break;
          innerParts.push(innerRemaining.slice(0, start));
          innerParts.push(<strong key={innerIdx++} className="font-semibold text-indigo-950 bg-amber-50 px-0.5 rounded">{innerRemaining.slice(start + 2, end)}</strong>);
          innerRemaining = innerRemaining.slice(end + 2);
        }
        innerParts.push(innerRemaining);

        return (
          <div key={i} className="flex items-start gap-2 my-1.5 pl-2">
            <span className="text-blue-500 mt-1.5 shrink-0 select-none text-[8px]">•</span>
            <p className="text-xs text-gray-700 leading-relaxed flex-1">{innerParts}</p>
          </div>
        );
      }

      if (trimmed === "") {
        return <div key={i} className="h-2" />;
      }

      return (
        <p key={i} className="text-xs text-gray-700 leading-relaxed my-1.5">
          {parts}
        </p>
      );
    });
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-black">Laporan</h1>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Left Side: Stats and charts */}
        <div className="xl:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Total Pendapatan" value={idr(data?.total ?? 0)} accent="green" />
            <StatCard label="Total Pesanan" value={data?.count ?? 0} accent="blue" />
            <StatCard label="Pesanan Hari Ini" value={(data?.series ?? []).slice(-1)[0]?.revenue ? idr((data?.series ?? []).slice(-1)[0].revenue) : idr(0)} accent="warning" />
          </div>

          <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
            <h3 className="mb-4 text-lg font-bold">Pendapatan Harian</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.series ?? []}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(v: number) => idr(v)} />
                  <Line type="monotone" dataKey="revenue" stroke="#1e3a8a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Side: AI Sales Assistant */}
        <div className="xl:col-span-1">
          <Card className="border border-blue-100 shadow-xl overflow-hidden bg-gradient-to-b from-white to-blue-50/10">
            <CardHeader className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
                  <div>
                    <CardTitle className="text-sm font-bold">Asisten AI & Konsultan Penjualan</CardTitle>
                    <CardDescription className="text-[10px] text-blue-200">
                      Business Analyst, Marketing & Consumer Insight
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    onClick={() => setShowKeyInput(!showKeyInput)}
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 transition-colors ${showKeyInput ? 'text-amber-300 bg-white/10' : 'text-blue-200 hover:text-white hover:bg-white/10'}`}
                    title="Konfigurasi API Key"
                  >
                    <Key className="h-3.5 w-3.5" />
                  </Button>
                  {reportText && (
                    <Button
                      onClick={handleStartAnalysis}
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white hover:bg-white/10"
                      title="Mulai Ulang Analisis"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 flex flex-col h-[580px] bg-white relative">
              {showKeyInput && (
                <div className="absolute inset-0 bg-white z-10 p-5 flex flex-col justify-between border-t border-gray-100 rounded-b-xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
                      <Key className="h-4 w-4 text-blue-700" />
                      <span>Konfigurasi Gemini API Key</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Fitur konsultasi bisnis AI memerlukan <strong>GEMINI_API_KEY</strong>. 
                      Anda bisa menambahkannya secara permanen di environment variables Vercel (direkomendasikan) 
                      atau menyimpannya secara lokal di browser ini untuk penggunaan sementara.
                    </p>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2 text-[11px] text-amber-900 leading-normal">
                      <div className="flex gap-1.5 items-center font-bold">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>Instruksi Vercel (Permanen):</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1 ml-1 text-gray-700">
                        <li>Buka dashboard Vercel &gt; Proyek Anda.</li>
                        <li>Pilih tab <strong>Settings</strong> &gt; <strong>Environment Variables</strong>.</li>
                        <li>Tambahkan key: <code className="bg-amber-100 px-1 rounded font-mono text-[10px] font-semibold text-amber-950">GEMINI_API_KEY</code></li>
                        <li>Masukkan nilai API Key Gemini Anda lalu simpan.</li>
                        <li>Lakukan <strong>Redeploy</strong> pada deployment terakhir.</li>
                      </ol>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-700">API Key Lokal (Simpan di Browser):</label>
                      <Input
                        type="password"
                        value={localApiKey}
                        onChange={(e) => setLocalApiKey(e.target.value)}
                        placeholder="Masukkan GEMINI_API_KEY..."
                        className="text-xs h-9 focus-visible:ring-blue-600"
                      />
                      <p className="text-[10px] text-gray-400">
                        Kunci disimpan secara lokal di browser Anda dan dikirim dengan aman ke server function.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowKeyInput(false)}
                      className="flex-1 text-xs h-9 font-semibold text-gray-700 hover:bg-gray-50 border-gray-200"
                    >
                      Batal
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSaveApiKey(localApiKey)}
                      className="flex-1 text-xs h-9 font-semibold bg-blue-700 hover:bg-blue-800 text-white"
                    >
                      Simpan Kunci
                    </Button>
                  </div>
                </div>
              )}
              {/* Saved Reports Dropdown */}
              {savedReports && savedReports.length > 0 && (
                <div className="mb-3 flex items-center gap-2 shrink-0">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider shrink-0">Riwayat:</span>
                  <select
                    value={selectedReportId}
                    onChange={(e) => handleLoadSavedReport(e.target.value)}
                    className="flex-1 text-[11px] h-8 bg-gray-50 border border-gray-200 rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-800 font-semibold"
                  >
                    <option value="">-- Buat Laporan Baru --</option>
                    {savedReports.map((report) => (
                      <option key={report.id} value={report.id}>
                        {report.title}
                      </option>
                    ))}
                  </select>
                  {selectedReportId && (
                    <Button
                      onClick={(e) => handleDeleteReport(selectedReportId, e)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                      title="Hapus laporan ini"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              )}

              {/* Save & Export Actions Bar */}
              {reportText && (
                <div className="flex gap-2 mb-3 shrink-0">
                  <Button
                    onClick={handleSaveReport}
                    disabled={isSaving}
                    variant="outline"
                    size="sm"
                    className="flex-1 h-8 text-[11px] font-semibold border-blue-100 text-blue-900 hover:bg-blue-50 hover:border-blue-300 flex items-center justify-center gap-1.5 rounded-md"
                  >
                    <Save className="h-3.5 w-3.5" />
                    {isSaving ? "Menyimpan..." : "Simpan Laporan"}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8 text-[11px] font-semibold border-blue-100 text-blue-900 hover:bg-blue-50 hover:border-blue-300 flex items-center justify-center gap-1.5 rounded-md"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Ekspor Laporan
                        <ChevronDown className="h-3.5 w-3.5 ml-auto opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-100 rounded-md shadow-lg p-1 text-xs">
                      <DropdownMenuItem onClick={exportToPDF} className="flex items-center gap-2 px-2.5 py-2 hover:bg-gray-50 rounded-md cursor-pointer text-gray-700 font-semibold focus:bg-gray-50 focus:text-gray-900">
                        <Printer className="h-3.5 w-3.5 text-red-500" />
                        Ekspor ke PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={exportToWord} className="flex items-center gap-2 px-2.5 py-2 hover:bg-gray-50 rounded-md cursor-pointer text-gray-700 font-semibold focus:bg-gray-50 focus:text-gray-900">
                        <FileText className="h-3.5 w-3.5 text-blue-500" />
                        Ekspor ke Word (.doc)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={copyToGoogleDocs} className="flex items-center gap-2 px-2.5 py-2 hover:bg-gray-50 rounded-md cursor-pointer text-gray-700 font-semibold focus:bg-gray-50 focus:text-gray-900">
                        <Clipboard className="h-3.5 w-3.5 text-green-500" />
                        Salin untuk Google Docs
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {!reportText && !isAnalyzing ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                    <Brain className="h-8 w-8 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-gray-900">Analisis AI Bisnis & Marketing</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Analisis kinerja penjualan, perilaku Smart Basket pengguna, dan konversi pemasaran berdasarkan data terkini aplikasi PasarCek.
                    </p>
                  </div>
                  <Button 
                    onClick={handleStartAnalysis}
                    className="w-full bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-950 text-white shadow-soft transition-all duration-300 font-semibold text-xs py-2 rounded-md"
                  >
                    Mulai Brainstorming AI ✨
                  </Button>
                </div>
              ) : isAnalyzing ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full border-4 border-blue-100 border-t-blue-700 animate-spin flex items-center justify-center" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-blue-600 animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-3 w-full max-w-[240px]">
                    <p className="text-xs font-bold text-blue-900 text-center animate-pulse">
                      Menyusun Strategi Bisnis...
                    </p>
                    <div className="space-y-1">
                      <div className={`flex items-center gap-2 text-[10px] transition-opacity duration-300 ${analysisStep >= 1 ? 'opacity-100 text-green-600 font-semibold' : 'opacity-30'}`}>
                        <span>{analysisStep > 1 ? '✓' : '•'}</span>
                        <span>Menghubungkan ke basis data...</span>
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] transition-opacity duration-300 ${analysisStep >= 2 ? 'opacity-100 text-green-600 font-semibold' : 'opacity-30'}`}>
                        <span>{analysisStep > 2 ? '✓' : '•'}</span>
                        <span>Menganalisis penjualan & peran...</span>
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] transition-opacity duration-300 ${analysisStep >= 3 ? 'opacity-100 text-green-600 font-semibold' : 'opacity-30'}`}>
                        <span>{analysisStep > 3 ? '✓' : '•'}</span>
                        <span>Mengevaluasi simulasi Smart Basket...</span>
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] transition-opacity duration-300 ${analysisStep >= 4 ? 'opacity-100 text-green-600 font-semibold' : 'opacity-30'}`}>
                        <span>{analysisStep > 4 ? '✓' : '•'}</span>
                        <span>Merumuskan strategi pemasaran...</span>
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] transition-opacity duration-300 ${analysisStep >= 5 ? 'opacity-100 text-blue-700 font-semibold' : 'opacity-30'}`}>
                        <span className={analysisStep === 5 ? 'animate-bounce' : ''}>•</span>
                        <span>Menulis laporan konsultan...</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-full min-h-0">
                  <TabsList className="grid grid-cols-2 mb-3 bg-gray-50 border border-gray-100 p-0.5 rounded-lg shrink-0">
                    <TabsTrigger value="laporan" className="text-xs py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md font-semibold">
                      Laporan Konsultasi
                    </TabsTrigger>
                    <TabsTrigger value="tanya" className="text-xs py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md font-semibold">
                      Tanya Konsultan
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="laporan" className="flex-1 min-h-0 mt-0">
                    <ScrollArea className="h-[500px] pr-3 border border-gray-50 rounded-lg p-3 bg-gray-50/30">
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-[11px] text-blue-900 leading-relaxed print:hidden">
                          <strong>💡 Info Konsultan:</strong> Laporan ini dirumuskan berdasarkan data real-time PasarCek oleh tim virtual Business Analyst, Marketing Insight Strategist, Consumer Insight, IT Consultant, dan Strategic Planner.
                        </div>
                        <div id="ai-report-print-area" className="prose max-w-none">
                          {renderMarkdown(reportText)}
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="tanya" className="flex-1 min-h-0 mt-0 flex flex-col justify-between">
                    <ScrollArea className="flex-1 pr-3 border border-gray-50 rounded-lg p-3 bg-gray-50/30 mb-3 h-[420px]">
                      <div className="space-y-3">
                        {chatHistory.filter(h => h.role !== "user" || !h.parts[0].text.includes("Anda adalah tim konsultan")).map((msg, idx) => {
                          const isUser = msg.role === "user";
                          return (
                            <div key={idx} className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
                              {!isUser && (
                                <div className="h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center text-white text-[10px] shrink-0 font-bold mt-1">
                                  AI
                                </div>
                              )}
                              <div className="relative group max-w-[85%] flex flex-col">
                                <div className={`rounded-lg px-3 py-2 text-xs leading-relaxed ${isUser ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200/50'}`}>
                                  {isUser ? msg.parts[0].text : renderMarkdown(msg.parts[0].text)}
                                </div>
                                {!isUser && (
                                  <div className="mt-1 flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button
                                      type="button"
                                      onClick={() => handleCopyText(msg.parts[0].text, idx)}
                                      className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-blue-600 focus:outline-none transition-colors cursor-pointer"
                                      title="Salin jawaban ini"
                                    >
                                      {copiedIndex === idx ? (
                                        <>
                                          <Check className="h-3 w-3 text-green-600" />
                                          <span className="text-green-600 font-semibold">Tersalin!</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="h-3 w-3" />
                                          <span>Salin</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                        {isReplying && (
                          <div className="flex items-start gap-2 justify-start">
                            <div className="h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center text-white text-[10px] shrink-0 font-bold animate-pulse">
                              AI
                            </div>
                            <div className="bg-gray-50 border border-gray-100 text-gray-500 rounded-lg px-3 py-2 text-xs rounded-tl-none flex items-center gap-1.5">
                              <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                              <span>Konsultan sedang mengetik...</span>
                            </div>
                          </div>
                        )}
                        <div ref={chatEndRef} />
                      </div>
                    </ScrollArea>
                    <form onSubmit={handleSendMessage} className="flex gap-2 shrink-0">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Tanya sesuatu ke tim konsultan..."
                        disabled={isReplying}
                        className="text-xs h-9 focus-visible:ring-blue-600"
                      />
                      <Button 
                        type="submit" 
                        disabled={isReplying || !chatInput.trim()}
                        className="h-9 w-9 bg-blue-700 hover:bg-blue-800 text-white p-0 flex items-center justify-center shrink-0 rounded-md"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
      </div>
    </div>

      <div className="mt-6 rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
        <h3 className="mb-4 text-lg font-bold">Informasi Penggunaan & Penjualan Paket</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]">
              <tr>
                <th className="px-3 py-3">Nama Paket</th>
                <th className="px-3 py-3 text-right">Harga Satuan</th>
                <th className="px-3 py-3 text-center">Pengguna Aktif</th>
                <th className="px-3 py-3 text-center">Total Pesanan</th>
                <th className="px-3 py-3 text-center">Pesanan Sukses</th>
                <th className="px-3 py-3 text-right">Total Pendapatan</th>
                <th className="px-3 py-3 text-right font-semibold">Kontribusi Pendapatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-gray-100)]">
              {(data?.packageRows ?? []).map((row: any) => {
                const totalRevenue = data?.total ?? 1;
                const pct = row.revenue > 0 ? ((row.revenue / totalRevenue) * 100).toFixed(1) : "0.0";
                return (
                  <tr key={row.id} className="hover:bg-[var(--color-gray-50)] transition-colors">
                    <td className="px-3 py-3 font-semibold text-[var(--color-gray-900)]">
                      <div className="flex items-center gap-2">
                        <span>{row.name}</span>
                        {row.slug === "free" && (
                          <Badge className="bg-[var(--color-gray-100)] text-[var(--color-gray-600)] border-0 text-[10px] px-1.5 py-0">
                            Bawaan
                          </Badge>
                        )}
                        {row.slug === "premium" && (
                          <Badge className="bg-blue-100 text-blue-800 border-0 text-[10px] px-1.5 py-0 font-semibold">
                            Populer
                          </Badge>
                        )}
                        {row.slug === "tahunan" && (
                          <Badge className="bg-green-100 text-green-800 border-0 text-[10px] px-1.5 py-0 font-semibold">
                            Hemat 17%
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right text-[var(--color-gray-700)]">
                      {row.price === 0 ? "Gratis" : idr(row.price)}
                    </td>
                    <td className="px-3 py-3 text-center font-medium text-[var(--color-gray-800)]">
                      {row.activeUsers} user
                    </td>
                    <td className="px-3 py-3 text-center text-[var(--color-gray-600)]">
                      {row.totalOrders}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {row.successOrders === "-" ? (
                        <span className="text-[var(--color-gray-600)]">-</span>
                      ) : (
                        <span className="font-semibold text-[var(--color-success)]">{row.successOrders}</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right font-medium text-[var(--color-gray-900)]">
                      {row.price === 0 ? "Rp0" : idr(row.revenue)}
                    </td>
                    <td className="px-3 py-3 text-right font-semibold text-[var(--color-gray-900)]">
                      {row.price === 0 ? "0.0%" : `${pct}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
