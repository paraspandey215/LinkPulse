import {

   LayoutDashboard,

   Link2,

   ChartNoAxesCombined,

   FolderKanban,

   QrCode,

   Settings,

   Search,

   Bell,

   Plus,

   MousePointerClick,

   Users,

   ArrowUpRight,

   ArrowDownRight,

   ExternalLink,

   MoreHorizontal,

   Zap,

   Menu,

   X,
   Trash2,

   LogOut,

} from "lucide-react";

import { useEffect, useState } from 'react';

import QRCode from "qrcode";

import Auth from "./Auth";

async function testBackend() {

   try {

      const response = await fetch('https://linkpulse-production-7da4.up.railway.app/');

      const data = await response.json();

      console.log('Backend response:', data);

   } catch (error) {

      console.error('Backend connection failed:', error);

   }

}

async function fetchLinks(setLinks) {

  try {

    const response = await fetch(

      "https://linkpulse-production-7da4.up.railway.app/api/links",

      {

        credentials: "include",

      }

    );

    const data = await response.json();

    if (!response.ok) {

      console.error("Fetch links failed:", data);

      return;

    }

    if (data.success) {

      setLinks(data.links);

    }

  } catch (error) {

    console.error("Failed to fetch links:", error);

  }

}

async function fetchDashboardAnalytics(setAnalytics) {

  try {

    const response = await fetch(

      "https://linkpulse-production-7da4.up.railway.app/api/links/dashboard/analytics",

      {

        credentials: "include",

      }

    );

    const data = await response.json();

    if (!response.ok || !data.success) {

      console.error("Dashboard analytics failed:", data);

      return;

    }

    setAnalytics(data);

  } catch (error) {

    console.error("Failed to fetch dashboard analytics:", error);

  }

}

const navGroups = [

  {

    title: "WORKSPACE",

    items: [

      { label: "Dashboard", icon: LayoutDashboard },

      { label: "My Links", icon: Link2 },

      { label: "Analytics", icon: ChartNoAxesCombined },

      { label: "Campaigns", icon: FolderKanban },

      { label: "QR Codes", icon: QrCode },

    ],

  },

];

function Sidebar({ mobileMenuOpen,

   setMobileMenuOpen,

   activePage,

   setActivePage,

   linkCount,

}) {

   useEffect(() => {

   const openMenu = () => setMobileMenuOpen(true);

   window.addEventListener("linkpulse-open-menu", openMenu);

   return () => {

      window.removeEventListener("linkpulse-open-menu", openMenu);

   };

}, [setMobileMenuOpen]);

   return (

      <aside

   className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white px-4 py-6 shadow-xl transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 lg:shadow-none ${

      mobileMenuOpen ? "translate-x-0" : "-translate-x-full"

   }`}

>

   <button

   type="button"

   onClick={() => setMobileMenuOpen(false)}

   aria-label="Close navigation menu"

   className="absolute right-4 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"

>

   <X size={20} />

</button>

         <div className="mb-10 flex items-center gap-3 px-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">

               <Zap size={23} fill="currentColor" />

            </div>

            <div>

               <h1 className="text-xl font-bold tracking-tight text-slate-900">

                  LinkPulse

               </h1>

               <p className="text-xs text-slate-500">Link intelligence</p>

            </div>

         </div>

         {navGroups.map((group) => (

            <div key={group.title} className="mb-8">

               <p className="mb-3 px-3 text-xs font-semibold tracking-widest text-slate-400">

                  {group.title}

               </p>

               <nav className="space-y-1">

                  {group.items.map((item) => {

                     const Icon = item.icon;

                    const active = item.label === activePage;

                     return (

                        <button

                           key={item.label}

                           onClick={() => {

                           setActivePage(item.label);

                             setMobileMenuOpen(false);

                             }}

                           className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${

                              active

                                 ? "bg-blue-50 text-blue-700"

                                 : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"

                           }`}

                        >

                           <Icon size={19} />

                           {item.label}

                           {item.label === "My Links" && (

                              <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-xs">

                                 {linkCount}

                              </span>

                           )}

                        </button>

                     );

                  })}

               </nav>

            </div>

         ))}

         <div className="mt-auto">

            <div className="rounded-2xl bg-slate-900 p-4 text-white">

               <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">

                  <Zap size={19} />

               </div>

               <p className="font-semibold">LinkPulse Pro</p>

               <p className="mt-1 text-xs leading-5 text-slate-400">

                  Unlock advanced analytics and link insights.

               </p>

               <button className="mt-4 w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100">

                  Explore features

               </button>

            </div>

            <button className="mt-5 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50">

               <Settings size={19} />

               Settings

            </button>

         </div>

      </aside>

   );

}

function Header({ user, onLogout }) {

   return (

      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">

         <button

   type="button"

   onClick={() => window.dispatchEvent(new Event("linkpulse-open-menu"))}

   aria-label="Open navigation menu"

   className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 lg:hidden"

>

   <Menu size={21} />

</button>

         <div className="relative min-w-0 flex-1 sm:max-w-md">

            <Search

               size={18}

               className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"

            />

            <input

               type="search"

               placeholder="Search links, campaigns..."

               className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"

            />

         </div>

         <div className="flex items-center gap-3">

            <button

               aria-label="Notifications"

               className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"

            >

               <Bell size={19} />

               <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />

            </button>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">

               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">

                  P

               </div>

               <div className="hidden sm:block">

                  <p className="max-w-[180px] truncate text-sm font-semibold text-slate-900">{user?.email || "Workspace"}</p>

                  <p className="text-xs text-slate-500">Free plan</p>

               </div>

            </div>

            <button

               type="button"

               onClick={onLogout}

               className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"

               title="Sign out"

            >

               <LogOut size={17} />

               <span className="hidden sm:inline">Sign out</span>

            </button>

         </div>

      </header>

   );

}

function StatCard({ stat }) {

   const Icon = stat.icon;

   const iconColors = {

      blue: "bg-blue-50 text-blue-600",

      violet: "bg-violet-50 text-violet-600",

      emerald: "bg-emerald-50 text-emerald-600",

      orange: "bg-orange-50 text-orange-600",

   };

   return (

      <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">

         <div className="flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">

               {stat.label}

            </span>

            <div className={`rounded-xl p-2.5 ${iconColors[stat.color]}`}>

               <Icon size={20} />

            </div>

         </div>

         <p className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">

            {stat.value}

         </p>

         <div className="mt-3 flex items-center gap-2 text-xs">

            {stat.positive ? (

               <ArrowUpRight size={15} className="text-emerald-600" />

            ) : (

               <ArrowDownRight size={15} className="text-red-500" />

            )}

            <span

               className={`font-semibold ${

                  stat.positive ? "text-emerald-600" : "text-red-500"

               }`}

            >

               {stat.change}

            </span>

            <span className="text-slate-400">{stat.note || "Live data"}</span>

         </div>

      </div>

   );

}

function ClickChart() {

   const [days, setDays] = useState("7");

   const [dailyClicks, setDailyClicks] = useState([]);

   const [loading, setLoading] = useState(true);

   const [error, setError] = useState("");

   useEffect(() => {

      let cancelled = false;

      async function loadTimeline() {

         setLoading(true);

         setError("");

         try {

            const response = await fetch(

  `https://linkpulse-production-7da4.up.railway.app/api/links/analytics/timeline?days=${days}`,

  {

    credentials: "include",

  }

);

            const data = await response.json();

            if (!response.ok || !data.success) {

               throw new Error(data.message || "Could not load click history.");

            }

            if (!cancelled) setDailyClicks(Array.isArray(data.dailyClicks) ? data.dailyClicks : []);

         } catch (err) {

            if (!cancelled) setError(err.message || "Could not load click history.");

         } finally {

            if (!cancelled) setLoading(false);

         }

      }

      loadTimeline();

      return () => { cancelled = true; };

   }, [days]);

   const maxClicks = Math.max(1, ...dailyClicks.map((item) => Number(item.clicks || 0)));

   const totalInRange = dailyClicks.reduce((sum, item) => sum + Number(item.clicks || 0), 0);

   const dateLabel = (value) => {

      const date = new Date(`${value}T12:00:00`);

      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });

   };

   return (

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

         <div className="flex flex-wrap items-start justify-between gap-3">

            <div>

               <h3 className="font-semibold text-slate-900">Click performance</h3>

               <p className="mt-1 text-sm text-slate-500">

                  {loading ? "Loading click history..." : `${totalInRange.toLocaleString()} clicks in the selected period`}

               </p>

            </div>

            <select

               aria-label="Chart time range"

               className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-blue-400"

               value={days}

               onChange={(event) => setDays(event.target.value)}

            >

               <option value="7">Last 7 days</option>

               <option value="30">Last 30 days</option>

            </select>

         </div>

         {error ? (

            <div className="mt-8 rounded-xl bg-red-50 p-4 text-sm text-red-700">

               {error} Make sure the backend is running and the analytics table has been created.

            </div>

         ) : loading ? (

            <div className="mt-8 flex h-52 items-center justify-center text-sm text-slate-400">

               Loading chart...

            </div>

         ) : (

            <>

               <div className="mt-8 flex h-52">

                  <div className="flex flex-col justify-between pb-1 pr-3 text-xs text-slate-400">

                     <span>{maxClicks}</span>

                     <span>{Math.round(maxClicks * 0.75)}</span>

                     <span>{Math.round(maxClicks * 0.5)}</span>

                     <span>{Math.round(maxClicks * 0.25)}</span>

                     <span>0</span>

                  </div>

                  <div className="relative flex min-w-0 flex-1 items-end justify-between gap-1 border-b border-slate-200">

                     {[25, 50, 75].map((value) => (

                        <div

                           key={value}

                           className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-slate-100"

                           style={{ bottom: `${value}%` }}

                        />

                     ))}

                     {dailyClicks.map((item) => {

                        const clicks = Number(item.clicks || 0);

                        const height = clicks === 0 ? 1 : Math.max(4, (clicks / maxClicks) * 100);

                        return (

                           <div

                              key={item.date}

                              className="relative z-10 flex h-full min-w-0 flex-1 items-end"

                              title={`${dateLabel(item.date)}: ${clicks} clicks`}

                           >

                              <div

                                 className={`w-full rounded-t-md transition ${clicks ? "bg-blue-500 hover:bg-blue-700" : "bg-slate-100"}`}

                                 style={{ height: `${height}%` }}

                              />

                           </div>

                        );

                     })}

                  </div>

               </div>

               <div className="mt-3 flex justify-between gap-1 text-xs text-slate-400">

                  {dailyClicks.filter((_, index) => {

                     const step = days === "7" ? 1 : 5;

                     return index === 0 || index === dailyClicks.length - 1 || index % step === 0;

                  }).map((item) => (

                     <span key={item.date}>{dateLabel(item.date)}</span>

                  ))}

               </div>

               {totalInRange === 0 && (

                  <p className="mt-4 text-center text-xs text-slate-400">

                     No click events recorded in this period yet. New clicks will appear here.

                  </p>

               )}

            </>

         )}

         <p className="mt-4 text-xs text-slate-400">

            Daily history starts after click-event tracking is enabled; older clicks are not available by day.

         </p>

      </div>

   );

}

function TopPerformingLinks({ links }) {

   const topLinks = [...links]

      .sort((a, b) => Number(b.clicks || 0) - Number(a.clicks || 0))

      .slice(0, 5);

   return (

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

         <div>

            <h3 className="font-semibold text-slate-900">Top-performing links</h3>

            <p className="mt-1 text-sm text-slate-500">Ranked by total clicks</p>

         </div>

         {topLinks.length ? (

            <div className="mt-5 space-y-4">

               {topLinks.map((link, index) => {

                  const max = Math.max(1, ...topLinks.map((item) => Number(item.clicks || 0)));

                  const clicks = Number(link.clicks || 0);

                  return (

                     <div key={link.shortCode}>

                        <div className="flex items-start gap-3">

                           <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-700">

                              {index + 1}

                           </span>

                           <div className="min-w-0 flex-1">

                              <p className="truncate text-sm font-medium text-slate-800" title={link.originalUrl}>

                                 {link.originalUrl}

                              </p>

                              <p className="mt-1 text-xs text-slate-400">{link.shortCode}</p>

                           </div>

                           <span className="shrink-0 text-sm font-semibold text-slate-900">

                              {clicks.toLocaleString()}

                           </span>

                        </div>

                        <div className="ml-11 mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">

                           <div

                              className="h-full rounded-full bg-blue-500"

                              style={{ width: `${(clicks / max) * 100}%` }}

                           />

                        </div>

                     </div>

                  );

               })}

            </div>

         ) : (

            <p className="mt-6 text-sm text-slate-500">Create a short link to see its performance here.</p>

         )}

      </section>

   );

}

function RecentLinks({ links, onDeleteLink }) {
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState("all");
   const [deletingCode, setDeletingCode] = useState(null);
   const [pendingDelete, setPendingDelete] = useState(null);

   const [openActionMenu, setOpenActionMenu] = useState(null);
   const [actionMenuPosition, setActionMenuPosition] = useState({ top: 8, left: 8 });

   const [selectedAnalytics, setSelectedAnalytics] = useState(null);

   const [analyticsLoading, setAnalyticsLoading] = useState(false);

   // Close the action menu when the user clicks anywhere outside it.
   useEffect(() => {
      if (!openActionMenu) return;

      function handleOutsideClick(event) {
         if (!event.target.closest("[data-link-action-menu]")) {
            setOpenActionMenu(null);
         }
      }

      function handleEscape(event) {
         if (event.key === "Escape") setOpenActionMenu(null);
      }

      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);

      return () => {
         document.removeEventListener("mousedown", handleOutsideClick);
         document.removeEventListener("keydown", handleEscape);
      };
   }, [openActionMenu]);

   async function copyShortUrl(shortUrl) {

      try {

         await navigator.clipboard.writeText(shortUrl);

         alert("Short URL copied!");

         setOpenActionMenu(null);

      } catch (error) {

         console.error("Could not copy short URL:", error);

         alert("Copy failed. Please copy this URL manually: " + shortUrl);

      }

   }

   async function viewLinkAnalytics(link) {

      setOpenActionMenu(null);

      setAnalyticsLoading(true);

      setSelectedAnalytics({ ...link, clicks: Number(link.clicks || 0) });

      try {

         const response = await fetch(

            `https://linkpulse-production-7da4.up.railway.app/api/links/${link.shortCode}/stats`

         );

         const data = await response.json();

         if (!response.ok || !data.success) {

            alert(data.message || "Could not load link analytics.");

            setSelectedAnalytics(null);

            return;

         }

         setSelectedAnalytics({

            ...link,

            clicks: Number(data.clicks ?? link.clicks ?? 0),

            uniqueVisitors: Number(data.uniqueVisitors ?? 0),

            expiresAt: data.expiresAt ?? link.expiresAt ?? null,

            isExpired: Boolean(data.isExpired ?? link.isExpired),

         });

      } catch (error) {

         console.error("Failed to load link analytics:", error);

         alert("Analytics load nahi ho paayi. Backend check karo.");

         setSelectedAnalytics(null);

      } finally {

         setAnalyticsLoading(false);

      }

   }

   const filteredLinks = links.filter((link) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
         !query ||
         String(link.originalUrl || "").toLowerCase().includes(query) ||
         String(link.shortCode || "").toLowerCase().includes(query) ||
         String(link.shortUrl || "").toLowerCase().includes(query);
      const expired = Boolean(link.isExpired) ||
         (link.expiresAt && new Date(link.expiresAt).getTime() <= Date.now());
      const matchesStatus = statusFilter === "all" ||
         (statusFilter === "active" && !expired) ||
         (statusFilter === "expired" && expired);
      return matchesSearch && matchesStatus;
   });

   function deleteLink(link) {
      setOpenActionMenu(null);
      setPendingDelete(link);
   }

   async function confirmDeleteLink() {
      if (!pendingDelete) return;
      const link = pendingDelete;
      setDeletingCode(link.shortCode);
      try {
         const response = await fetch(
            `https://linkpulse-production-7da4.up.railway.app/api/links/${encodeURIComponent(link.shortCode)}`,
            { method: "DELETE", credentials: "include" }
         );
         const data = await response.json();
         if (!response.ok || !data.success) {
            throw new Error(data.message || "Could not delete this link.");
         }
         setPendingDelete(null);
         await onDeleteLink();
      } catch (error) {
         alert(error.message || "Failed to delete link.");
      } finally {
         setDeletingCode(null);
      }
   }

   return (

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

         <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">

            <div>

               <h3 className="font-semibold text-slate-900">Recent links</h3>

               <p className="mt-1 text-sm text-slate-500">

                  Manage your recently created short links

               </p>

            </div>

            <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">

               View all <ArrowUpRight size={16} />

            </button>

         </div>

         <div className="flex flex-col gap-3 px-5 pb-4 sm:flex-row sm:items-center sm:px-6">
            <div className="relative flex-1">
               <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by URL or short code..."
                  aria-label="Search links"
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-400"
               />
            </div>
            <select
               value={statusFilter}
               onChange={(event) => setStatusFilter(event.target.value)}
               aria-label="Filter links by status"
               className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
            >
               <option value="all">All links</option>
               <option value="active">Active</option>
               <option value="expired">Expired</option>
            </select>
         </div>

         <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] text-left text-sm">

               <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">

                  <tr>

                     <th className="px-6 py-3 font-medium">Link</th>

                     <th className="px-6 py-3 font-medium">Short URL</th>

                     <th className="px-6 py-3 font-medium">Clicks</th>

                     <th className="px-6 py-3 font-medium">Status</th>

                     <th className="px-6 py-3 font-medium">Action</th>

                  </tr>

               </thead>

               <tbody className="divide-y divide-slate-100">

                  {filteredLinks.length > 0 ? (

                     filteredLinks.map((link) => (

                        <tr key={link.shortCode} className="hover:bg-slate-50/70">

                           <td className="px-6 py-4">

                              <p className="max-w-xs truncate font-medium text-slate-900" title={link.originalUrl}>

                                 {link.originalUrl}

                              </p>

                              <p className="mt-1 text-xs text-slate-400">

                                 Created link

                              </p>

                           </td>

                           <td className="px-6 py-4">

                              <a

                                 href={link.shortUrl}

                                 target="_blank"

                                 rel="noreferrer"

                                 className="font-medium text-blue-600 hover:text-blue-800 hover:underline"

                              >

                                 {link.shortCode}

                              </a>

                           </td>

                           <td className="px-6 py-4 font-medium text-slate-700">

                              {Number(link.clicks || 0).toLocaleString()}

                           </td>

                           <td className="px-6 py-4">

                              {link.isExpired ? (

                                 <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">

                                    Expired

                                 </span>

                              ) : (

                                 <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">

                                    Active

                                 </span>

                              )}

                              <p className="mt-2 text-xs text-slate-400">

                                 {link.expiresAt

                                    ? `Expires ${new Date(link.expiresAt).toLocaleString()}`

                                    : "Never expires"}

                              </p>

                           </td>

                           <td className="px-6 py-4">

                              <div data-link-action-menu className="relative inline-block">

                                 <button

                                    type="button"

                                    aria-label={`Actions for ${link.shortCode}`}

                                    title="Link actions"

                                    onClick={(event) => {
                                       if (openActionMenu === link.shortCode) {
                                          setOpenActionMenu(null);
                                          return;
                                       }
                                       const rect = event.currentTarget.getBoundingClientRect();
                                       const menuHeight = 176;
                                       const menuWidth = 192;
                                       setActionMenuPosition({
                                          top: Math.max(8, rect.top - menuHeight - 8),
                                          left: Math.max(8, Math.min(window.innerWidth - menuWidth - 8, rect.right - menuWidth)),
                                       });
                                       setOpenActionMenu(link.shortCode);
                                    }}

                                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"

                                 >

                                    <MoreHorizontal size={19} />

                                 </button>

                                 {openActionMenu === link.shortCode && (

                                    <div style={{ position: "fixed", top: actionMenuPosition.top, left: actionMenuPosition.left }} className="z-[100] w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-xl">

                                       <button

                                          type="button"

                                          onClick={() => copyShortUrl(link.shortUrl)}

                                          className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"

                                       >

                                          Copy short URL

                                       </button>

                                       <button

                                          type="button"

                                          onClick={() => viewLinkAnalytics(link)}

                                          className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"

                                       >

                                          View analytics

                                       </button>

                                       <button
                                          type="button"
                                          disabled={deletingCode === link.shortCode}
                                          onClick={() => deleteLink(link)}
                                          className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                                       >
                                          {deletingCode === link.shortCode ? "Deleting..." : "Delete link"}
                                       </button>

                                       <a

                                          href={link.originalUrl}

                                          target="_blank"

                                          rel="noreferrer"

                                          onClick={() => setOpenActionMenu(null)}

                                          className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"

                                       >

                                          Open original URL

                                       </a>

                                    </div>

                                 )}

                              </div>

                           </td>

                        </tr>

                     ))

                  ) : (

                     <tr>

                        <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">

                           No matching links. Try another search or create a short link.

                        </td>

                     </tr>

                  )}

               </tbody>

            </table>

         </div>

         {pendingDelete && (
            <div
               className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
               onClick={() => deletingCode !== pendingDelete.shortCode && setPendingDelete(null)}
            >
               <section
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="delete-link-title"
                  className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-7"
                  onClick={(event) => event.stopPropagation()}
               >
                  <div className="flex items-start gap-4">
                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <Trash2 size={22} />
                     </div>
                     <div className="min-w-0">
                        <h2 id="delete-link-title" className="text-lg font-bold text-slate-900">Delete this link?</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                           You’re about to delete <span className="font-semibold text-slate-900">{pendingDelete.shortCode}</span>. Its stored click analytics will also be removed. This action cannot be undone.
                        </p>
                        <p className="mt-2 break-all text-xs text-slate-400">{pendingDelete.originalUrl}</p>
                     </div>
                  </div>
                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                     <button
                        type="button"
                        disabled={deletingCode === pendingDelete.shortCode}
                        onClick={() => setPendingDelete(null)}
                        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                     >Cancel</button>
                     <button
                        type="button"
                        disabled={deletingCode === pendingDelete.shortCode}
                        onClick={confirmDeleteLink}
                        className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                     >{deletingCode === pendingDelete.shortCode ? "Deleting..." : "Delete link"}</button>
                  </div>
               </section>
            </div>
         )}

         {selectedAnalytics && (

            <div

               className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"

               onClick={() => setSelectedAnalytics(null)}

            >

               <section

                  role="dialog"

                  aria-modal="true"

                  aria-labelledby="link-analytics-title"

                  className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7"

                  onClick={(event) => event.stopPropagation()}

               >

                  <div className="flex items-start justify-between gap-4">

                     <div>

                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                           <ChartNoAxesCombined size={22} />

                        </div>

                        <h2 id="link-analytics-title" className="text-xl font-bold text-slate-900">

                           Link analytics

                        </h2>

                        <p className="mt-1 text-sm text-slate-500">

                           Performance details for this short link

                        </p>

                     </div>

                     <button

                        type="button"

                        aria-label="Close analytics"

                        onClick={() => setSelectedAnalytics(null)}

                        className="rounded-lg px-3 py-1 text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700"

                     >

                        ×

                     </button>

                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">

                     <div className="rounded-xl border border-slate-200 p-4">

                        <p className="text-xs font-medium text-slate-500">Unique visitors</p>

                        <p className="mt-1 text-2xl font-bold text-slate-900">

                           {analyticsLoading ? "…" : Number(selectedAnalytics.uniqueVisitors || 0).toLocaleString()}

                        </p>

                     </div>

                     <div className="rounded-xl border border-slate-200 p-4">

                        <p className="text-xs font-medium text-slate-500">Total clicks</p>

                        <p className="mt-1 text-2xl font-bold text-slate-900">

                           {analyticsLoading ? "…" : Number(selectedAnalytics.clicks || 0).toLocaleString()}

                        </p>

                     </div>

                  </div>

                  <div className="mt-5 space-y-4">

                     <div>

                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Short URL</p>

                        <a href={selectedAnalytics.shortUrl} target="_blank" rel="noreferrer" className="break-all text-sm font-medium text-blue-600 hover:underline">

                           {selectedAnalytics.shortUrl}

                        </a>

                     </div>

                     <div>

                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Original URL</p>

                        <a href={selectedAnalytics.originalUrl} target="_blank" rel="noreferrer" className="break-all text-sm text-slate-700 hover:text-blue-600 hover:underline">

                           {selectedAnalytics.originalUrl}

                        </a>

                     </div>

                     <div>

                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">

                           Expiry

                        </p>

                        <p className="text-sm text-slate-700">

                           {selectedAnalytics.expiresAt

                              ? new Date(selectedAnalytics.expiresAt).toLocaleString()

                              : "Never expires"}

                        </p>

                     </div>

                     <div className="flex items-center justify-between border-t border-slate-100 pt-4">

                        <span className="text-sm text-slate-500">Status</span>

                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${

                              selectedAnalytics.isExpired

                                 ? "bg-red-50 text-red-700"

                                 : "bg-emerald-50 text-emerald-700"

                           }`}>

                              {selectedAnalytics.isExpired ? "Expired" : "Active"}

                           </span>

                     </div>

                  </div>

                  <button type="button" onClick={() => setSelectedAnalytics(null)} className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">

                     Done

                  </button>

               </section>

            </div>

         )}

      </div>

   );

}

function App() {

   const [authUser, setAuthUser] = useState(null);

   const [authLoading, setAuthLoading] = useState(true);

   const [links, setLinks] = useState([]);

   const [dashboardAnalytics, setDashboardAnalytics] = useState(null);

   const [showCreateForm, setShowCreateForm] = useState(false);

   const [originalUrl, setOriginalUrl] = useState("");

   const [expiryOption, setExpiryOption] = useState("never");

   const [createdShortUrl, setCreatedShortUrl] = useState("");

   const [qrInput, setQrInput] = useState("");

   const [qrImage, setQrImage] = useState("");

   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   const [activePage, setActivePage] = useState("Dashboard");

   const [notice, setNotice] = useState("");

   function showNotice(message) {

      setNotice(message);

   }

async function handleShortenUrl(e) {

   e.preventDefault();

   let normalizedUrl = originalUrl.trim();

   if (!normalizedUrl) {

      showNotice("Please enter a URL.");

      return;

   }

   // Add HTTPS when the user enters a domain without a protocol.

   if (!/^https?:\/\//i.test(normalizedUrl)) {

      // Do not interpret unsafe or other explicit protocols as domains.

      if (/^[a-z][a-z0-9+.-]*:/i.test(normalizedUrl)) {

         showNotice("Only HTTP and HTTPS URLs are allowed.");

         return;

      }

      normalizedUrl = `https://${normalizedUrl}`;

   }

   let parsedUrl;

   try {

      parsedUrl = new URL(normalizedUrl);

   } catch {

      showNotice("Please enter a valid URL, such as www.google.com.");

      return;

   }

   if (

      !["http:", "https:"].includes(parsedUrl.protocol) ||

      !parsedUrl.hostname ||

      !parsedUrl.hostname.includes(".") ||

      /\s/.test(parsedUrl.hostname) ||

      parsedUrl.username ||

      parsedUrl.password

   ) {

      showNotice("Please enter a valid HTTP or HTTPS URL.");

      return;

   }

   try {

      const response = await fetch(

         "https://linkpulse-production-7da4.up.railway.app/api/links/shorten",

         {

            method: "POST",

             credentials: "include",

            headers: {

               "Content-Type": "application/json",

            },

            body: JSON.stringify({ originalUrl: parsedUrl.href, expiry: expiryOption }),

         }

      );

      const data = await response.json();

      if (!response.ok || !data.success) {

         showNotice(data.message || "Failed to shorten URL.");

         return;

      }

      setCreatedShortUrl(data.shortUrl);

      setOriginalUrl("");

      fetchLinks(setLinks);

   } catch (error) {

      console.error("Short URL creation failed:", error);

      showNotice("Backend se connect nahi ho pa raha. Check karo server running hai ya nahi.");

   }

}

   async function handleGenerateQR(e) {

   e.preventDefault();

   if (!qrInput.trim()) {

      showNotice("Please enter a URL.");

      return;

   }

   try {

      let normalizedUrl = qrInput.trim();

      // Add HTTPS if the user enters a domain without a protocol.

      if (!/^https?:\/\//i.test(normalizedUrl)) {

         // Reject other explicit protocols instead of treating them as a domain.

         if (/^[a-z][a-z0-9+.-]*:/i.test(normalizedUrl)) {

            showNotice("Only HTTP and HTTPS URLs are allowed.");

            return;

         }

         normalizedUrl = `https://${normalizedUrl}`;

      }

      const parsedUrl = new URL(normalizedUrl);

      if (

         !["http:", "https:"].includes(parsedUrl.protocol) ||

         !parsedUrl.hostname ||

         !parsedUrl.hostname.includes(".") ||

         parsedUrl.username ||

         parsedUrl.password

      ) {

         showNotice("Please enter a valid HTTP or HTTPS URL.");

         return;

      }

      const image = await QRCode.toDataURL(parsedUrl.href, {

         width: 300,

         margin: 2,

         errorCorrectionLevel: "H",

      });

      setQrInput(parsedUrl.href);

      setQrImage(image);

   } catch (error) {

      console.error("QR generation failed:", error);

      showNotice("Please enter a valid URL, such as www.google.com.");

   }

}

function handleDownloadQR() {

   if (!qrImage) return;

   const link = document.createElement("a");

   link.href = qrImage;

   link.download = "linkpulse-qr-code.png";

   link.click();

}

   const stats = [

   {

      label: "Total Clicks",

      value: dashboardAnalytics

         ? Number(dashboardAnalytics.totalClicks || 0).toLocaleString()

         : "—",

      change: dashboardAnalytics ? "Live data" : "Loading...",

      note: "From your database",

      positive: true,

      icon: MousePointerClick,

      color: "blue",

   },

   {

      label: "Active Links",

      value: dashboardAnalytics

         ? Number(dashboardAnalytics.activeLinks ?? dashboardAnalytics.totalLinks ?? 0).toLocaleString()

         : "—",

      change: dashboardAnalytics ? "Live data" : "Loading...",

      note: "Saved short links",

      positive: true,

      icon: Link2,

      color: "violet",

   },

   {

      label: "Unique Visitors",

      value: dashboardAnalytics

         ? Number(dashboardAnalytics.uniqueVisitors || 0).toLocaleString()

         : "—",

      change: dashboardAnalytics ? "Live data" : "Loading...",

      note: "Tracked browser visitors",

      positive: true,

      icon: Users,

      color: "emerald",

   },

   {

      label: "Avg. Clicks per Link",

      value: dashboardAnalytics

         ? Number(dashboardAnalytics.averageClicksPerLink || 0).toFixed(2)

         : "—",

      change: dashboardAnalytics ? "Live data" : "Loading...",

      note: "Total clicks ÷ total links",

      positive: true,

      icon: ChartNoAxesCombined,

      color: "orange",

   },

];

   useEffect(() => {

    let mounted = true;

    async function checkSession() {

      try {

        const response = await fetch("https://linkpulse-production-7da4.up.railway.app/api/auth/me", {

          credentials: "include",

        });

        if (!response.ok) {

          if (mounted) setAuthUser(null);

          return;

        }

        const data = await response.json();

        if (mounted) setAuthUser(data.user ?? null);

      } catch (error) {

        console.error("Session check failed:", error);

        if (mounted) setAuthUser(null);

      } finally {

        if (mounted) setAuthLoading(false);

      }

    }

    checkSession();

    return () => {

      mounted = false;

    };

  }, []);

  useEffect(() => {

      if (!authUser) {

         setLinks([]);

         setDashboardAnalytics(null);

         return;

      }

      testBackend();

      fetchLinks(setLinks);

      fetchDashboardAnalytics(setDashboardAnalytics);

      const interval = setInterval(() => {

         fetchLinks(setLinks);

         fetchDashboardAnalytics(setDashboardAnalytics);

      }, 5000);

      return () => clearInterval(interval);

   }, [authUser]);

   async function refreshLinkManagement() {
      await fetchLinks(setLinks);
      await fetchDashboardAnalytics(setDashboardAnalytics);
   }

   async function handleLogout() {

    try {

      const response = await fetch("https://linkpulse-production-7da4.up.railway.app/api/auth/logout", {

        method: "POST",

        credentials: "include",

      });

      if (!response.ok) throw new Error("Sign out request failed");

      setAuthUser(null);

      setLinks([]);

      setDashboardAnalytics(null);

    } catch (error) {

      console.error("Sign out failed:", error);

      showNotice("Could not sign out. Please try again.");

    }

  }

  if (authLoading) {

      return (

         <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">

            Checking your session...

         </div>

      );

   }

   if (!authUser) {

      return <Auth onAuthSuccess={setAuthUser} />;

   }

   return (

      <div className="min-h-screen bg-slate-50 lg:flex">&#x20;

         <Sidebar

         mobileMenuOpen={mobileMenuOpen}

         setMobileMenuOpen={setMobileMenuOpen}

        activePage={activePage}

        setActivePage={setActivePage}

        linkCount={links.length}

         />

         {mobileMenuOpen && (

   <button

      type="button"

      aria-label="Close navigation menu"

      onClick={() => setMobileMenuOpen(false)}

      className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"

   />

)}

         <div className="min-w-0 flex-1">

            <Header user={authUser} onLogout={handleLogout} />

            <main className="mx-auto max-w-[1600px] p-5 sm:p-8">

               <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

                  <div>

                     <p className="text-sm text-slate-500">

                        Workspace / {activePage}

                     </p>

                     <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">

                        {activePage === "Dashboard" ? "Dashboard overview" : activePage}

                     </h2>

                     <p className="mt-2 text-sm text-slate-500">

                        {activePage === "Dashboard" && "Here's what's happening with your links."}

                        {activePage === "My Links" && "View, copy, and manage your saved short links."}

                        {activePage === "QR Codes" && "Generate and download QR codes for your URLs."}

                        {activePage === "Analytics" && "Review click performance and link engagement."}

                        {activePage === "Campaigns" && "Organize your links into campaigns."}

                     </p>

                  </div>

                  {(activePage === "Dashboard" || activePage === "My Links") && (

                     <button

                        onClick={() => {

                           setActivePage("My Links");

                           setShowCreateForm(true);

                        }}

                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"

                     >

                        <Plus size={18} />

                        Create new link

                     </button>

                  )}

               </div>

{showCreateForm && (activePage === "Dashboard" || activePage === "My Links") && (

   <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

      <h3 className="text-lg font-semibold text-slate-900">

         Create a short link

      </h3>

      <p className="mt-1 text-sm text-slate-500">

         Enter the original URL you want to shorten.

      </p>

<form

   className="mt-5 flex flex-col gap-3 sm:flex-row"

   onSubmit={handleShortenUrl}

>

<input

   type="text"

   inputMode="url"

   autoCapitalize="none"

   spellCheck={false}

   value={originalUrl}

   onChange={(e) => setOriginalUrl(e.target.value)}

   placeholder="www.example.com or https://example.com"

   required

   className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"

/>

         <select

            aria-label="Link expiry"

            value={expiryOption}

            onChange={(event) => setExpiryOption(event.target.value)}

            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"

         >

            <option value="1">Expires in 1 day</option>

            <option value="7">Expires in 7 days</option>

            <option value="never">Never expires</option>

         </select>

         <button

            type="submit"

            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"

         >

            Shorten URL

         </button>

         <button

            type="button"

            onClick={() => setShowCreateForm(false)}

            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"

         >

            Cancel

         </button>

      </form>

      {createdShortUrl && (

         <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

            <p className="text-sm font-semibold text-emerald-800">

               Your short link is ready!

            </p>

            <a

               href={createdShortUrl}

               target="_blank"

               rel="noreferrer"

               className="mt-2 block break-all text-sm font-medium text-blue-600 underline"

            >

               {createdShortUrl}

            </a>

            <button

               type="button"

               onClick={() => {

                  navigator.clipboard.writeText(createdShortUrl);

               }}

               className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"

            >

               Copy short link

            </button>

         </div>

      )}

   </div>

)}

               {(activePage === "Dashboard" || activePage === "Analytics") && (

   <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => (

         <StatCard key={stat.label} stat={stat} />

      ))}

   </div>

)}

               {(activePage === "Dashboard" || activePage === "Analytics") && (

               <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">

                  <ClickChart />

                  {activePage === "Analytics" ? (

                     <TopPerformingLinks links={links} />

                  ) : (

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

                     <h3 className="font-semibold text-slate-900">Quick actions</h3>

                     <p className="mt-1 text-sm text-slate-500">

                        Manage your links faster

                     </p>

                     <div className="mt-6 space-y-3">

                        <button

                           onClick={() => {

                              setActivePage("My Links");

                              setShowCreateForm(true);

                           }}

                           className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/50"

                        >

                           <div className="rounded-xl bg-blue-50 p-3 text-blue-600">

                              <Link2 size={20} />

                           </div>

                           <div className="flex-1">

                              <p className="text-sm font-semibold text-slate-900">

                                 Shorten a URL

                              </p>

                              <p className="mt-1 text-xs text-slate-500">

                                 Create a shareable link

                              </p>

                           </div>

                           <ExternalLink size={17} className="text-slate-400" />

                        </button>

                        <button

                           onClick={() => setActivePage("QR Codes")}

                           className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-violet-200 hover:bg-violet-50/50"

                        >

                           <div className="rounded-xl bg-violet-50 p-3 text-violet-600">

                              <QrCode size={20} />

                           </div>

                           <div className="flex-1">

                              <p className="text-sm font-semibold text-slate-900">

                                 Generate QR code

                              </p>

                              <p className="mt-1 text-xs text-slate-500">

                                 Make your link scannable

                              </p>

                           </div>

                           <ExternalLink size={17} className="text-slate-400" />

                        </button>

                        <button

                           onClick={() => setActivePage("Analytics")}

                           className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-200 hover:bg-emerald-50/50"

                        >

                           <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">

                              <ChartNoAxesCombined size={20} />

                           </div>

                           <div className="flex-1">

                              <p className="text-sm font-semibold text-slate-900">

                                 View analytics

                              </p>

                              <p className="mt-1 text-xs text-slate-500">

                                 Explore your link traffic

                              </p>

                           </div>

                           <ExternalLink size={17} className="text-slate-400" />

                        </button>

                     </div>

                     <div className="mt-6 rounded-xl bg-blue-50 p-4">

                        <p className="text-sm font-semibold text-blue-900">

                           Your links, in one place

                        </p>

                        <p className="mt-1 text-xs leading-5 text-blue-700">

                           Organize links, measure engagement, and make better decisions.

                        </p>

                     </div>

                  </div>

                  )}

               </div>

               )}

               {/* QR Code Generator */}

               {(activePage === "Dashboard" || activePage === "QR Codes") && (

<section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

   <div className="mb-5 flex items-center gap-3">

      <div className="rounded-xl bg-violet-50 p-3 text-violet-600">

         <QrCode size={22} />

      </div>

      <div>

         <h3 className="font-semibold text-slate-900">

            QR Code Generator

         </h3>

         <p className="mt-1 text-sm text-slate-500">

            Generate and download a QR code for any URL.

         </p>

      </div>

   </div>

   <form

      onSubmit={handleGenerateQR}

      className="flex flex-col gap-3 sm:flex-row"

   >

      <input

         type="text"

         inputMode="url"

         autoCapitalize="none"

         spellCheck={false}

         value={qrInput}

         onChange={(e) => setQrInput(e.target.value)}

         placeholder="www.example.com or https://example.com"

         required

         className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-400"

      />

      <button

         type="submit"

         className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"

      >

         Generate QR

      </button>

   </form>

   {qrImage && (

      <div className="mt-6 flex flex-col items-center rounded-xl border border-slate-100 bg-slate-50 p-5">

         <img

            src={qrImage}

            alt="Generated QR code"

            className="h-[250px] w-[250px] rounded-lg bg-white p-2"

         />

         <p className="mt-3 max-w-full break-all text-center text-sm text-slate-600">

            {qrInput}

         </p>

         <button

            type="button"

            onClick={handleDownloadQR}

            className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"

         >

            Download QR Code

         </button>

      </div>

   )}

</section>

               )}

               {(activePage === "Dashboard" || activePage === "My Links" || activePage === "Analytics") && (

                  <RecentLinks links={links} onDeleteLink={refreshLinkManagement} />

               )}

               {activePage === "Campaigns" && (

                  <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-12">

                     <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">

                        <FolderKanban size={28} />

                     </div>

                     <h3 className="mt-4 text-lg font-semibold text-slate-900">Campaigns are coming soon</h3>

                     <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">

                        Campaign organization is not connected yet. You can still create and manage your short links from My Links.

                     </p>

                     <button

                        type="button"

                        onClick={() => setActivePage("My Links")}

                        className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"

                     >

                        Go to My Links

                     </button>

                  </section>

               )}

               <footer className="py-8 text-center text-xs text-slate-400">

                  LinkPulse · Link intelligence made simple

               </footer>

               {notice && (

                  <div

                     className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"

                     onClick={() => setNotice("")}

                  >

                     <section

                        role="alertdialog"

                        aria-modal="true"

                        aria-labelledby="linkpulse-notice-title"

                        className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl"

                        onClick={(event) => event.stopPropagation()}

                     >

                        <div className="flex items-start gap-4">

                           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">

                              <X size={22} />

                           </div>

                           <div className="min-w-0 flex-1">

                              <h2 id="linkpulse-notice-title" className="text-lg font-bold text-slate-900">

                                 LinkPulse notice

                              </h2>

                              <p className="mt-2 break-words text-sm leading-6 text-slate-600">

                                 {notice}

                              </p>

                           </div>

                        </div>

                        <button

                           type="button"

                           autoFocus

                           onClick={() => setNotice("")}

                           className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"

                        >

                           Got it

                        </button>

                     </section>

                  </div>

               )}

            </main>

         </div>

      </div>

   );

}

export default App;
